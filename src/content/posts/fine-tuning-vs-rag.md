---
slug: fine-tuning-vs-rag
date: "2026-11-20"
title: "Fine-tuning vs RAG: how to choose, and how to answer it in an AI engineer interview"
seoTitle: "Fine-Tuning vs RAG: How to Choose (AI Engineer Interview)"
description: "When to use RAG, when to fine-tune, and when to do both: what each one changes, cost, freshness, LoRA, evaluation, and a clear answer for AI engineer interviews."
excerpt: "\"Our support bot needs to know our product docs and answer in our tone. Fine-tune or RAG?\" Here's how to choose, and how to explain it in an interview."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - fine tuning vs rag
  - rag vs fine tuning
  - when to fine tune llm
  - lora fine tuning
  - retrieval augmented generation
  - ai engineer interview questions
tldr:
  - "RAG changes what the model knows at question time by fetching relevant documents. Fine-tuning changes how the model behaves by training it on examples."
  - "Use RAG for fresh, private or changing knowledge and when you need sources. Use fine-tuning for format, tone, labels and narrow repeated tasks, or to make a smaller model good enough."
  - "Start with prompting, add RAG for knowledge, and fine-tune only when evals show a behaviour gap that prompts can't close. Many production systems use both."
faqs:
  - q: "What is the difference between fine-tuning and RAG?"
    a: "RAG (retrieval-augmented generation) searches your documents for each question and adds the relevant passages to the prompt, so the model answers from them. Fine-tuning further trains the model on example inputs and outputs, changing its weights so it behaves differently every time."
  - q: "Can fine-tuning teach a model new facts?"
    a: "It can absorb some, but it's an unreliable way to add knowledge: facts may be recalled inconsistently, can't be cited, and go stale until you train again. For knowledge that changes or must be traceable, RAG is the better tool."
  - q: "What is LoRA?"
    a: "LoRA (low-rank adaptation) is a fine-tuning method that freezes the original model and trains small extra matrices instead. The LoRA paper reported up to 10,000 times fewer trainable parameters and 3 times less GPU memory than full fine-tuning of GPT-3, with similar quality."
  - q: "Can you use RAG and fine-tuning together?"
    a: "Yes. A common pattern is to fine-tune a model to follow your format, tone and citation style, and use RAG to give it the current facts for each question."
---

"Should we fine-tune or use RAG?" is one of the most common **AI engineer interview questions**, and one of the most common real decisions on AI teams. The weak answer picks one. The strong answer explains what each one changes, and then picks based on the problem.

The interview prompt: **"Our support assistant needs to know our product docs, which change every week, and answer in our brand's tone. Would you fine-tune a model or use RAG?"**

<!-- cta -->

## Step 1: Explain what each one changes

![Fine-tuning vs RAG: RAG fetches documents at question time; fine-tuning trains on examples of the task](/blog-images/fine-tuning-vs-rag/rag-vs-fine-tuning.png "RAG changes what the model knows right now; fine-tuning changes how it behaves")

- **RAG** leaves the model alone. For each question, it searches your documents, puts the most relevant passages in the prompt, and asks the model to answer from them. It changes **what the model knows right now**.
- **Fine-tuning** trains the model further on examples of inputs and ideal outputs. It changes **how the model behaves**: format, tone, style, which labels it uses, how it handles a narrow task.

That one distinction answers most of the question: **knowledge problems point to RAG; behaviour problems point to fine-tuning.**

## Step 2: When RAG is the right choice

- The knowledge is **private** (your docs, tickets, contracts) or **changes often**. Updating means re-indexing a document, not retraining.
- You need **sources or citations**, so users and reviewers can check the answer.
- You need **access control**: each user should only see answers from documents they're allowed to read. With RAG, you filter what's retrieved.
- You want to **reduce made-up answers** by grounding the model in real text and telling it to say "I don't know" when nothing relevant is found.

The cost: extra latency for the search, and the answer is only as good as the retrieval. (See [how to debug a RAG system](/blog/debug-rag-system) and [vector database interview questions](/blog/vector-database-interview-questions).)

## Step 3: When fine-tuning is the right choice

- You need a **consistent format or style** that long prompts can't reliably produce.
- The task is **narrow and repeated**: classification, extraction into a schema, routing, a specific writing style.
- You want a **smaller, cheaper, faster model** to do as well as a big one on your task (often with examples written or checked using the big model).
- You want **shorter prompts**, because the instructions and examples are now built into the model.

The cost: you need hundreds to thousands of good examples, an eval set, training runs, and a plan to retrain when the base model or task changes. Knowledge baked in this way **goes stale** and can't be cited.

**LoRA** makes fine-tuning much cheaper: it freezes the model and trains small extra matrices. The [LoRA paper](https://arxiv.org/abs/2106.09685) reported up to **10,000 times fewer trainable parameters and 3 times less GPU memory** than full fine-tuning of GPT-3, with similar quality.

## Step 4: Answer the example

- **Product docs that change weekly:** RAG. Retraining every week would be slow and expensive, and support answers should link to the doc they came from.
- **Brand tone:** try a good system prompt with a few examples first. If evals show the tone still drifts, **fine-tune a small model** on approved past answers.
- **Both together:** a model tuned for tone and citation style, given fresh docs through RAG for each question.

## Step 5: Show the order you'd work in

1. **Prompting first:** clear instructions and a few examples. It's the cheapest to change.
2. **Build an eval set** of real questions with good answers, so you can measure every change. (See [LLM evals: catching regressions](/blog/llm-evals-catch-regressions).)
3. **Add RAG** when failures are missing or outdated knowledge.
4. **Fine-tune** when failures are about behaviour that prompting can't fix, or when cost and latency push you to a smaller model.

Saying this order out loud shows the interviewer you think about cost and evidence, not just techniques.

## The one-line answer

> "RAG changes what the model knows at question time; fine-tuning changes how it behaves. For weekly-changing docs I'd use RAG with citations, try prompting for tone first, and fine-tune a small model only if evals show the tone still drifts. Many systems end up using both."

## Follow-up questions to expect

- **"What about long context: why not paste all the docs into the prompt?"** It works for small sets, but cost and latency grow with every token, and models can miss details buried in very long prompts. RAG keeps the prompt focused. See [how to reduce LLM latency and cost](/blog/reduce-llm-latency-and-cost).
- **"How much data do you need to fine-tune?"** It depends on the task, but quality matters more than volume. A few hundred clean, consistent examples can help for a narrow format; harder tasks need more. Always hold out a test set.
- **"What can go wrong with fine-tuning?"** Overfitting to the training examples, losing general abilities, learning mistakes in the data, and drift when you switch base models. Evals before and after catch all of these.

For more, see [25 RAG interview questions](/blog/rag-interview-questions) and the [LLM system design interview framework](/blog/llm-system-design-interview).
