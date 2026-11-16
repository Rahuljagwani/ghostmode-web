---
slug: sql-vs-nosql-system-design
date: "2026-11-19"
title: "SQL vs NoSQL: how to choose a database in a system design interview"
seoTitle: "SQL vs NoSQL: How to Choose in a System Design Interview"
description: "How to answer \"which database would you use?\" in a system design interview: access patterns, consistency, transactions, scale, and when relational, document, key-value or wide-column stores fit best."
excerpt: "\"Why did you pick that database?\" Saying \"NoSQL because it scales\" loses points. Here's how to justify the choice from the access patterns."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - sql vs nosql
  - sql vs nosql system design
  - how to choose a database
  - relational vs non relational database
  - dynamodb vs postgres
  - system design interview questions
tldr:
  - "Choose from the access patterns: what you read and write, how often, and what must stay consistent. Not from the brand name or the idea that NoSQL always scales better."
  - "Relational databases fit data with relationships, joins, multi-row transactions and ad-hoc queries. They scale much further than most products ever need."
  - "Key-value and wide-column stores fit huge, known, key-based access patterns. Document stores fit self-contained records with flexible shape."
faqs:
  - q: "Is NoSQL faster than SQL?"
    a: "Not in general. A key-value lookup by primary key is fast in both. NoSQL stores can be easier to scale horizontally for simple, known access patterns, but they make joins, ad-hoc queries and multi-record transactions harder."
  - q: "When should you use a relational database?"
    a: "When the data has relationships you query across, you need transactions that span several rows or tables (orders and payments, for example), or you don't yet know every query you'll need. It's the safe default for most new products."
  - q: "When should you use NoSQL?"
    a: "When the access patterns are known, simple and key-based at very high scale (a key-value or wide-column store), when records are self-contained documents with varying fields (a document store), or for specialised needs such as graph traversal or time series."
  - q: "Can you use both SQL and NoSQL in one system?"
    a: "Yes, and many systems do: a relational database as the source of truth for core data, plus a key-value cache, a search index or a wide-column store for specific high-volume access patterns."
---

In almost every system design interview you'll reach the point where you draw a database box and the interviewer asks: **"Which database, and why?"** "NoSQL, because it scales" is the answer that loses points. A good answer starts from the data and the queries.

The interview prompt: **"You're designing the backend for a food delivery app. Would you use SQL or NoSQL?"**

<!-- cta -->

## Step 1: List the access patterns first

Before naming a database, say what the system reads and writes:

- **Orders:** create an order with several items, take payment, update status. Must be consistent: no paid order without items.
- **Restaurant menus:** read very often, change rarely, differ in shape per restaurant.
- **Driver locations:** written every few seconds per driver, read for the latest position only.
- **Order history and reports:** queries by user, restaurant, date range, and new ones next quarter.

This alone shows that **one system can have several different answers**.

## Step 2: Know what each type is good at

![SQL or NoSQL decision path: joins or multi-row transactions lead to SQL; known key-based patterns at very high scale lead to key-value or wide-column; otherwise start with SQL](/blog-images/sql-vs-nosql-system-design/decision-path.png "Start from the access patterns, not the brand name")

- **Relational (Postgres, MySQL):** tables, joins, transactions across rows and tables, strong consistency, flexible queries. Scales well with indexes, read replicas and, later, sharding.
- **Document (MongoDB, or JSONB columns in Postgres):** each record is a self-contained JSON-like document. Good when fields vary and you read the whole record at once, like a menu.
- **Key-value (Redis, DynamoDB):** get and put by key, very fast and easy to spread across machines. You must design the keys around your queries up front.
- **Wide-column (Cassandra, DynamoDB tables with sort keys):** huge write volume, data partitioned by key and sorted inside each partition. Good for time-ordered data like events and locations.
- **Specialised:** graph databases for relationship traversal, time-series databases for metrics, search engines for full-text search.

## Step 3: Weigh the real trade-offs

- **Transactions and consistency:** if several records must change together (order, payment, stock), a relational database gives you this directly. Many NoSQL stores now offer transactions too, but often with limits on scope or performance.
- **Query flexibility:** SQL lets you answer new questions with a new query and an index. In key-value and wide-column stores, a new access pattern often means a new table and duplicated data.
- **Scale:** NoSQL stores make horizontal scaling easier for simple patterns. But a well-indexed relational database with replicas handles far more than most products need. See [how to scale a database](/blog/how-to-scale-a-database) and [database indexing interview questions](/blog/database-indexing-interview-questions).
- **Schema:** relational schemas are strict, which protects data quality; migrations need care (see [zero-downtime database migrations](/blog/zero-downtime-database-migrations)). Document stores are flexible, which moves the validation into your code.
- **Team and operations:** what the team already knows and can run reliably counts too. Say so.

## Step 4: Give a concrete answer for the example

- **Orders, payments, users, restaurants:** **Postgres**, because orders need transactions and the reporting queries will keep changing.
- **Menus:** a **JSONB column** in Postgres, or a document store, with a cache in front because reads dominate.
- **Live driver locations:** **Redis** (latest position per driver, with geospatial queries), not the main database, because the data is high-volume and only the latest value matters.
- **Location history for analytics:** a **wide-column or time-series store**, or a stream into a data warehouse.

That's a stronger answer than either "SQL" or "NoSQL": it uses each where it fits, with a reason for each.

## Step 5: Avoid the common mistakes

- Saying "NoSQL scales, SQL doesn't." Both scale; they make different things easy.
- Choosing a NoSQL store and then needing joins and transactions everywhere.
- Ignoring consistency for money. Payments need it; likes and view counts can be eventually consistent.
- Adding five different databases to a design that a single Postgres would serve. Every extra store is more to run.

## The one-line answer

> "I'd choose from the access patterns. Orders and payments need transactions and flexible queries, so Postgres is the source of truth. Live driver locations are high-volume, key-based and only need the latest value, so they go in Redis, and menus can be JSONB with a cache in front."

## Follow-up questions to expect

- **"What if orders grow to billions of rows?"** Partition by time, archive old orders, add read replicas, and shard by customer or region when one primary can't keep up with writes.
- **"What is eventual consistency, and where is it acceptable?"** Replicas may briefly return older data. Fine for feeds, counts and recommendations; not for balances or stock.
- **"How would you keep a cache or search index in sync with the database?"** Use change data capture or an outbox table to publish changes. See [caching strategies for system design](/blog/caching-strategies-system-design).
