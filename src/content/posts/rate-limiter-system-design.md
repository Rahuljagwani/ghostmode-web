---
slug: rate-limiter-system-design
date: "2026-11-08"
title: "Rate limiter system design: token bucket, sliding window and Redis, for interviews"
seoTitle: "Rate Limiter System Design: Token Bucket to Redis"
description: "How to design a rate limiter for an API on many servers: requirements, token bucket vs sliding window, atomic Redis counters, 429s and load shedding."
excerpt: "\"Design a rate limiter for a public API that runs on many servers.\" A classic system design question, with a five-step answer that covers the trade-offs interviewers probe."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - rate limiter system design
  - token bucket vs sliding window
  - distributed rate limiting
  - redis rate limiter
  - system design interview questions
  - backend interview questions
tldr:
  - "Clarify first: limit by user, API key or IP, over what period, and whether short bursts are allowed."
  - "Token bucket allows controlled bursts; sliding window is smoother and stricter; fixed windows can allow double bursts at the boundary."
  - "With many servers, keep counters in a shared store like Redis and update them atomically. Return 429 with Retry-After, and add load shedding to protect the system as a whole."
faqs:
  - q: "What is a rate limiter?"
    a: "A rate limiter controls how many requests a client can make in a period of time, such as 100 requests per minute per API key. It protects services from abuse and overload and keeps usage fair between clients."
  - q: "What is the difference between token bucket and sliding window rate limiting?"
    a: "A token bucket refills tokens at a steady rate and lets a client spend saved-up tokens in a burst, up to the bucket size. A sliding window counts requests over a rolling time period, giving smoother, stricter limits without the boundary spikes of fixed windows."
  - q: "How do you rate limit across multiple servers?"
    a: "Store the counters in a shared, fast data store such as Redis, so every server sees the same count, and update them atomically, for example with a Lua script or atomic increment with expiry, so concurrent requests can't both slip through."
  - q: "What HTTP status code should a rate limiter return?"
    a: "429 Too Many Requests, ideally with a Retry-After header telling the client when it can try again, and optionally headers showing the limit and remaining requests."
---

A **rate limiter** caps how many requests a client can make in a period of time, such as 100 requests per minute per API key. It protects your service from abuse and overload and keeps usage fair. Designing one that works **across many servers** is a classic backend system design question.

It's usually asked like this: "How would you design a rate limiter for a public API that runs on many servers?"

<!-- cta -->

## Step 1: Clarify the requirements

Ask before designing:

- **Who is limited?** Per user, per API key, per IP, or per endpoint? Paid tiers may get higher limits.
- **Over what period?** Requests per second, per minute or per day, or several at once.
- **Bursts?** Can a client save up and send a burst, or must traffic be smooth?
- **Hard or soft?** Reject immediately, or queue and delay?
- **Scale:** how many clients and requests per second, and how much extra latency is acceptable per request?

## Step 2: Pick an algorithm

| Algorithm | How it works | Strengths | Weaknesses |
| --- | --- | --- | --- |
| Fixed window | Count requests per calendar window (e.g. per minute) | Simplest, cheap | Up to 2x bursts across a window boundary |
| Sliding window | Count over a rolling period | Smooth, fair | More state or approximation needed |
| Token bucket | Tokens refill at a steady rate; each request spends one | Allows controlled bursts, simple state | Burst size needs tuning |
| Leaky bucket | Requests drain at a fixed rate from a queue | Very smooth output | Adds queueing delay |

For a public API, a **token bucket** per client is a strong default: it's simple to store (tokens and last refill time) and tolerates realistic, bursty clients.

## Step 3: Keep shared, atomic state

With one server, an in-memory counter works. With many servers behind a load balancer, each would see only part of a client's traffic. So:

- Keep counters in a **shared, fast store** such as Redis, keyed by client and window ([Redis on rate limiting](https://redis.io/glossary/rate-limiting/)).
- Update them **atomically**, for example with a Lua script that reads, refills and decrements in one step, so two concurrent requests can't both take the last token.
- Set **expiry** on keys so idle clients don't consume memory.

Mention the trade-off: every request now makes a network call to Redis. Keep it in the same region, and consider a small local allowance per server for very high-throughput limits.

## Step 4: Respond and fail well

- Return **429 Too Many Requests** with a **Retry-After** header, plus optional headers showing the limit and remaining requests, so clients can back off politely.
- Decide what happens if Redis is down: **fail open** (allow requests and risk overload) or **fail closed** (reject requests and risk an outage). Many public APIs fail open for normal endpoints and closed for expensive or sensitive ones.

## Step 5: Protect the whole system too

Per-client limits don't stop overload when many legitimate clients arrive at once. Add:

- **Concurrency limits** on expensive endpoints.
- **Load shedding:** when the system is overloaded, drop low-priority traffic first so critical requests, such as payments, still succeed.

Stripe describes running several kinds of limiter together, including request rate limits, concurrency limits and load shedders, in its engineering write-up ([Stripe: scaling your API with rate limiters](https://stripe.com/blog/rate-limiters)). It's a useful real-world example to cite.

## The one-line answer

> "I'd use a token bucket per client, stored and updated atomically in Redis, return 429 with Retry-After, decide fail-open or fail-closed per endpoint, and add concurrency limits and load shedding to protect critical traffic."

## Follow-up questions to expect

- **"Why not a fixed window?"** At the boundary a client can send a full window's worth at the end of one window and again at the start of the next.
- **"Where does the limiter run?"** At the API gateway or in middleware before business logic, so rejected requests cost almost nothing.
- **"How do you limit per IP fairly?"** Be careful with shared IPs, like offices or mobile carriers. Prefer API keys or user IDs where possible.

Practise it alongside our other backend breakdowns: [idempotency keys explained](/blog/idempotency-keys-explained) and [zero-downtime database migrations](/blog/zero-downtime-database-migrations).
