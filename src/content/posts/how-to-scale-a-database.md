---
slug: how-to-scale-a-database
date: "2026-11-03"
title: "How to scale a database: the backend interview answer, step by step"
seoTitle: "How to Scale a Database: Backend Interview Answer"
description: "Your database is the bottleneck at peak traffic. How to answer this backend interview question: queries, pooling, read replicas, partitioning and sharding."
excerpt: "\"Our database is the bottleneck. How would you scale it?\" Most candidates jump straight to sharding. Here's the order interviewers actually want to hear."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - how to scale a database
  - database scaling interview question
  - read replicas vs sharding
  - database sharding
  - connection pooling
  - backend interview questions
tldr:
  - "Scaling a database is a sequence, not a single technique: fix queries, pool connections, scale reads, partition, and shard last."
  - "Read replicas scale reads, not writes, and they lag. Sharding is the only common step that spreads writes, and it's expensive to undo."
  - "Interviewers reward candidates who measure first and explain the trade-off at every step."
faqs:
  - q: "What is the first step to scale a database?"
    a: "Find out what is actually slow. Check the slow query log, query plans and missing indexes, and look for N+1 query patterns in the application. Many performance problems are a handful of expensive queries, not a lack of hardware."
  - q: "Do read replicas help with write traffic?"
    a: "No. Read replicas copy data from the primary and serve reads. All writes still go to the primary, so replicas only help when reads are the bottleneck. They also lag slightly behind the primary."
  - q: "What is the difference between partitioning and sharding?"
    a: "Partitioning splits one large table into smaller pieces inside the same database, while the application still sees one table. Sharding spreads data across separate database servers, which also spreads the write load but makes cross-shard queries and transactions harder."
  - q: "When should you shard a database?"
    a: "When write volume or data size outgrows what a single, well-tuned primary can handle, after you have optimised queries, added caching and replicas, and partitioned large tables. Choose the shard key carefully, because it decides your query patterns and is very hard to change later."
---

**Scaling a database** means increasing how much traffic and data it can handle without slowing down. In interviews, the question usually sounds like this: "At peak traffic, our database becomes the bottleneck and the whole API slows down. How would you scale it?"

The trap is to answer "shard it" in the first sentence. Sharding is real, but it's the most expensive step, and most systems never need it. Interviewers want to hear that you **measure first** and climb a ladder of options, explaining the trade-off at each rung.

<!-- cta -->

## Step 1: Find the real bottleneck

Before adding infrastructure, find out what is slow:

- **Slow query log and query plans.** Look for full table scans, missing indexes and queries that sort or join far more rows than they return.
- **N+1 queries.** An endpoint that loads a list and then queries once per item can turn one request into hundreds of database calls.
- **Lock contention.** Long transactions or hot rows can make everything wait, even when CPU is low.

Often a few indexes and a rewritten query fix the "scaling" problem outright. Say that in the interview: it shows judgment.

## Step 2: Pool connections

Databases handle a limited number of concurrent connections well. A burst of traffic that opens a new connection per request can overwhelm the database even if each query is fast.

A **connection pooler** such as PgBouncer for PostgreSQL keeps a small set of connections open and shares them. Be precise about what it does: pooling **limits concurrency and connection churn**, but it doesn't make an expensive query cheaper.

## Step 3: Scale reads with caching and read replicas

If most traffic is reads:

- **Cache hot data** that can be slightly stale, such as product details or configuration, in something like Redis.
- **Add read replicas** that copy data from the primary and serve read queries.

The key trade-off is **replication lag**. Replicas are usually a little behind the primary, so a user who just updated their profile might read the old version from a replica. The standard fix is to send reads that must see the user's own writes to the primary, or to keep that user's session on the primary for a short time.

And remember: **replicas don't help with writes**. Every write still goes to the primary.

## Step 4: Partition large tables

When one table becomes huge, for example years of events or orders, **partitioning** splits it into smaller pieces inside the same database, usually by time or by key. PostgreSQL supports this natively ([PostgreSQL docs](https://www.postgresql.org/docs/current/ddl-partitioning.html)).

Queries that filter by the partition key touch less data, and maintenance gets easier: you can drop an old partition instead of deleting millions of rows. The application still sees a single table.

## Step 5: Shard last

**Sharding** spreads data across multiple database servers, each holding a subset of rows. It's the only step on this list that spreads **write** load, which is why very large systems use it.

It also brings real costs:

- **Cross-shard queries and joins** become slow or impossible.
- **Transactions across shards** need extra machinery.
- **The shard key** decides which queries are cheap, where hot spots appear, and is very hard to change later.

A strong answer names a sensible shard key for the scenario, such as tenant ID for a multi-tenant SaaS product, and explains why.

## The ladder at a glance

| Step | Helps with | Main trade-off |
| --- | --- | --- |
| Fix queries and indexes | Everything | Requires measurement, not hardware |
| Connection pooling | Bursts, too many connections | Doesn't speed up slow queries |
| Caching | Hot reads | Stale data, invalidation |
| Read replicas | Read volume | Replication lag; writes unchanged |
| Partitioning | Huge tables | Queries must use the partition key |
| Sharding | Write volume, data size | Cross-shard queries, hard to reverse |

## The one-line answer

> "I'd fix queries and indexes first, pool connections, scale reads with caching and replicas, partition the biggest tables, and shard only when writes truly outgrow one primary."

## Follow-up questions to expect

- **"A user updates their profile and still sees the old one. Why?"** Replication lag. Read their own writes from the primary.
- **"How would you pick a shard key?"** By the most common access pattern and even distribution, such as tenant ID or user ID, avoiding keys that create hot spots like a timestamp.
- **"What would you monitor?"** Query latency percentiles, connection counts, replication lag, cache hit rate and lock waits.

If this question came up for you, the same thinking applies to caching. Our breakdown on keeping a cache consistent with the database pairs well with it, and our [LLM system design framework](/blog/llm-system-design-interview) shows the same "clarify, then scale step by step" structure.
