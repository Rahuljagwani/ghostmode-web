---
slug: microsoft-outage-retry-storms
date: "2026-11-13"
title: "The Microsoft 365 outage: retry storms, cascading failures and how to answer the interview question"
seoTitle: "Microsoft 365 Outage: Retry Storms and Cascading Failures"
description: "What we know about the Nov 2026 Microsoft 365 outage, why overloaded systems collapse, and the 8 tools that stop it: timeouts, backoff, retry budgets, circuit breakers and more."
excerpt: "Outlook and Teams were down for over 12 hours. Here's what Microsoft has said so far, why servers that come back can fall over again, and how to answer \"how do you stop a service from collapsing under load?\""
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - microsoft 365 outage
  - outlook down
  - retry storm
  - cascading failure
  - exponential backoff with jitter
  - circuit breaker pattern
  - load shedding
  - system design interview questions
tldr:
  - "On Nov 12, 2026, Outlook, Teams and other Microsoft 365 services went down for more than 12 hours. Microsoft first reported elevated load, then said many servers had become unexpectedly unavailable. No root cause has been published yet."
  - "Overloaded systems tend to collapse through a feedback loop: some servers fail, the rest get their traffic, requests time out, clients retry, and load climbs again."
  - "The interview answer: timeouts, retries with backoff and jitter, a retry budget, circuit breakers and load shedding, plus graceful degradation, deadlines and short queues."
faqs:
  - q: "What caused the Microsoft 365 outage in November 2026?"
    a: "Microsoft had not published a root cause at the time of writing. Its updates first mentioned elevated load across multiple regions, then said the load came from a large number of servers becoming unexpectedly unavailable, and that there was no indication of a cyberattack."
  - q: "What is a retry storm?"
    a: "A retry storm is when many clients retry failed requests at the same time, adding load to a service that is already struggling. If several layers each retry, the extra load multiplies: three layers that each try four times turn one request into 64 attempts."
  - q: "What is a cascading failure?"
    a: "A cascading failure is a failure that grows over time through positive feedback. For example, some servers fail, the remaining servers take their traffic and slow down, requests time out and are retried, and even more servers fail."
  - q: "How do you prevent a retry storm?"
    a: "Set timeouts on every call, retry at most about three times with exponential backoff and random jitter, retry at only one layer, cap retries at around 10% of requests, use circuit breakers for failing dependencies, and shed low-priority load first."
---

On **November 12, 2026**, Outlook, Teams and other **Microsoft 365** services went down for people around the world, and the disruption ran for **more than 12 hours**. For engineers, it's a reminder of the system design question interviewers love: **"Your service is overloaded and every client keeps retrying. How do you stop it from collapsing?"**

This post covers what Microsoft has said so far, the general way overloaded systems fall over, and the 8 tools to mention in an interview.

**Want everything on one page?** [Download the free cheat sheet (PDF)](/cheatsheets/surviving-overload.pdf): the 8 tools, the 64-attempt retry trap, a 60-second interview answer and the follow-up questions.

<!-- cta -->

## What we know about the outage

Based on reporting from [The Conversation](https://theconversation.com/microsoft-has-suffered-a-global-outage-a-tech-expert-explains-what-went-wrong-296588) and [The Next Web](https://thenextweb.com/news/microsoft-outage-outlook-teams-12-hours-global) on November 13:

- **When:** it began on November 12 in the Americas and spread globally within an hour, with reports from 74 countries and territories in the first hour.
- **What broke:** Outlook, Teams, SharePoint, Copilot and other Microsoft 365 services. AI tools that connect to Microsoft 365, including ChatGPT and Claude connectors, also reported problems.
- **What Microsoft said:** first "elevated load across multiple regions", then that the load came from "a large number of servers becoming unexpectedly unavailable". It pointed to automated health checks, said no recent deployment lined up with the start, and said there was no indication of a cyberattack.
- **A telling detail:** Microsoft noted that restored servers "can become unresponsive again once they begin receiving traffic".

Microsoft hadn't published a root cause when we wrote this, so everything below describes **general patterns**, not what happened inside Microsoft.

## Why overloaded systems collapse

A **cascading failure** is "a failure that grows over time as a result of positive feedback", in the words of [Google's SRE book](https://sre.google/sre-book/addressing-cascading-failures/). The loop usually looks like this:

1. Some servers fail or slow down.
2. The remaining servers take their traffic and get slower.
3. Requests start timing out, so clients **retry**.
4. Retries add even more load, and more servers fail.

That last detail from Microsoft, servers falling over again as soon as traffic returns, is exactly what this loop looks like during recovery: everything that queued up or retried during the outage arrives at once.

![Retry amplification: one click becomes 4, then 16, then 64 database attempts across three layers that each retry four times](/blog-images/microsoft-outage-retry-storms/retry-amplification.png "Retries at every layer multiply the load on the bottom layer")

## The 8 tools to stop it

### 1. Timeouts on every call

Without a timeout, threads and connections pile up behind one slow dependency until the caller falls over too. Set each timeout from measured latency, a little above your slow-but-normal requests, not from a guess.

### 2. Retries with exponential backoff and jitter

- Retry **at most 3 times** per request, then return the error. That's the per-request budget Google describes in [Handling Overload](https://sre.google/sre-book/handling-overload/).
- Wait longer before each attempt (exponential backoff), with a cap.
- Add **random jitter** so thousands of clients that failed at the same moment don't all retry at the same moment.
- Only retry operations that are safe to repeat. For writes such as payments, use [idempotency keys](/blog/idempotency-keys-explained).

```python
for attempt in range(3):
    try:
        return call(timeout=t)
    except Retryable:
        wait = min(cap, base * 2 ** attempt)
        sleep(random.uniform(0, wait))  # "full jitter"
raise
```

### 3. A retry budget

- Retry at **one layer only**: the one right above the failing service.
- Cap retries per client. Google only retries while retries are **under 10%** of requests.
- When a service is overloaded, it should answer "overloaded, don't retry", so callers higher up stop too.

### 4. Circuit breakers

![Circuit breaker states: closed, open and half-open, and the transitions between them](/blog-images/microsoft-outage-retry-storms/circuit-breaker.png "Fail fast while a dependency is down, then test it before sending full traffic")

When a dependency keeps failing, stop calling it for a while instead of hammering it. After a cool-down, let a few test calls through. If they succeed, close the breaker; if not, open it again.

### 5. Load shedding

Reject extra work early and cheaply, for example with a 429 or 503, instead of letting every request get slow. Tag requests by priority so the least important are dropped first. Google uses levels from CRITICAL_PLUS down to SHEDDABLE.

### 6. Graceful degradation

Do less work per request while under stress: serve cached or older data, return fewer results, turn off non-essential features. A slightly worse answer beats a timeout.

### 7. Deadlines, passed down

Pass each request's deadline to every downstream call, so the whole tree of calls shares one deadline, and drop work whose caller has already given up.

### 8. Short, bounded queues

Long queues only add latency. Google suggests queues of about half the thread pool size or less, and serving newest first under overload so fresh requests still succeed.

**Bonus, client-side throttling:** clients can protect a struggling backend themselves. Each one compares the requests it sent with the ones that were accepted, and once requests reach about twice the accepted ones, it starts rejecting some new requests locally.

## The one-line answer

> "This is a cascading failure: overload causes timeouts and timeouts cause retries. I'd add timeouts, cap retries at three with backoff and jitter at one layer, keep a retry budget, put circuit breakers on dependencies, and shed low-priority load first, so one failure can't snowball into a full outage."

## Follow-up questions to expect

- **"Why is jitter needed?"** Without it, clients that failed together retry together, and the spikes repeat.
- **"Which errors should you retry?"** Timeouts and temporary errors such as 503. Not 400s, auth errors, or "overloaded, don't retry".
- **"How do you recover safely?"** Bring capacity back gradually and keep shedding load, because servers that come back can be overwhelmed by everything that queued up.
- **"How do you spot it early?"** Watch retry rate, error rate, latency percentiles and queue length per dependency, and alert when retries climb.

Get it all on one page: [download the surviving overload cheat sheet (PDF)](/cheatsheets/surviving-overload.pdf). For more system design breakdowns, see [rate limiter system design](/blog/rate-limiter-system-design) and [caching strategies for system design](/blog/caching-strategies-system-design).
