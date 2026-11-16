---
slug: url-shortener-system-design
date: "2026-11-17"
title: "URL shortener system design: a step-by-step interview answer"
seoTitle: "URL Shortener System Design: Step-by-Step Interview Answer"
description: "Design a URL shortener like an interviewer expects: requirements, estimates, short code generation with base62 and counter ranges, the redirect path, caching, 301 vs 302, and scaling."
excerpt: "\"Design a URL shortener.\" It's the most common first system design question. Here's a clear answer, from requirements to scaling."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - url shortener system design
  - design tinyurl
  - base62 encoding
  - short url generation
  - 301 vs 302 redirect
  - system design interview questions
tldr:
  - "Start with requirements and estimates: redirects far outnumber new links, so the design is built around a fast, cached read path."
  - "Generate codes from a counter, handed out to servers in blocks, and encode each number in base62. Seven characters give about 3.5 trillion codes and no collisions."
  - "Serve redirects from a cache in front of a key-value or SQL store, use 302 if you need click analytics, and record clicks asynchronously."
faqs:
  - q: "How does a URL shortener generate short codes?"
    a: "The most common approach is a unique number from a counter, encoded in base62 (0-9, a-z, A-Z). To avoid a single bottleneck, a counter service hands out blocks of numbers to each server. The alternative is hashing the long URL and taking a prefix, which needs collision checks."
  - q: "How many URLs can 7 base62 characters represent?"
    a: "62 to the power of 7, which is about 3.5 trillion codes."
  - q: "Should a URL shortener use a 301 or 302 redirect?"
    a: "A 301 is permanent, so browsers may cache it and skip your server on later clicks, which saves load but loses click counts. A 302 is temporary, so every click reaches your server, which is what you want for analytics."
  - q: "Which database should a URL shortener use?"
    a: "The main access pattern is a lookup by short code, so a key-value store works well at very large scale. A relational database with an index on the code is also fine for most sizes and makes features like user accounts easier."
---

"Design a URL shortener" is often the **first** system design question you'll get, because it's small enough to finish in 45 minutes and still touches IDs, storage, caching and scale. The goal isn't a perfect design. It's a clear, structured one.

The interview prompt: **"Design a service like TinyURL. Users paste a long URL and get a short link that redirects to it."**

<!-- cta -->

## Step 1: Agree on requirements

**Functional:**
- Create a short link for a long URL, optionally with a custom alias and an expiry date.
- Redirect the short link to the long URL.
- (Optional) Count clicks.

**Non-functional:**
- Redirects must be fast and highly available. A broken short link breaks someone else's page.
- Codes should be short and not easy to guess, if links can be private.

## Step 2: Do quick estimates

Pick round numbers and say them out loud. For example, 100 million new links a month and 100 reads for every write:

- **Writes:** 100M / (30 x 86,400 s) is about **40 per second**.
- **Reads:** about **4,000 redirects per second** on average, with peaks several times higher.
- **Storage:** about 500 bytes per link x 100M x 12 months x 5 years is about **3 TB**.

The conclusion matters more than the exact numbers: **this is a read-heavy system**, so the design centres on a fast, cached read path.

## Step 3: Sketch the API and the design

```text
POST /shorten   { "url": "https://...", "alias": null, "expires_at": null }  -> { "code": "aB3x9Kq" }
GET  /{code}    -> 302 redirect to the long URL
```

![URL shortener high-level design: client, load balancer, stateless API service, cache, database and ID generator](/blog-images/url-shortener-system-design/architecture.png "Reads hit the cache first; only misses go to the database")

- **API service:** stateless, so you can add servers behind the load balancer.
- **Cache:** code to long URL, for popular links.
- **Database:** code (primary key), long URL, owner, created and expiry times.

## Step 4: Generate the short code (the core of the question)

There are two main approaches.

**A) Hash the URL** (for example MD5 or SHA-256) and take the first 7 characters. Simple, and the same URL can map to the same code, but different URLs can collide, so you must check the database and retry on a clash.

**B) Counter plus base62 (usually the better answer).** Give every link a unique number and encode it with the 62 characters 0-9, a-z and A-Z.

![A counter service hands out blocks of IDs to each server, which encodes each ID in base62](/blog-images/url-shortener-system-design/id-generation.png "Blocks of IDs remove the single-counter bottleneck and collisions")

- **7 characters give 62^7, about 3.5 trillion codes**, which is plenty.
- A single counter would be a bottleneck, so a **counter service hands out blocks** (say 1,000 IDs) to each API server. Servers then create codes from memory with no coordination.
- No collisions are possible, because each number is used once. If a server crashes, you just lose the rest of its block.
- Sequential numbers produce guessable codes. If that matters, shuffle the number with a reversible scramble before encoding, or add a few random characters.

**Custom aliases** go through the same table: insert with a unique constraint and return an error if the alias is taken.

## Step 5: Make redirects fast

1. Look up the code in the cache (for example Redis).
2. On a miss, read from the database and fill the cache.
3. Return the redirect.

A small share of links gets most of the clicks, so even a modest cache has a high hit rate. Cache "not found" results briefly too, so bots hitting random codes don't hammer the database.

**301 or 302?** A **301** (permanent) lets browsers cache the redirect, which saves load but means later clicks never reach you. A **302** (temporary) sends every click through your service, which you need for **click analytics** and for links that can be edited or expire.

## Step 6: Scale and harden it

- **Storage:** the lookup is always by code, so a key-value store scales easily; a relational database with the code as primary key also works for a long time. Shard by code if needed, for example with [consistent hashing](/blog/consistent-hashing-explained).
- **Analytics:** don't write a row per click in the redirect path. Publish click events to a queue and aggregate them asynchronously. (See [Kafka vs RabbitMQ vs SQS](/blog/kafka-vs-rabbitmq-vs-sqs).)
- **Abuse:** rate limit link creation per user and IP (see [rate limiter system design](/blog/rate-limiter-system-design)), and check new URLs against malware and phishing lists.
- **Expiry:** delete expired links with a background job, and check expiry on read.

## The one-line answer

> "It's read-heavy, so I'd build around a cached redirect path. Codes come from a counter handed out in blocks and encoded in base62, so seven characters give about 3.5 trillion codes with no collisions. Redirects use 302 for analytics, clicks go to a queue, and creation is rate limited."

## Follow-up questions to expect

- **"What if the same long URL is shortened twice?"** Either allow two codes (simpler, and lets each user track their own clicks) or look up an index on the long URL first and reuse the code.
- **"How do you keep the counter service from being a single point of failure?"** Run it with a replicated store, and have servers fetch the next block before the current one runs out, so a short outage doesn't block writes.
- **"How would you handle a link that goes viral?"** It's already in the cache; add a small in-memory cache on each API server for the hottest codes.
