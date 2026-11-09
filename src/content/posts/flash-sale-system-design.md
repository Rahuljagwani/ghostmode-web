---
slug: flash-sale-system-design
date: "2026-11-09"
title: "Flash sale system design: how to never sell stock you don't have"
seoTitle: "Flash Sale System Design: Prevent Overselling (Interview Guide)"
description: "How to design a flash sale checkout that never oversells: race conditions, atomic decrements, Redis counters, timed reservations, waiting rooms and idempotent payments."
excerpt: "Two people bought the last phone and both saw \"order confirmed\". Here's the bug behind it, and the five-step answer interviewers want for flash sale system design."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - flash sale system design
  - prevent overselling inventory
  - inventory race condition
  - redis inventory counter
  - virtual waiting room
  - system design interview questions
tldr:
  - "Overselling comes from a race condition: two buyers read the same stock before either one subtracts. Fix it by checking and subtracting in one atomic step."
  - "At high traffic, one hot row becomes a bottleneck. Keep the counter in Redis or split stock into several counters."
  - "Hold stock with a timed reservation, let buyers in through a waiting room, and make payment safe to retry with an idempotency key."
faqs:
  - q: "What causes overselling in a flash sale?"
    a: "A race condition. If the checkout reads the stock and then subtracts it in two separate steps, two buyers can read the same value at the same moment, both see one item left, and both get an order confirmed."
  - q: "How do you prevent overselling with SQL?"
    a: "Use a single conditional update, such as UPDATE inventory SET stock = stock - 1 WHERE sku = 'phone' AND stock > 0, and check how many rows it changed. The database applies it as one operation, so only one buyer can take the last unit; the other gets zero rows updated and sees sold out."
  - q: "Why use Redis for flash sale inventory?"
    a: "Redis keeps data in memory and runs commands one at a time, so an atomic decrement is very fast and can't be interleaved with another. That removes the queue of buyers waiting on one locked database row. The database stays the source of truth for orders."
  - q: "What is a virtual waiting room?"
    a: "A queue in front of the sale that lets buyers into checkout at a rate the system can handle and shows everyone else their place in line. It protects payments and the database from a sudden spike and is fairer than a crashed site."
---

Two people bought the last phone. Both saw "order confirmed". There was only one phone. This is the classic **flash sale** bug, and "design a flash sale checkout" is one of the most common **system design interview** questions.

It shows up in every big online sale: Black Friday, Singles' Day, and Diwali, India's biggest shopping festival, where online orders were up 21% year on year in the 2026 festive season according to [Unicommerce](https://indiantelevision.com/iworld/small-tickets-big-baskets-85-per-cent-of-diwali-2026-orders-were-below-rs-1000/).

The question usually sounds like: **"Design the checkout for a flash sale with limited stock. How do you make sure you never sell more than you have?"**

<!-- cta -->

## Step 0: Find the bug in the obvious answer

Most candidates start here:

```python
stock = db.get("phone")
if stock > 0:
    db.set("phone", stock - 1)
    place_order()
```

It looks correct, but there's a gap between **reading** the stock and **writing** it back.

![Two buyers both read stock = 1, both write stock = 0, and both get an order confirmed](/blog-images/flash-sale-system-design/race-condition.png "The race condition: two reads land before either write")

Two buyers read `stock = 1` in the same millisecond. Both pass the check. Both write `0`. Both get confirmed. That gap is a **race condition**, and naming it is the first thing the interviewer wants to hear.

## Step 1: Check and subtract in one step

Close the gap by making the check and the subtraction a single **atomic** operation:

```sql
UPDATE inventory
SET stock = stock - 1
WHERE sku = 'phone'
  AND stock > 0;
```

Then look at the result:

- **1 row updated:** this buyer got the unit. Create the order.
- **0 rows updated:** stock was already 0. Show "sold out".

The database locks the row while it applies the update, so two buyers can't both take the last unit. This alone fixes overselling, and for a normal shop it's enough.

## Step 2: Fix the hot row

At flash-sale scale, every buyer now updates the **same row**. They all wait in line for the same lock, checkout slows to a crawl, and the database's connections fill up.

Two common fixes:

- **Keep the live counter in Redis.** Redis runs commands one at a time in memory, so an atomic decrement is very fast ([Redis DECR](https://redis.io/docs/latest/commands/decr/)). Use a small Lua script so "check above zero, then decrement" runs as one step ([Redis scripting](https://redis.io/docs/latest/develop/interact/programmability/eval-intro/)). The orders database stays the source of truth; Redis only gates who gets to try.
- **Split the stock into buckets.** Put 100 phones into 10 counters of 10. Each buyer is sent to one bucket, so 10 locks share the load instead of one. When a bucket hits zero, try another.

Mention the trade-off: Redis is a second copy of the stock, so you need to load it before the sale starts and reconcile it with the database afterwards.

## Step 3: Reserve, don't sell, at the click

Taking a unit and taking payment are different moments. If you subtract stock and the buyer never pays, that phone is lost for the whole sale.

- On "Buy", create a **reservation** that holds one unit for a fixed time, such as 10 minutes.
- When payment succeeds, turn the reservation into an order.
- If the timer runs out, the reservation **expires** and the unit goes back to the counter for the next buyer.

You can store reservations with an expiry time in the database and release them with a scheduled job, or as Redis keys with a time to live.

## Step 4: Put a waiting room in front

Even with a fast counter, a flash sale sends far more traffic than payments and the database can handle at once. A **virtual waiting room** queues buyers before checkout:

- Let people into checkout at a steady rate the system can handle.
- Show everyone else their place in line and an honest wait time.
- Stop admitting new buyers once stock is gone, and tell them right away.

Managed options exist, such as [Cloudflare Waiting Room](https://developers.cloudflare.com/waiting-room/), and you can build one with a queue and admission tokens.

![Architecture: buyers pass a waiting room, the checkout API takes a unit from a Redis counter, holds it as a reservation, takes payment with an idempotency key and confirms the order in the database; expired reservations go back to the counter](/blog-images/flash-sale-system-design/architecture.png "The full flow: each layer closes one way the sale can break")

## Step 5: Make payment safe to retry

On a slow sale day, people tap "Pay" twice, and networks retry requests. Without protection, one buyer can be charged twice.

Give every checkout an **idempotency key**, a unique ID created once per order attempt. The payment service stores the result against that key; if the same key arrives again, it returns the first result instead of charging again. Payment providers support this directly ([Stripe: idempotent requests](https://docs.stripe.com/api/idempotent_requests)). We cover it in depth in [idempotency keys explained](/blog/idempotency-keys-explained).

## The one-line answer

> "The bug is a race between reading and writing stock, so I'd make the check and decrement one atomic step, move the hot counter to Redis or split it into buckets, hold units with a timed reservation, admit buyers through a waiting room, and make payment idempotent."

## Follow-up questions to expect

- **"What if Redis goes down mid-sale?"** Pause the sale or fall back to the database with a lower admission rate. Never sell without a counter.
- **"How do you make it fair?"** First-come order in the waiting room, one unit per account, and limits per payment method to stop bots.
- **"How do you know you didn't oversell?"** After the sale, reconcile orders against the starting stock and alert on any mismatch.

Related breakdowns: [caching strategies for system design](/blog/caching-strategies-system-design), [rate limiter system design](/blog/rate-limiter-system-design) and [the saga pattern for distributed transactions](/blog/saga-pattern-distributed-transactions).
