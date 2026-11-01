---
slug: debug-rag-system
date: "2026-11-05"
title: "How to debug a RAG system that gives wrong answers (AI engineer interview)"
seoTitle: "How to Debug a RAG System: AI Engineer Interview Guide"
description: "Your RAG assistant gives confident wrong answers. How to find whether retrieval or generation fails, which metrics to use, and how to answer it in an interview."
excerpt: "\"Our RAG assistant gives confident wrong answers. How would you debug it?\" The strong answer starts with one simple test that tells you where to look."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - debug rag pipeline
  - rag wrong answers
  - rag evaluation
  - recall at k
  - ai engineer interview questions
  - rag interview questions
tldr:
  - "First find which stage fails: give the model the correct context by hand. If the answer becomes right, retrieval is the problem; if not, generation is."
  - "Measure retrieval with a labelled set and recall at k before changing prompts. Prompts can't fix information that never reached the model."
  - "Fix the failing stage, then lock it in with a regression test set in CI."
faqs:
  - q: "Why does my RAG system give wrong answers?"
    a: "Usually for one of two reasons. Either retrieval didn't return the chunk that contains the answer, because of chunking, embeddings, search settings or missing filters, or the model had the right chunk but generated a wrong or unsupported answer. Testing the two stages separately tells you which."
  - q: "What is recall at k in RAG?"
    a: "Recall at k measures how often the correct chunk appears in the top k retrieved results. For example, recall at 5 of 80% means that for 80% of test questions, the right chunk was among the first five results."
  - q: "What is faithfulness in RAG evaluation?"
    a: "Faithfulness measures whether every claim in the answer is supported by the retrieved context. A faithful answer can still be wrong if the context itself was incomplete or off-topic, so it's usually tracked together with answer correctness."
  - q: "Should I fix the prompt first when RAG answers are wrong?"
    a: "Not until you've checked retrieval. If the right information never reached the model, no prompt change will produce the correct answer. Prompt fixes help only once retrieval is returning the right context."
---

**Debugging a RAG system** means finding out whether wrong answers come from **retrieval** (the right information never reached the model) or **generation** (the model had it and still answered badly), then fixing that stage with measurements instead of guesswork.

It's one of the most common AI engineer interview questions because nearly every company building with LLMs has a RAG assistant that sometimes gets things wrong. Here's how to answer it.

<!-- cta -->

## The question

> "Our RAG assistant gives confident but wrong answers. How would you debug it?"

Weak answers jump to "I'd improve the prompt" or "I'd try a bigger model." Strong answers start by **locating** the failure.

## Step 1: Split retrieval from generation

Take a handful of failing questions and run one simple test: **give the model the correct context by hand.**

- If the answer is now right, **retrieval** is the problem. The model can answer when it sees the right information; it just isn't getting it.
- If the answer is still wrong, **generation** is the problem: the prompt, the model, or how the context is presented.

This one test saves days of tuning the wrong component, and saying it first signals experience.

## Step 2: Measure retrieval

Build a labelled set: real questions, each paired with the chunk or chunks that contain the answer. A few hundred is a good start; even 50 tells you a lot.

- Measure **recall at k**: how often the correct chunk appears in the top k results.
- Compare a **wide and a narrow k**, for example recall at 50 versus recall at 5. If the right chunk is found at 50 but not at 5, it's being retrieved but **ranked too low**, which points to a reranker. If it's missing even at 50, the problem is chunking, embeddings or search.

## Step 3: Fix retrieval

Typical fixes, each checked against your recall numbers:

- **Chunking:** split on headings or paragraphs, adjust chunk size and overlap, and keep tables and code intact.
- **Hybrid search:** combine keyword search (good for names, codes and exact terms) with vector search (good for paraphrases).
- **A reranker:** retrieve broadly, then rerank the top candidates with a model that reads the question and chunk together.
- **Metadata filters:** restrict by product, version, language or date so old or irrelevant documents don't compete.

## Step 4: Fix generation

If retrieval is fine but answers are still wrong:

- **Keep context short and relevant.** More chunks add noise; models can miss details buried in long context.
- **Require citations** for each claim, and check that cited chunks exist.
- **Allow "I don't know"** when the context doesn't contain the answer, and test with questions that have no answer in your documents.
- Put the most relevant chunks first, and keep instructions clearly separate from retrieved text.

## Step 5: Guard against regressions

Once fixed, keep it fixed:

- Track **faithfulness** (is every claim supported by the context?) and **correctness** (is the answer actually right?) on your test set. Tools such as [Ragas](https://docs.ragas.io/en/stable/concepts/metrics/) popularised these metrics.
- Watch the gap between them. High faithfulness with low correctness usually means the retrieved context was incomplete or subtly wrong, which sends you back to retrieval.
- Run the set in **CI** on every change to chunking, embeddings, prompts or models, and **add every production failure** to it.

## Symptoms and likely causes

| Symptom | Likely stage | First thing to try |
| --- | --- | --- |
| Right answer when given context by hand | Retrieval | Measure recall at k, then chunking or hybrid search |
| Correct chunk found at k=50 but not k=5 | Ranking | Add a reranker |
| Misses exact names, codes or error messages | Retrieval | Add keyword search (hybrid) |
| Mixes up product versions | Retrieval | Metadata filters |
| Wrong even with the right context | Generation | Shorter context, citations, a stronger model |
| Confident answers to unanswerable questions | Generation | Allow and test "I don't know" |

## The one-line answer

> "First I'd find whether retrieval or generation fails by giving the model the right context by hand, then measure retrieval with recall at k, fix that stage, and keep a regression test set in CI."

## Follow-up questions to expect

- **"How would you build the test set quickly?"** Start from real user questions and support tickets, label the source chunk for each, and add synthetic questions from your documents, checked by hand.
- **"How do you know the LLM judge is right?"** Compare its scores with human labels on a sample before trusting it.
- **"What if the documents themselves are wrong?"** Then faithfulness looks fine while correctness drops. Fix the source content and add freshness metadata.

For the fundamentals behind this answer, see our [25 RAG interview questions](/blog/rag-interview-questions). For the agent side of the same systems, see [prompt injection in AI agents](/blog/prompt-injection-ai-agents).
