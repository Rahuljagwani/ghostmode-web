---
slug: idempotency-keys-explained
date: "2026-11-04"
title: "Idempotency keys explained: how to stop double charges, for backend interviews"
seoTitle: "Idempotency Keys Explained: Backend Interview Guide"
description: "A client retries a payment after a timeout. How idempotency keys prevent double charges, how to store them safely, and how to answer it in an interview."
excerpt: "The request timed out. Did the payment go through? Nobody knows, so the client retries. Here's how idempotency keys make that retry safe, and how to explain it."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - idempotency key
  - idempotency key api design
  - idempotent api
  - prevent duplicate payments
  - backend interview questions
  - system design interview
tldr:
  - "A timeout is ambiguous: the server may or may not have processed the request, so clients must be able to retry safely."
  - "An idempotency key is a unique ID the client sends with each logical request and reuses on every retry. The server stores it with the result and returns that result for repeats."
  - "The details interviewers probe: storing the key atomically with the side effect, handling concurrent retries, and expiring keys."
faqs:
  - q: "What is an idempotency key?"
    a: "An idempotency key is a unique value, usually a UUID, that a client sends with a request that has side effects, such as a payment. If the same request is retried with the same key, the server returns the original result instead of performing the action again."
  - q: "What does idempotent mean in an API?"
    a: "An operation is idempotent if doing it once or many times has the same effect. GET, PUT and DELETE are designed to be idempotent in HTTP; POST is not, which is why payment APIs add idempotency keys to POST requests."
  - q: "Who generates the idempotency key, the client or the server?"
    a: "The client. It must create the key before the first attempt and reuse it on every retry of the same logical operation, because only the client knows that two requests are the same attempt."
  - q: "How long should idempotency keys be stored?"
    a: "Longer than any realistic retry window, then they can be pruned. Stripe, for example, keeps keys for at least 24 hours. The right period depends on how long your clients may keep retrying."
---

An **idempotency key** is a unique ID a client attaches to a request, so that if the request is retried, the server performs the action **only once** and returns the original result. It's how payment APIs like Stripe prevent double charges when networks fail ([Stripe docs](https://docs.stripe.com/api/idempotent_requests)).

In interviews it comes up as: "A client sends a payment request, times out, and retries. How do you make sure the customer isn't charged twice?" Here's a structured answer.

<!-- cta -->

## Step 1: Explain why timeouts are ambiguous

When a request times out, the client can't tell what happened:

- The request never reached the server.
- The server charged the card, but the response was lost.
- The server is still processing it.

So the client **has to retry**, and the server has to make retries **safe**. Blaming the client or "just not retrying" isn't an answer; networks will always fail sometimes.

## Step 2: Introduce idempotency keys

The client generates a unique key, such as a UUID, for each **logical** operation, like "pay invoice 123", and sends it with the request, usually in a header such as `Idempotency-Key`. Every retry of that same payment reuses the same key. A genuinely new payment gets a new key.

The server's rule becomes simple: **if I've seen this key before, return what I returned last time.**

## Step 3: Store the key and the result together

This is where most answers get vague, and where strong ones stand out.

- Store the key, a fingerprint of the request parameters, and the **response** in your database.
- Write the key **in the same transaction** as the side effect, such as the order or charge record. If they're written separately, a crash between the two can either charge without recording the key or record the key without charging.
- When a request arrives with a known key, return the stored response without doing the work again.

If the side effect happens in an external system, such as a payment provider, pass your own idempotency key through to that provider too, so the protection covers the whole chain.

## Step 4: Handle concurrent retries

Retries don't always arrive after the first request finishes. Two can be in flight at once.

- Put a **unique constraint** on the key, or take a lock on it, so only one request can claim it. The second one either waits for the result or gets a "request in progress" response it can retry.
- Store the request parameters with the key. If a client reuses a key with **different parameters**, reject it; that's a client bug, and quietly returning the old result would hide it.

## Step 5: Expire keys and retry well

- Keep keys for **longer than any realistic retry window**, then prune them. Stripe keeps keys for at least 24 hours ([Stripe docs](https://docs.stripe.com/api/idempotent_requests)).
- On the client, retry with **exponential backoff and jitter**, so a struggling server isn't flooded by synchronised retries.

## How it fits together

| Scenario | Without keys | With idempotency keys |
| --- | --- | --- |
| Response lost, client retries | Charged twice | Original result returned |
| Two retries at the same time | Possibly charged twice | Unique constraint lets only one through |
| Key reused with a different amount | Silent wrong charge | Rejected as a client error |
| Retry after a crash mid-request | Unclear state | Atomic write means charged and recorded, or neither |

## The one-line answer

> "Make the endpoint idempotent: the client sends a unique key per operation, the server stores it atomically with the result, and every retry with that key returns the original outcome."

## Follow-up questions to expect

- **"Why can't the server detect duplicates by amount and customer?"** Because two identical payments can be legitimate, for example two coffees in a row. Only the client knows whether a request is a retry.
- **"What if the first request is still processing when the retry arrives?"** The unique key blocks the second; return "in progress" or wait for the first to finish.
- **"Does this make the system exactly-once?"** It makes the effect happen once per key. End-to-end, you also need the downstream systems to honour the key.

If you're preparing for backend interviews, our guide on [how to scale a database](/blog/how-to-scale-a-database) covers the other classic system design question, step by step.
