---
slug: cursor-pagination-vs-offset
date: "2026-11-17"
title: "OFFSET vs cursor pagination: why page 10,000 is slow and how to fix it"
seoTitle: "OFFSET vs Cursor Pagination: Why Deep Pages Are Slow"
description: "Why OFFSET pagination slows down on deep pages, and how to fix it with cursor (keyset) pagination: a unique tie-breaker, the right composite index and a next_cursor API. With SQL examples."
excerpt: "Page one loads instantly. Page ten thousand times out. Same query. Here's why OFFSET gets slower the deeper you go, and the 5-step answer to the pagination interview question."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - offset pagination
  - cursor pagination
  - keyset pagination
  - sql offset slow
  - api pagination best practices
  - deep pagination
  - composite index
  - system design interview questions
tldr:
  - "OFFSET N makes the database produce and throw away N rows before returning your page, so deep pages get slower and slower."
  - "Cursor (keyset) pagination remembers the last row the user saw and asks for the rows after it, so every page costs about the same."
  - "Sort on a unique key (for example created_at plus id), add a composite index in the same order, and return an opaque next_cursor from the API."
faqs:
  - q: "Why is OFFSET pagination slow?"
    a: "Rows skipped by OFFSET still have to be computed by the database, as the PostgreSQL manual notes. OFFSET 200000 LIMIT 20 reads 200,020 rows and returns 20, so cost grows with page depth even when an index exists."
  - q: "What is cursor or keyset pagination?"
    a: "Instead of a page number, the client sends the sort key of the last row it saw, and the query asks for rows after it, for example WHERE id > :last_id ORDER BY id LIMIT 20. With an index on the sort key, the database jumps straight to that point, so page 10,000 costs the same as page 1."
  - q: "Why does cursor pagination need a tie-breaker?"
    a: "If you sort by a column that isn't unique, such as created_at, two rows can share a value at a page boundary and one gets skipped or repeated. Sorting by (created_at, id) makes every position unique."
  - q: "What are the downsides of cursor pagination?"
    a: "You can't jump straight to an arbitrary page number, and total page counts are expensive. For feeds, infinite scroll and APIs this rarely matters; for admin tables that need page jumps, cap how deep users can go."
---

**"Your list API gets slower the deeper users scroll. Why, and how do you fix it?"** Page one loads instantly, page ten thousand times out, and it's the same query. This comes up in backend and system design interviews because the common answer, "add an index", doesn't fix it.

<!-- cta -->

## Step 1: Explain why OFFSET is slow

A typical paginated query looks like this:

```sql
SELECT * FROM posts
ORDER BY id DESC
LIMIT 20 OFFSET 200000;
```

To return those 20 rows, the database has to walk past the first 200,000 and throw them away. The [PostgreSQL manual](https://www.postgresql.org/docs/current/queries-limit.html) says it directly: rows skipped by an OFFSET still have to be computed inside the server, so a large OFFSET can be inefficient. An index lets the database read rows in order, but it still has to step over every skipped entry.

![OFFSET 200000 LIMIT 20 reads 200,020 rows; a cursor query jumps to the last seen id and reads 20](/blog-images/cursor-pagination-vs-offset/offset-vs-cursor.png "OFFSET cost grows with depth; cursor cost stays flat")

There's a second problem: if new rows are inserted while a user pages through, OFFSET shifts and they see duplicates or miss rows.

## Step 2: Switch to a cursor

Cursor pagination, also called keyset pagination, remembers where the user stopped:

```sql
SELECT * FROM posts
WHERE id < :last_id
ORDER BY id DESC
LIMIT 20;
```

With an index on `id`, the database jumps straight to `:last_id` and reads 20 rows. Page 10,000 costs the same as page 1, and inserts don't shift what the user sees.

## Step 3: Add a unique tie-breaker

Most feeds sort by time, not id. But `created_at` isn't unique: two rows can share a timestamp, and if they fall on a page boundary, one is skipped.

![Two rows with the same created_at on a page boundary: a created_at-only cursor skips one, a (created_at, id) cursor doesn't](/blog-images/cursor-pagination-vs-offset/tie-breaker.png "Sort by (created_at, id) so every position is unique")

Sort by `(created_at, id)` instead. In PostgreSQL you can compare both at once:

```sql
SELECT * FROM posts
WHERE (created_at, id) < (:last_created_at, :last_id)
ORDER BY created_at DESC, id DESC
LIMIT 20;
```

For databases that don't optimise row comparisons well, write it out:

```sql
WHERE created_at < :t
   OR (created_at = :t AND id < :last_id)
```

## Step 4: Index the sort order

The cursor is only fast if an index matches the sort:

```sql
CREATE INDEX posts_created_id ON posts (created_at DESC, id DESC);
```

Column order matters: it must match the `ORDER BY`. If you also filter, for example by `user_id`, put the equality column first: `(user_id, created_at, id)`. More on that in [database indexing interview questions](/blog/database-indexing-interview-questions).

## Step 5: Change the API contract

- Return an opaque `next_cursor` (for example base64 of `created_at` and `id`) instead of page numbers, and accept it on the next request.
- Opaque cursors let you change the sort internals later without breaking clients.
- If a screen really needs page numbers, such as an admin table, keep OFFSET but cap the depth, and use a search filter instead of page 7,431.

```json
{ "items": [ ... ], "next_cursor": "eyJ0IjoiMjAyNi0xMS0xN1QxMDowMDowNCIsImlkIjo4OH0" }
```

## The one-line answer

> "OFFSET reads and discards every skipped row, so deep pages get slower. I'd switch to cursor pagination on a unique sort key like (created_at, id), back it with a composite index in the same order, and return an opaque next_cursor from the API."

## Follow-up questions to expect

- **"How do you show a total count?"** `COUNT(*)` on a large table is expensive. Show an estimate, cache the count, or drop it ("100+ results").
- **"How do you paginate backwards?"** Flip the comparison and the sort, then reverse the page in the app.
- **"What about search results sorted by relevance?"** Use the search engine's own cursor or `search_after` style API; the same idea applies.

For more backend breakdowns, see [how to scale a database](/blog/how-to-scale-a-database) and [zero-downtime database migrations](/blog/zero-downtime-database-migrations).
