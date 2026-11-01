---
slug: zero-downtime-database-migrations
date: "2026-11-07"
title: "Zero-downtime database migrations: the expand and contract answer for interviews"
seoTitle: "Zero-Downtime Database Migrations: Expand and Contract"
description: "How to change a column on a huge, busy table without downtime: expand and contract, dual writes, batched backfills and safe cleanup, explained for interviews."
excerpt: "\"Change a column on a table with hundreds of millions of rows, with zero downtime.\" Here's the expand-and-contract answer, and the details interviewers dig into."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - zero downtime database migration
  - expand and contract pattern
  - schema migration large table
  - database backfill
  - backend interview questions
  - system design interview
tldr:
  - "A single big ALTER or UPDATE on a huge table can lock it or run as one giant transaction, blocking the app and lagging replicas."
  - "The safe pattern is expand and contract: add the new structure, write to both, backfill in batches, switch reads, then remove the old structure in a later release."
  - "Interviewers listen for batching, verification, lock timeouts, and the fact that every step is separately deployable and reversible."
faqs:
  - q: "What is the expand and contract pattern?"
    a: "Expand and contract, also called parallel change, makes a breaking schema change in safe steps. You first add the new column or table alongside the old one, update the application to write to both, backfill existing data, switch reads to the new structure, and only then remove the old one."
  - q: "Why not just run ALTER TABLE on a large table?"
    a: "Some ALTER operations take strong locks or rewrite the whole table, which can block reads and writes for a long time on a large, busy table. Even when the ALTER itself is fast, a single huge UPDATE to fill data can hold locks, bloat logs and cause replication lag."
  - q: "How do you backfill a large table safely?"
    a: "In small batches, for example a few thousand rows at a time, with short pauses between batches. Only update rows that still need filling so re-runs are safe, and watch replication lag and database load, slowing down if they rise."
  - q: "How do you roll back a zero-downtime migration?"
    a: "Because each step is deployed separately, you can stop and reverse at any point before the contract step. Reads can switch back to the old column, and the old column keeps receiving writes until you are confident enough to remove it."
---

A **zero-downtime database migration** changes the schema of a live database without blocking users. For large, busy tables, the standard approach is **expand and contract**: add the new structure next to the old one, move data and traffic across in safe steps, and remove the old structure last.

Interviewers ask it like this: "We need to change a column on a table with hundreds of millions of rows, without any downtime. How would you do it?"

<!-- cta -->

## Step 1: Explain why the naive approach is risky

On a small table, `ALTER TABLE ... ` followed by `UPDATE ...` is fine. On a huge, busy one:

- Some ALTER operations take **strong locks** or **rewrite the entire table**, blocking reads and writes while they run ([PostgreSQL ALTER TABLE](https://www.postgresql.org/docs/current/sql-altertable.html)).
- A single `UPDATE` across hundreds of millions of rows runs as **one huge transaction**: it holds locks, bloats logs and makes replicas fall behind.
- If something goes wrong halfway, rolling back is slow and painful.

Starting with this shows you understand the problem, not just the recipe.

## Step 2: Expand

Add the new structure **alongside** the old one, without breaking anything:

- Add the new column as **nullable**, without a default that forces a table rewrite.
- Deploy application code that **writes to both** the old and new columns on every insert and update.
- Keep **reading from the old column**. Nothing user-facing changes yet.

## Step 3: Backfill in batches

Now copy existing data into the new column:

- Process **small batches**, for example a few thousand rows, ordered by primary key.
- Only update rows **where the new column is still empty**, so the job can be stopped and re-run safely, and doesn't overwrite fresh values written by the app.
- **Pause between batches** and watch replication lag and database load. Slow down if they climb.
- Make the job **resumable**, so a crash at row 80 million doesn't mean starting over.

## Step 4: Switch reads and verify

- Compare old and new values with a **verification query** or sampling job until they match.
- Switch reads to the new column, ideally behind a **feature flag** so you can switch back instantly.
- Keep dual writes running. The old column is your safety net.

## Step 5: Contract

Only when you're confident:

- Stop writing to the old column.
- **Drop it in a later release**, after checking nothing still reads it.
- Throughout every step, set a **lock timeout** on schema changes so they fail fast instead of queueing behind long transactions and blocking everything.

Tools like **pgroll** for PostgreSQL or **pt-online-schema-change** for MySQL automate parts of this, and are worth mentioning as options.

## The steps at a glance

| Phase | What changes | Reversible? |
| --- | --- | --- |
| Expand | New nullable column; app writes to both | Yes, ignore the new column |
| Backfill | Old rows copied in batches | Yes, stop the job |
| Switch reads | App reads the new column | Yes, flip the flag back |
| Contract | Old column no longer written, then dropped | Only after this point is it final |

## The one-line answer

> "I'd use expand and contract: add the new column, dual-write, backfill in batches while watching replication lag, switch reads behind a flag after verifying, and drop the old column in a later release."

## Follow-up questions to expect

- **"What about renaming a column?"** Same pattern: a rename is "add new, copy, switch, remove old", never an in-place rename on a live system.
- **"How do you handle writes during the backfill?"** Dual writes keep new data in sync; the backfill only fills rows still empty, so it never overwrites them.
- **"How would you add an index without locking?"** In PostgreSQL, `CREATE INDEX CONCURRENTLY`, which avoids blocking writes at the cost of a slower build.

For more backend interview practice, see [how to scale a database](/blog/how-to-scale-a-database) and [idempotency keys explained](/blog/idempotency-keys-explained).
