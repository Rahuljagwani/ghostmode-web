---
slug: ai-engineer-interview-questions
date: "2026-10-25"
title: "40 AI engineer interview questions (and how to answer them) for 2026"
seoTitle: "AI Engineer Interview Questions 2026 (40 With Answers)"
description: "40 real AI engineer interview questions on LLMs, RAG, fine-tuning, evaluation and production, with short model answers and what interviewers look for."
excerpt: "The 40 questions that keep coming up in AI engineer interviews, from tokens and attention to RAG, evals and cost, with short answers you can build on."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - AI engineer interview questions
  - LLM interview questions
  - generative AI interview questions
  - GenAI engineer interview
  - AI engineer interview preparation
  - machine learning engineer interview questions
tldr:
  - "AI engineer interviews test five things: LLM basics, retrieval (RAG), adapting models, evaluation, and running AI in production."
  - "Interviewers care less about definitions and more about trade-offs: when you'd use RAG vs fine-tuning, how you'd measure quality, what it costs."
  - "Use the short answers below as a starting point, then attach a real example from your own projects to each one."
faqs:
  - q: "What is asked in an AI engineer interview?"
    a: "Most AI engineer interviews have a coding round (usually Python), a round on LLM and ML fundamentals, an AI system design round (often a RAG or agent system), a deep dive into one of your projects, and a behavioral round."
  - q: "Is an AI engineer the same as an ML engineer?"
    a: "Not quite. ML engineers usually train and deploy models from data. AI engineers usually build products on top of existing foundation models, using prompting, retrieval, tool calling, fine-tuning and evaluation. Many interviews now cover both."
  - q: "Do AI engineer interviews include DSA?"
    a: "Often, yes, especially at larger companies. Expect easy to medium problems in Python. Startups more often replace DSA with a practical take-home or a live build of a small LLM feature."
  - q: "How do I prepare for AI engineer interview questions quickly?"
    a: "Learn the core concepts in this list, build one small RAG project with an evaluation set, and practise explaining the trade-offs out loud. Then run the job description through an interview question predictor to see what that specific role is likely to ask."
---

"AI engineer" barely existed as a job title three years ago. Now it's one of the most common roles on job boards, and the interviews have settled into a clear pattern.

We went through the questions that keep showing up across startups, product companies and big tech, and grouped them into the 40 you should be ready for. Each one has a short answer. Treat it as a skeleton: the best answers add a line like "in my project, I did X and saw Y".

<!-- cta -->

## What the AI engineer interview loop looks like

Most loops have some version of these rounds:

| Round | What they test |
| --- | --- |
| Coding | Python, data handling, sometimes easy-to-medium DSA |
| Fundamentals | LLMs, embeddings, prompting, basic ML |
| AI system design | Design a RAG app, an agent, or a support bot end to end |
| Project deep dive | One project you built, in detail |
| Behavioral | Ownership, ambiguity, working with product and data teams |

Let's go through the questions round by round.

## LLM fundamentals

### 1. What is a token, and why does it matter?

A token is the unit a model reads and writes, roughly a word piece. In English one token is about four characters on average. Tokens matter because context limits, latency and price are all counted in tokens, so long prompts cost more and run slower.

### 2. Explain how a transformer works in simple terms.

It turns tokens into vectors, then passes them through layers of self-attention and feed-forward networks. Self-attention lets each token look at every other token and decide which ones matter for its meaning. A decoder-only model like GPT or Claude predicts the next token, one at a time.

### 3. What is attention, and why was it a big deal?

Attention computes, for each token, a weighted mix of all other tokens using query, key and value vectors. Unlike RNNs, it processes the whole sequence in parallel and handles long-range dependencies well, which made training on huge datasets practical.

### 4. What is a context window?

The maximum number of tokens the model can consider at once, prompt plus output. A bigger window lets you pass more documents, but models can still miss details buried in the middle of a long context, and cost grows with every token.

### 5. What do temperature and top-p do?

Both control randomness when picking the next token. Low temperature makes output more predictable; high temperature makes it more varied. Top-p limits sampling to the smallest set of tokens whose probabilities add up to p. For extraction or classification use low values; for brainstorming, higher.

### 6. Why do LLMs hallucinate?

They are trained to produce likely text, not verified facts. When the answer isn't in their training data or context, they still produce something fluent. You reduce it with grounding (RAG), asking for citations, allowing "I don't know", constraining output formats, and evaluating for faithfulness.

### 7. What is a KV cache?

During generation the model stores the keys and values of tokens it has already processed, so it doesn't recompute them for every new token. It's why generating the first token is slower than the rest, and why long contexts use a lot of GPU memory.

### 8. What is the difference between a base model and an instruction-tuned model?

A base model only continues text. An instruction-tuned model has been further trained (supervised fine-tuning, then preference tuning such as RLHF or DPO) to follow instructions and hold a conversation. Products almost always use instruction-tuned models.

## Prompting and RAG

### 9. What is RAG and when would you use it?

Retrieval-augmented generation fetches relevant documents at query time and puts them in the prompt. Use it when answers depend on private, large or frequently changing data, and when you need citations. It's usually cheaper and faster to update than fine-tuning.

### 10. What are embeddings?

Vectors that represent the meaning of text, so similar meanings sit close together. You embed your documents once, embed each query, and find the nearest documents with cosine similarity or dot product.

### 11. How do you choose a chunk size?

It depends on the documents and questions. Small chunks give precise matches but lose context; large chunks keep context but add noise and cost. A common start is a few hundred tokens with some overlap, split on headings or paragraphs, then tune it using your evaluation set.

### 12. What is hybrid search?

Combining keyword search (like BM25) with vector search. Keywords catch exact terms such as product codes, names and error messages that embeddings can miss; vectors catch paraphrases. Results are merged, often with reciprocal rank fusion.

### 13. What is a reranker?

A second model, usually a cross-encoder, that scores each retrieved chunk against the query more accurately than the first retrieval step. You retrieve, say, 30 candidates fast, rerank them, and pass only the top 5 to the LLM.

### 14. Your RAG app gives wrong answers. How do you debug it?

Split the problem in two. First check retrieval: was the right chunk in the results? If not, fix chunking, embeddings, hybrid search or metadata filters. If the right chunk was there, the problem is generation: fix the prompt, reduce noise in the context, or use a stronger model.

### 15. What is prompt injection, and how do you defend against it?

Text in user input or retrieved documents that tries to override your instructions. Defend with layers: keep instructions separate from untrusted content, limit what tools the model can call, require confirmation for risky actions, validate outputs, and never put secrets in the prompt.

### 16. Zero-shot vs few-shot prompting?

Zero-shot gives only instructions. Few-shot adds a handful of input-output examples. Few-shot helps most with format and tone, but adds tokens, so pick examples that cover the tricky cases.

## Fine-tuning and adapting models

### 17. RAG or fine-tuning: how do you decide?

Use RAG to give the model knowledge, especially knowledge that changes. Use fine-tuning to change behaviour: a format, a style, a narrow task done cheaply by a smaller model. Many production systems use both, and most should start with prompting plus RAG.

### 18. What is LoRA?

Low-rank adaptation. Instead of updating all the weights, you train small low-rank matrices added to some layers. It needs far less memory and storage, and you can swap adapters per task. QLoRA does the same on a quantized base model to save even more memory.

### 19. What is quantization?

Storing weights in fewer bits, such as 8-bit or 4-bit instead of 16-bit. It cuts memory and often speeds up inference, with some quality loss that you should measure on your own tasks.

### 20. What is distillation?

Training a smaller "student" model to copy a larger "teacher" model's outputs. You get most of the quality on a narrow task at a fraction of the cost and latency.

### 21. How much data do you need to fine-tune?

For a narrow format or style task, a few hundred to a few thousand high-quality examples often work. Quality matters more than quantity: clean, consistent, representative examples beat a big noisy dump.

### 22. What is RLHF, and what is DPO?

RLHF trains a reward model on human preferences, then optimises the LLM against it with reinforcement learning. DPO (direct preference optimisation) skips the separate reward model and learns directly from pairs of preferred and rejected answers. It's simpler and widely used.

## Evaluation

### 23. How do you evaluate an LLM application?

Build a test set of real inputs with expected outcomes, define metrics for what matters (correctness, faithfulness, format, safety, latency, cost), and run it on every change. Combine automated checks, LLM-as-judge for fuzzy qualities, and regular human review.

### 24. What is LLM-as-a-judge, and what are its risks?

Using a model to grade outputs. It scales well but has biases: it can favour longer answers, the first option shown, or its own style. Use clear rubrics, compare against human labels on a sample, and randomise the order of options.

### 25. What metrics would you use for a RAG system?

For retrieval: recall@k (is the right chunk in the top k?) and precision. For generation: faithfulness (is every claim supported by the context?), answer relevance, and correctness against a reference. Plus latency and cost per query.

### 26. How do you build an evaluation set without much data?

Start with 30 to 100 real or realistic questions, including edge cases and questions that should be refused. Add every production failure to the set. Synthetic questions generated from your documents are fine to start, but check them by hand.

### 27. What is the difference between offline and online evaluation?

Offline runs on a fixed test set before release. Online measures real usage after release: thumbs up or down, retries, task completion, escalations to humans, and A/B tests.

### 28. A new model version scores higher on benchmarks. Do you switch?

Not just because of public benchmarks. Run it on your own eval set, check latency, cost and output format, and watch for regressions on cases that used to pass. Roll it out gradually.

## Production, cost and agents

### 29. How do you reduce LLM latency?

Stream the output, shorten prompts, use a smaller or faster model where quality allows, cache repeated prompts and answers, run independent calls in parallel, and cap output length.

### 30. How do you reduce cost?

Route easy requests to small models, use prompt caching for long fixed system prompts, trim retrieved context, batch offline jobs, and set token limits. Track cost per request and per user from day one.

### 31. What is function calling (tool use)?

The model returns a structured request to call a function you defined, such as a search or a database query. Your code runs it and sends the result back. It's how LLMs take actions and fetch live data reliably.

### 32. What is an AI agent?

A loop where the model plans, calls tools, looks at the results and decides the next step until the task is done. Agents are powerful but harder to control, so add step limits, clear tool descriptions, logging, and human approval for risky actions.

### 33. How do you get reliable JSON out of an LLM?

Use the provider's structured output or tool-calling features where available, give a schema and an example, validate the result in code, and retry with the validation error if it fails.

### 34. What do you monitor in production?

Latency, error rates, token usage and cost, user feedback, and quality on sampled traffic. Log prompts and responses (respecting privacy) so you can reproduce bad answers.

### 35. How do you handle rate limits and provider outages?

Retries with exponential backoff, queues for non-urgent work, a fallback model or provider, timeouts, and graceful messages to users.

## Coding round

### 36. Write a function that splits text into overlapping chunks.

They want clean Python: a window over tokens or words, a step of chunk size minus overlap, and handling for the last chunk and empty input. Talk about splitting on paragraphs or sentences before falling back to a fixed size.

### 37. Implement cosine similarity and top-k search with NumPy.

Normalise vectors, take a dot product between the query and the matrix, then use `argsort` or `argpartition` for the top k. Mention that at scale you'd use a vector index (HNSW, IVF) instead of brute force.

### 38. Call an LLM API for 1,000 documents as fast as possible.

Use async requests with a concurrency limit (a semaphore), retries with backoff, and save results as you go so a failure doesn't lose everything.

## Behavioral

### 39. Tell me about an AI project that didn't work.

Pick a real one. Explain what you expected, how you found out it wasn't working (ideally with an eval), what you changed, and what you'd do differently. Interviewers want to see that you measure rather than guess.

### 40. How do you explain an AI system's limits to non-technical stakeholders?

Show examples of where it fails, give a simple accuracy number from your eval set, and agree on what happens when it's wrong: human review, a fallback, or a clear message to the user.

## How to use this list

Don't memorise 40 answers. Pick the 10 most relevant to the job, and for each one prepare a real example from your own work. If you haven't built anything yet, build one small RAG app with an evaluation set. It gives you a story for half the questions on this page.

Want to know what a specific company will ask? Paste the job description into our [interview question predictor](/tools/interview-question-predictor), and practise your answers out loud with the [STAR method answer generator](/tools/star-method-answer-generator) for the behavioral round.
