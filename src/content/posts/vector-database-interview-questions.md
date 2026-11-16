---
slug: vector-database-interview-questions
date: "2026-11-18"
title: "Vector database interview questions: embeddings, ANN indexes, filtering and scale"
seoTitle: "Vector Database Interview Questions (With Clear Answers)"
description: "12 vector database interview questions for AI engineers, with answers: similarity metrics, HNSW vs IVF vs PQ, recall, metadata filtering, hybrid search, pgvector vs a dedicated store, and scaling."
excerpt: "\"Why is our vector search fast but missing obvious results?\" Vector databases are now a standard AI engineer interview topic. Here are the questions and how to answer them."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - vector database interview questions
  - vector database
  - hnsw vs ivf
  - approximate nearest neighbor search
  - pgvector
  - hybrid search
  - ai engineer interview questions
tldr:
  - "A vector database stores embeddings and finds the nearest ones to a query vector. At scale it uses approximate nearest neighbour (ANN) indexes such as HNSW or IVF, trading a little recall for a lot of speed."
  - "The most common real problems are low recall from index settings, results lost to metadata filters applied after the search, and mismatched embedding models."
  - "Measure recall@k against exact search, filter during the search when you can, and combine vector and keyword search for names, codes and rare terms."
faqs:
  - q: "What is a vector database?"
    a: "A vector database stores vectors (embeddings) alongside an ID and metadata, and answers nearest-neighbour queries: given a query vector, return the most similar stored vectors. Most also support filtering, updates and replication."
  - q: "What is the difference between HNSW and IVF?"
    a: "HNSW builds a layered graph and walks it towards the query's neighbours; it gives low latency and high recall but uses more memory and builds slowly. IVF groups vectors into clusters and only searches the few clusters closest to the query; it builds faster and uses less memory, with recall controlled by how many clusters you search."
  - q: "Do I need a dedicated vector database?"
    a: "Not always. If you already run Postgres and have up to a few million vectors, the pgvector extension (with HNSW or IVFFlat indexes) is often enough and keeps vectors next to your other data. Dedicated stores help at larger scale or when you need features like built-in hybrid search and easy horizontal scaling."
  - q: "What is recall in vector search?"
    a: "Recall@k is the share of the true k nearest neighbours (found by exact, brute-force search) that the approximate index actually returned. A recall of 0.95 means 5% of the true top results were missed."
---

Vector search sits under almost every RAG system, semantic search box and recommendation feature, so **vector database questions** now come up in most AI engineer interviews. Interviewers rarely want definitions. They want to know if you understand the trade-offs, and what to check when results look wrong.

A typical opener: **"Our vector search is fast, but it misses documents that obviously match. What would you check?"** The questions below build up to the answer.

<!-- cta -->

## The basics

### 1. What does a vector database actually do?

It stores **embeddings** (lists of numbers that represent the meaning of text, images or other data) with an ID and metadata, and answers one main query: **"which stored vectors are closest to this one?"** Around that, it handles inserts, deletes, filters, persistence and replication.

### 2. Which similarity metric should you use?

- **Cosine similarity:** compares direction only. The usual choice for text embeddings.
- **Dot product:** same as cosine when vectors are normalised to length 1, and slightly faster.
- **Euclidean (L2) distance:** straight-line distance.

The rule: **use the metric the embedding model was trained for.** Its documentation usually says.

### 3. Why not just compare against every vector?

Exact (flat) search compares the query with every stored vector. That's fine for tens of thousands of vectors, but cost grows linearly with the data. At millions of vectors and many queries per second, you use **approximate nearest neighbour (ANN)** search, which checks only a small part of the data and accepts missing a few true neighbours.

## Indexes

### 4. Explain the main index types.

![Vector index types: Flat, IVF, HNSW and PQ with how they work and when to use them](/blog-images/vector-database-interview-questions/index-types.png "Each index trades speed, memory, build time and recall differently")

- **Flat:** exact. Use it for small data and as the ground truth for tests.
- **IVF (inverted file):** clusters the vectors, then searches only the `nprobe` clusters nearest the query. More clusters searched means higher recall and slower queries.
- **HNSW (hierarchical navigable small world):** a layered graph. The search starts at the top layer and greedily moves towards closer neighbours. Very good speed and recall, but it uses more memory and builds more slowly. Key settings: `M` (links per node) and `ef_search` (how wide the search is).
- **PQ (product quantisation):** compresses each vector into a short code so huge datasets fit in memory, at some cost in accuracy. Often combined with IVF.

### 5. How do you measure if the index is good enough?

Take a sample of real queries, run **exact search** to get the true top k, then compare with the ANN results: **recall@k** is the share of true neighbours found. Track it next to p95 latency, and re-check it after changing index settings or adding lots of data.

### 6. Our search misses obvious matches. What do you check?

In order:
1. **Recall:** is the index tuned too aggressively? Raise `ef_search` or `nprobe` and see if the missing results appear.
2. **Filters:** are results being dropped by a filter applied after the search? (Question 7.)
3. **Embedding mismatch:** were documents and queries embedded with the same model and version, with the same preprocessing?
4. **Chunking:** is the answer split across chunks, or buried in a huge chunk? (See [how to debug a RAG system](/blog/debug-rag-system).)
5. **Exact terms:** is the query a name, product code or error message? Embeddings are weak at those. (Question 8.)

## Real-world design

### 7. How do you combine vector search with metadata filters?

![Vector search query flow: embed the query, search the ANN index for the top 100, filter by tenant, date and permissions, then re-rank to the top 5](/blog-images/vector-database-interview-questions/query-flow.png "Approximate search gives speed; filters and re-ranking give accuracy")

- **Post-filtering** (search, then filter) is simple, but if the filter is strict, most of the top 100 may be thrown away and you return too few results.
- **Pre-filtering or filtered search** applies the filter during the search. Most vector stores support this; use it for anything strict like **tenant ID or permissions**, which must never be skipped.
- For multi-tenant apps, a separate index or partition per large tenant is often the cleanest option.

### 8. What is hybrid search, and when do you need it?

Hybrid search runs **keyword search (for example BM25)** and **vector search** together and merges the results, often with reciprocal rank fusion. You need it when users search for exact things such as names, IDs, error codes or rare jargon, which embeddings can blur.

### 9. Why add a re-ranker?

ANN search is fast but rough. A **cross-encoder re-ranker** reads the query and each candidate together and scores them much more accurately, but it's slow, so you run it only on the top 50 to 100 candidates and keep the best 5 to 10.

### 10. Do you need a dedicated vector database?

Often not at first. **pgvector** adds vector columns and indexes to Postgres; HNSW indexes arrived in version 0.5.0 (2023), alongside the older IVFFlat. Keeping vectors next to your other data makes filters, joins and transactions easy. Consider a dedicated store when you reach very large scale, need high write throughput, or want features like built-in hybrid search and easy horizontal scaling.

### 11. How do you change the embedding model?

Vectors from different models aren't comparable, so you can't mix them. **Re-embed everything into a new index, run both side by side, compare quality on an eval set, then switch** reads over. Store the model name and version with each vector so this is easy to track.

### 12. How do you scale a vector database?

- **Shard** vectors across nodes; each shard searches its part and the results are merged.
- **Replicate** shards for read throughput and availability.
- **Reduce memory** with quantisation or smaller embedding dimensions, and keep the full vectors on disk for re-scoring.
- **Cache** frequent queries; see [semantic caching for LLM apps](/blog/semantic-cache-llm).

## The one-line answer

> "A vector database finds the nearest embeddings using an approximate index like HNSW or IVF. When results are missing, I'd check recall against exact search, make sure filters run during the search, confirm documents and queries use the same embedding model, and add keyword search and a re-ranker for exact terms and precision."

For more AI engineering questions, see [25 RAG interview questions](/blog/rag-interview-questions) and [40 AI engineer interview questions](/blog/ai-engineer-interview-questions).
