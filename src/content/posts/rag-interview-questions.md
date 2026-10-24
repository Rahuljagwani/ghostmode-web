---
slug: rag-interview-questions
date: "2026-10-27"
title: "25 RAG interview questions with answers, from basics to production"
seoTitle: "25 RAG Interview Questions and Answers (2026)"
description: "The RAG interview questions AI engineers get asked: chunking, embeddings, hybrid search, reranking, evaluation and production issues, with clear answers."
excerpt: "Retrieval-augmented generation is the most-asked topic in GenAI interviews. Here are the 25 questions that come up most, with answers that show real experience."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - RAG interview questions
  - retrieval augmented generation interview questions
  - vector database interview questions
  - GenAI interview questions
  - LLM interview questions
  - embeddings interview questions
tldr:
  - "RAG questions follow the pipeline: ingest, chunk, embed, retrieve, rerank, generate, evaluate."
  - "The strongest answers separate retrieval problems from generation problems, and back changes with numbers from an evaluation set."
  - "Expect at least one debugging question: 'the answers are wrong, what do you check first?'"
faqs:
  - q: "What is RAG in simple words?"
    a: "RAG (retrieval-augmented generation) means searching your own documents for the parts relevant to a question and giving them to the LLM along with the question, so the answer is based on your data instead of only on what the model memorised."
  - q: "Which vector database should I mention in an interview?"
    a: "Any one you have actually used is fine, such as pgvector, Pinecone, Weaviate, Qdrant, Milvus or Chroma. Interviewers care more about why you chose it (scale, filtering, cost, existing Postgres) than the brand."
  - q: "Is RAG still needed with long-context models?"
    a: "Usually yes. Even with large context windows, sending everything is slow and expensive, models can miss details in very long inputs, and you still need access control and citations. Long context and RAG are often used together."
---

If you're interviewing for an AI engineer or GenAI developer role, you will be asked about RAG. It's the most common way companies put LLMs to work on their own data, so it's the topic interviewers dig into hardest.

These 25 questions follow the RAG pipeline from start to finish. The answers are short on purpose: use them as a base, and add what you saw in your own projects.

<!-- cta -->

## The basics

### 1. What is RAG, and why use it instead of just prompting?

RAG retrieves relevant pieces of your documents at query time and adds them to the prompt. The model then answers from that context. It lets an LLM use private or recent data it was never trained on, reduces hallucinations, and makes citations possible.

### 2. Walk me through a RAG pipeline.

**Ingestion:** load documents, clean them, split them into chunks, embed each chunk and store it in an index with metadata. **Query time:** embed the question, retrieve the most similar chunks (often with keyword search too), rerank, build a prompt with the top chunks, generate the answer with citations.

### 3. RAG or fine-tuning?

RAG adds **knowledge**, especially knowledge that changes or must be cited. Fine-tuning changes **behaviour**: format, tone, or a narrow task. To teach a model your company's latest policies, use RAG. To make it always reply in a strict JSON format with a smaller model, consider fine-tuning.

### 4. What are embeddings?

Vectors that capture meaning, so texts with similar meaning end up close together. Retrieval works by embedding the query and finding the chunks whose vectors are closest, usually by cosine similarity.

## Chunking and ingestion

### 5. How do you choose a chunk size?

Start with a few hundred tokens and some overlap, splitting on natural boundaries like headings and paragraphs. Then tune with an evaluation set. Small chunks match precisely but lose context; big chunks keep context but add noise and cost.

### 6. Why use chunk overlap?

So a sentence or idea that falls on a boundary still appears whole in at least one chunk. Too much overlap wastes storage and returns near-duplicate chunks.

### 7. How do you handle tables, PDFs and code?

Parse structure instead of flattening everything to text. Keep tables as rows with their headers, extract PDF text with a layout-aware parser (and OCR for scanned files), and split code by functions or classes rather than by character count.

### 8. What metadata would you store with each chunk?

Source, title, section heading, date, author or owner, and access permissions. Metadata enables filtering ("only HR documents from 2026"), citations, and making sure users only see documents they're allowed to.

### 9. How do you keep the index up to date?

Re-ingest changed documents incrementally, using content hashes or modified dates, and delete chunks of removed documents. For fast-changing sources, run a scheduled or event-driven pipeline.

## Retrieval

### 10. What is hybrid search and why use it?

Combining keyword search (BM25) with vector search. Embeddings are great at paraphrases but weak on exact strings like error codes, product names and IDs. Keyword search catches those. Results are merged, often with reciprocal rank fusion.

### 11. What is a reranker?

A model, usually a cross-encoder, that reads the query and each candidate chunk together and scores how relevant the chunk is. It's slower but more accurate than embedding similarity, so you retrieve broadly (say 30 to 50 chunks) and rerank down to the best 3 to 8.

### 12. What is query rewriting?

Using an LLM to turn the user's question into a better search query: expanding abbreviations, adding context from the conversation, or splitting a compound question into several searches. It helps a lot in multi-turn chat, where "what about the second one?" isn't searchable on its own.

### 13. What is HyDE?

Hypothetical document embeddings: the LLM writes a fake answer to the question, and you embed that instead of the question. The fake answer often looks more like the real document than the question does, which can improve retrieval.

### 14. How do vector indexes like HNSW work?

They are approximate nearest-neighbour indexes. HNSW builds a layered graph where each vector links to its neighbours, so a search hops through the graph instead of comparing against every vector. You trade a little accuracy for a big speed-up.

### 15. How many chunks should you pass to the LLM?

As few as gives good answers. More chunks add cost, latency and distracting noise. Tune k with your evaluation set; reranking usually lets you pass fewer.

## Generation

### 16. How do you make the model stick to the retrieved context?

Tell it to answer only from the provided context, to cite the source for each claim, and to say it doesn't know when the context doesn't cover the question. Put the context clearly separated from the instructions, and test with questions that have no answer in the documents.

### 17. How do you add citations?

Give each chunk an ID in the prompt and ask the model to reference IDs next to its claims. Map the IDs back to links or page numbers in your UI, and validate that cited IDs actually exist.

### 18. How do you handle questions that need information from many documents?

Retrieve per sub-question (query decomposition), summarise per document and then combine (map-reduce), or let an agent run several searches. For "compare X and Y" questions, retrieve for X and for Y separately.

## Evaluation and debugging

### 19. How do you evaluate a RAG system?

Separately evaluate **retrieval** and **generation**. Retrieval: recall@k and precision on a labelled set of question-to-correct-chunk pairs. Generation: faithfulness (claims supported by context), answer relevance and correctness, often scored by an LLM judge that you check against human labels.

### 20. The answers are wrong. What do you check first?

Whether the right chunk was retrieved. Log the retrieved chunks for failing questions. If the right chunk is missing, fix ingestion, chunking, embeddings or search. If it's there and the answer is still wrong, fix the prompt, reduce noise, or use a stronger model.

### 21. How do you build a test set?

Collect 50 to 100 real questions from users or support tickets, plus edge cases and unanswerable questions. Label the correct source chunk and expected answer. Add every production failure to the set so it can't happen again.

### 22. What is "lost in the middle"?

A pattern seen in research where models use information at the start and end of a long context better than information in the middle. Practical fixes: pass fewer chunks, put the most relevant ones first, and rerank.

## Production

### 23. How do you reduce latency in a RAG app?

Stream the answer, cache embeddings for repeated queries, cache answers for common questions, run keyword and vector searches in parallel, use a smaller model for query rewriting, and keep the context short.

### 24. How do you handle access control?

Store permissions as metadata and filter at retrieval time, before anything reaches the LLM. Never rely on the prompt to hide documents the user shouldn't see.

### 25. What are common security risks in RAG?

Prompt injection hidden in documents, leaking documents across users, and sensitive data ending up in logs. Treat retrieved text as untrusted, filter by permissions, limit tool access, and redact personal data where needed.

## How to stand out

Everyone can define RAG. What gets offers is evidence: "our recall@5 was 64%, hybrid search and a reranker took it to 88%, and that cut wrong answers by about half." If you don't have a work project, build a small one with an evaluation set. Our [4-week AI engineer interview plan](/blog/how-to-prepare-for-ai-engineer-interview) shows how.

For the full range of topics beyond RAG, see our [40 AI engineer interview questions](/blog/ai-engineer-interview-questions).
