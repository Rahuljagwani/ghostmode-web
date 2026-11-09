---
slug: caching-strategies-system-design
date: "2026-11-09"
title: "Caching strategies for system design interviews: cache-aside, write-through and invalidation"
seoTitle: "Caching Strategies for System Design: Cache-Aside to Write-Back"
description: "How to answer caching questions in system design interviews: cache-aside vs write-through vs write-back, TTLs, invalidation, stampedes and hot keys."
excerpt: "\"Our product pages are slow and the database is at 90% CPU. Add a cache.\" Here's how to answer it, including the invalidation follow-ups interviewers always ask."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - caching strategies system design
  - cache aside vs write through
  - cache invalidation
  - redis caching interview questions
  - cache stampede
  - system design interview questions
tldr:
  - "Default to cache-aside: read from the cache, fall back to the database on a miss, then fill the cache with a TTL."
  - "On writes, update the database and delete the cache key. Deleting is safer than updating the cached value."
  - "Be ready for the follow-ups: stale reads, cache stampedes on hot keys, and what happens when the cache goes down."
faqs:
  - q: "What is the cache-aside pattern?"
    a: "In cache-aside, the application checks the cache first. On a miss it reads from the database, returns the result, and stores it in the cache with an expiry time. The cache only ever holds data that has actually been read."
  - q: "What is the difference between write-through and write-back caching?"
    a: "Write-through writes to the cache and the database in the same request, so the cache is always fresh but writes are slower. Write-back writes only to the cache and flushes to the database later, which is faster but can lose data if the cache fails before the flush."
  - q: "Why delete a cache key instead of updating it on write?"
    a: "If two requests update the same record at nearly the same time, their cache updates can land in the wrong order and leave an old value in the cache. Deleting the key means the next read loads the current value from the database."
  - q: "What is a cache stampede?"
    a: "A cache stampede happens when a popular key expires and many requests miss at once, all hitting the database together. You prevent it with a lock so only one request rebuilds the value, by refreshing the value before it expires, or by adding random jitter to TTLs."
---

A **cache** keeps a copy of frequently read data in fast memory, such as Redis or Memcached, so most reads skip the slower database. Caching is in almost every system design interview, and the real test isn't adding a cache. It's explaining **how data gets in, how it stays correct, and what breaks**.

It's often asked like this: "Product pages are slow and the database is at 90% CPU. How would you fix it?"

<!-- cta -->

## Step 1: Check that caching fits

Caching works when reads far outnumber writes and slightly stale data is acceptable. Say this out loud, and ask:

- **Read/write ratio:** product pages might be read 1,000 times for every update. Great for caching.
- **How stale is OK?** A product description can be a minute old. A bank balance can't.
- **What's the access pattern?** If a small set of items gets most traffic, a small cache gives a big win.

## Step 2: Use cache-aside as the default

![Cache-aside read path: the app checks the cache, reads the database on a miss, and stores the result with a TTL](/blog-images/caching-strategies-system-design/cache-aside.png "Cache-aside: the application, not the cache, decides what gets stored")

In **cache-aside** (also called lazy loading), your application does the work:

1. Look up the key in the cache, such as `product:42`.
2. On a **hit**, return it.
3. On a **miss**, read from the database, return the result, and store it in the cache with a **TTL** (time to live), such as 10 minutes.

It's the most common pattern because it's simple, the cache only holds data people actually read, and if the cache goes down, the app still works by reading the database, just more slowly.

## Step 3: Decide how writes work

![Comparison of cache-aside, write-through and write-back write paths](/blog-images/caching-strategies-system-design/write-strategies.png "Where the write goes first decides speed, freshness and risk")

| Strategy | Write path | Strength | Risk |
| --- | --- | --- | --- |
| Cache-aside | Write DB, then delete the cache key | Simple, cache holds only hot data | Short window of stale reads |
| Write-through | Write cache and DB in the same request | Cache is always fresh | Slower writes, caches data nobody reads |
| Write-back | Write cache, flush DB later | Fastest writes | Data loss if the cache dies before flushing |

For most web apps, say: **"cache-aside with a TTL, and delete the key on every write."** Bring up write-back only for write-heavy cases where losing a few seconds of data is acceptable, like view counters.

## Step 4: Handle invalidation

Interviewers push hardest here. Three points to make:

- **Delete, don't update.** If two writes race, their cache updates can arrive in the wrong order and leave an old value cached. Deleting the key lets the next read load the truth.
- **TTLs are your safety net.** Even if an invalidation is missed, the stale value expires on its own.
- **Order matters:** update the database first, then delete the key. Deleting first leaves a gap where another request can read the old row and put it back in the cache.

Facebook's paper on running Memcache at scale describes these exact race conditions and uses short-lived "leases" to prevent stale sets ([Scaling Memcache at Facebook](https://www.usenix.org/conference/nsdi13/technical-sessions/presentation/nishtala)). It's a strong reference if the interviewer goes deep.

## Step 5: Protect against stampedes and hot keys

- **Cache stampede:** a popular key expires and thousands of requests miss at once, hammering the database. Fix it with a lock so only one request rebuilds the value, by refreshing popular keys before they expire, or by adding random jitter to TTLs so keys don't all expire together.
- **Hot keys:** one key, like a viral product, gets so much traffic it overloads a single cache node. Keep a small in-process cache on each app server for a few seconds, or copy the key to several nodes.
- **Cache down:** decide whether to fall back to the database (and rate limit it so it isn't overwhelmed) or serve an error for non-critical data.

## The one-line answer

> "I'd add Redis with cache-aside and a TTL, delete keys on writes after updating the database, protect hot keys against stampedes with a lock and TTL jitter, and make sure the app still works, more slowly, if the cache goes down."

## Follow-up questions to expect

- **"What TTL would you pick?"** Based on how stale the data can be. Minutes for product pages, seconds for prices or stock levels.
- **"How do you know the cache is working?"** Track the hit rate, eviction rate and database load before and after.
- **"What do you cache: rows or whole responses?"** Whole responses are faster but harder to invalidate. Rows or objects are more reusable.

Practise it with our other backend breakdowns: [how to scale a database](/blog/how-to-scale-a-database) and [rate limiter system design](/blog/rate-limiter-system-design).
