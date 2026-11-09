---
slug: database-indexing-interview-questions
date: "2026-11-14"
title: "Database indexing interview questions: B-trees, composite indexes and query plans"
seoTitle: "Database Indexing Interview Questions: B-Trees to EXPLAIN"
description: "How database indexes work and how to answer indexing questions: B-tree lookups, composite index column order, covering indexes, write costs and reading EXPLAIN."
excerpt: "\"This query takes 4 seconds on a 50-million-row table. How do you fix it?\" Here's how to answer, and the indexing questions that usually follow."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - database indexing interview questions
  - composite index column order
  - b-tree index
  - covering index
  - explain query plan
  - sql interview questions
tldr:
  - "A B-tree index keeps values sorted in a shallow tree, so a lookup reads a few pages instead of scanning every row."
  - "In a composite index, column order matters: equality columns first, then the range or sort column. A query that skips the first column usually can't use it well."
  - "Indexes speed up reads but slow down writes and use storage. Always confirm with EXPLAIN that the index is actually used."
faqs:
  - q: "How does a database index work?"
    a: "Most databases use a B-tree index: a balanced tree of sorted pages. To find a value, the database starts at the root and follows pointers down to a leaf page, which points to the matching rows. Even for millions of rows this takes only a few page reads."
  - q: "Does column order matter in a composite index?"
    a: "Yes. An index on (customer_id, created_at) is sorted by customer_id first, so it helps queries that filter on customer_id, or on customer_id and created_at. A query filtering only on created_at usually can't use it efficiently."
  - q: "What is a covering index?"
    a: "A covering index contains every column a query needs, so the database can answer from the index alone without reading the table. In PostgreSQL this shows up as an index-only scan."
  - q: "Why not index every column?"
    a: "Every index must be updated on each insert, update and delete, which slows writes, and each one takes storage and memory. Add indexes for real, frequent queries and remove ones that aren't used."
---

**Indexes** are the first tool for slow queries, and indexing questions show up in almost every backend interview. The usual opener: **"This query takes 4 seconds on a 50-million-row orders table. How would you fix it?"** Interviewers want to see that you understand how an index works, not just that you'd "add an index".

<!-- cta -->

## Step 1: Look at the query plan first

Run `EXPLAIN ANALYZE` (PostgreSQL) or `EXPLAIN` (MySQL) and read what the database actually does:

- **Seq Scan / full table scan:** it reads every row. On 50 million rows, that's your 4 seconds.
- **Index Scan:** it uses an index to jump to matching rows.
- **Index Only Scan:** it answers from the index alone, the fastest case.
- Compare **estimated vs actual rows**. Big gaps mean stale statistics; run `ANALYZE`.

## Step 2: Explain how a B-tree index works

![B-tree index on users(email): root, internal and leaf pages, with a leaf pointing to the table row](/blog-images/database-indexing-interview-questions/b-tree.png "A lookup walks from the root to one leaf, then to the row")

- A **B-tree** stores values in **sorted** pages arranged as a shallow, balanced tree.
- A lookup starts at the root and follows one path down to a **leaf**, which points to the row. Because each page holds hundreds of keys, even millions of rows need only a few page reads.
- Since values are sorted, B-trees also handle **ranges** (`created_at > ...`) and **sorting** (`ORDER BY`) well.
- **Hash indexes** only handle exact equality, so B-trees are the default for good reason.

## Step 3: Get composite index column order right

![Composite index on (customer_id, created_at): which WHERE clauses can use it](/blog-images/database-indexing-interview-questions/composite-index.png "The leftmost-prefix rule: a query should start with the first column")

For `SELECT * FROM orders WHERE customer_id = 7 AND created_at > '2026-11-01' ORDER BY created_at DESC`, create:

```sql
CREATE INDEX idx_orders_customer_created ON orders (customer_id, created_at);
```

- The index is sorted by `customer_id`, then by `created_at` within each customer.
- **Equality columns first, then the range or sort column.** Reversed, the database would scan a big date range and filter customers afterwards.
- The **leftmost-prefix rule:** this index helps queries on `customer_id`, or `customer_id` plus `created_at`. A query on `created_at` alone usually can't use it efficiently (some newer databases can "skip scan", but don't rely on it). See the [PostgreSQL docs on multicolumn indexes](https://www.postgresql.org/docs/current/indexes-multicolumn.html).

## Step 4: Know when indexes don't help

- **Low selectivity:** an index on `status` where 95% of rows are `active` won't help a query for active rows. The database will scan anyway.
- **Functions on the column:** `WHERE LOWER(email) = ...` can't use a plain index on `email`. Create an expression index on `LOWER(email)` instead.
- **Leading wildcards:** `LIKE '%gmail.com'` can't use a B-tree. Consider full-text or trigram indexes.
- **Type mismatches:** comparing a text column to a number can stop index use.

## Step 5: Talk about the costs

- Every index is updated on each **insert, update and delete**, so write-heavy tables pay for every extra index.
- Indexes use **disk and memory**. If the hot part of your indexes doesn't fit in memory, lookups slow down.
- **Covering indexes** (in PostgreSQL, `INCLUDE (total)`) can avoid table reads, but make the index bigger.
- On a live table, build indexes without blocking writes: `CREATE INDEX CONCURRENTLY` in PostgreSQL. More in [zero-downtime database migrations](/blog/zero-downtime-database-migrations).

## The one-line answer

> "I'd run EXPLAIN ANALYZE to confirm it's a full scan, then add a B-tree index matching the query: equality column first, then the range or sort column, possibly covering the selected columns. I'd build it concurrently, check the new plan, and keep in mind the write and storage cost."

## Follow-up questions to expect

- **"Clustered vs non-clustered index?"** In MySQL's InnoDB, the table itself is stored in primary key order (clustered); other indexes point to the primary key. PostgreSQL stores tables separately (heap) and all indexes point to rows.
- **"How do you find unused indexes?"** Use the database's index usage statistics, like `pg_stat_user_indexes`, and drop indexes with no scans.
- **"The index exists but isn't used. Why?"** Stale statistics, low selectivity, a function on the column, or a type mismatch.

Related: [how to scale a database](/blog/how-to-scale-a-database) and [caching strategies for system design](/blog/caching-strategies-system-design).
