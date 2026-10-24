---
slug: llm-system-design-interview
date: "2026-10-28"
title: "LLM system design interview: a 7-step framework with a worked example"
seoTitle: "LLM System Design Interview: Framework + Worked Example"
description: "How to answer GenAI and LLM system design interview questions: a 7-step framework, a worked example of a support assistant, and the follow-ups to expect."
excerpt: "'Design a chatbot over our docs' sounds easy until the follow-ups start. A 7-step framework and a full worked example for LLM system design rounds."
tag: "AI engineer"
keywords:
  - LLM system design interview
  - GenAI system design interview
  - AI system design interview questions
  - design a RAG system
  - ML system design interview
  - AI engineer system design
tldr:
  - "Use 7 steps: clarify, estimate, high-level design, retrieval and data, model and prompting, evaluation and safety, scaling and cost."
  - "Interviewers grade trade-offs and evaluation more than boxes and arrows."
  - "Prepare for the follow-ups: hallucinations, cost at 10x traffic, latency, access control and what happens when the model is down."
faqs:
  - q: "How is LLM system design different from regular system design?"
    a: "Regular system design focuses on storage, APIs and scaling. LLM system design adds model choice, retrieval quality, prompt design, evaluation, hallucinations, token cost and latency. The classic scaling parts still matter, but quality measurement becomes central."
  - q: "How long is an LLM system design interview?"
    a: "Usually 45 to 60 minutes. Plan about 5 minutes for clarifying questions, 25 to 30 minutes for the design, and the rest for follow-ups and deep dives."
  - q: "What are common LLM system design interview questions?"
    a: "Design a chatbot over company documents, a customer support assistant, an AI code review tool, a meeting summariser, a semantic search engine, an AI agent that books travel or files tickets, and a content moderation system using LLMs."
---

"Design a customer support assistant that answers from our help docs."

It sounds like a 10-minute question. Then the interviewer asks how you'd know it's giving correct answers, what it costs at 1 million questions a month, and what happens when a document contains instructions to ignore your prompt.

LLM system design rounds are now standard for AI engineer roles, and they reward a clear structure. Here's a 7-step framework, then a full worked example.

## The 7-step framework

### 1. Clarify the problem (5 minutes)

Never start drawing straight away. Ask:

- **Who are the users** and what do they need? Customers, internal staff, developers?
- **What does a good answer look like?** Short and factual? Must it cite sources? Can it take actions?
- **Scale**: requests per day, number of documents, how often they change.
- **Constraints**: latency target, budget, privacy rules, languages.
- **What happens when it's wrong?** Is a wrong answer annoying or dangerous?

### 2. Estimate the numbers

Rough maths shows you think about cost and scale. For example: 100,000 questions a day, about 3,000 input tokens (instructions plus retrieved context) and 300 output tokens each. That's about 300 million input tokens a day. Multiply by the model's price per million tokens to get a daily cost, then mention how caching and smaller models bring it down.

### 3. High-level design

Draw the main path: client, API gateway, orchestration service, retrieval (search index), LLM provider or self-hosted model, and storage for conversations and logs. Then the offline path: document ingestion and indexing.

### 4. Retrieval and data

Explain how documents get in and stay fresh: parsing, chunking, embeddings, hybrid search (keyword plus vector), reranking, metadata filters and access control. This is usually where most of the quality comes from.

### 5. Model and prompting

Choose the model with trade-offs: a large model for hard reasoning, a small fast one for classification and query rewriting. Describe the prompt structure (instructions, context, conversation history, output format) and whether you need tool calling or structured output.

### 6. Evaluation and safety

This is the step weak candidates skip and strong candidates lead with:

- An **offline evaluation set** of real questions with expected answers, run on every change.
- **Online signals**: thumbs up or down, escalations to a human, repeat questions.
- **Guardrails**: refuse out-of-scope questions, defend against prompt injection, filter personal data, and require human approval for risky actions.

### 7. Scaling, cost and reliability

Streaming responses, caching, rate limiting, request queues, fallback models or providers, timeouts, and monitoring of latency, cost and quality.

## Worked example: a support assistant over help docs

**Clarified requirements** (agreed with the interviewer):

- Customers ask questions in a chat widget; about 50,000 conversations a day.
- 5,000 help articles, updated daily.
- Answers must cite articles. If unsure, offer to connect a human agent.
- First token within about 1.5 seconds.
- It can look up order status, but cannot issue refunds.

**Ingestion:** a daily job pulls changed articles, splits them by heading into chunks of a few hundred tokens, embeds them and upserts them into a vector index alongside a keyword index. Metadata includes article ID, product, language and last updated date.

**Query flow:**

1. A small model rewrites the user's latest message into a standalone search query using the conversation history, and classifies intent (question, order status, complaint, other).
2. For order status, the assistant calls a `get_order_status` tool with the logged-in user's ID. The tool, not the model, enforces that users only see their own orders.
3. For questions, run keyword and vector search in parallel, merge the results, rerank, and keep the top 5 chunks.
4. The main model answers using only those chunks, with citations, streamed to the user.
5. If retrieval scores are low or the model says it can't find the answer, offer a human handoff.

**Evaluation:**

- 300 real past tickets with the correct article and an approved answer.
- Track retrieval recall@5, answer faithfulness and correctness (LLM judge checked against human labels every week), and handoff rate.
- Every bad answer flagged by users goes into the test set.

**Cost and latency:**

- Cache answers for the most common questions; they repeat a lot in support.
- Use prompt caching for the long fixed system prompt.
- Use the small model for rewriting and intent; only the final answer uses the bigger model.
- Stream tokens so the user sees text quickly.

**Reliability and safety:**

- Fallback to a second model provider on errors or timeouts.
- Treat article text as untrusted content, so instructions inside documents are ignored.
- No refund tool exists, so the model can't issue refunds even if asked cleverly.
- Log conversations with personal data redacted.

## Follow-up questions to expect

- "Traffic grows 10x. What breaks first, and what does it cost?" Talk about the LLM bill, rate limits, caching and routing to smaller models.
- "Users say answers are outdated." Ingestion frequency, the last-updated date in metadata, preferring newer chunks.
- "How do you know a new prompt is better?" Run the offline eval, then an A/B test on a small slice of traffic.
- "The model provider is down." Fallback provider, cached answers, and a clear message with a human handoff.
- "How would you support Hindi?" Multilingual embeddings, language metadata, a test set in each language.

## Practise it out loud

System design is a speaking skill. Pick five prompts (support bot, code reviewer, meeting summariser, semantic search, an agent that files tickets) and talk through each one in 40 minutes, recording yourself.

For the concepts behind this framework, see our [25 RAG interview questions](/blog/rag-interview-questions) and the full [AI engineer interview questions](/blog/ai-engineer-interview-questions) list.
