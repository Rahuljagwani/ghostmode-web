---
slug: llm-evals-catch-regressions
date: "2026-11-06"
title: "LLM evals: how to catch regressions before users do (AI engineer interview)"
seoTitle: "LLM Evals: How to Catch Regressions (Interview Guide)"
description: "How to catch quality regressions when prompts and models change every week: golden datasets, assertions, LLM-as-judge, CI gates and production monitoring."
excerpt: "Your team changes prompts and models every week. How do you know nothing got worse? Here's the eval setup interviewers expect you to describe."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - llm evaluation interview questions
  - llm evals
  - llm regression testing
  - llm as a judge
  - golden dataset
  - ai engineer interview
tldr:
  - "Treat LLM evals like software tests: a fixed dataset, automated checks, and a gate before release."
  - "Start with cheap deterministic assertions, then add an LLM judge with a clear rubric, calibrated against human labels."
  - "Offline evals aren't enough: ship behind a canary, sample live traffic, and feed every new failure back into the dataset."
faqs:
  - q: "What is an LLM eval?"
    a: "An LLM eval is an automated test that runs a fixed set of inputs through your LLM system and scores the outputs, using exact checks, an LLM judge or human review. Running it on every change shows whether quality improved or regressed."
  - q: "What is a golden dataset?"
    a: "A golden dataset is a curated set of realistic inputs, ideally taken from production, each with an expected output or grading criteria. It includes past failures and edge cases so that known problems can't silently return."
  - q: "Is LLM-as-a-judge reliable?"
    a: "It can be, once calibrated. Judges can favour longer answers or the first option shown, so give them a specific rubric, randomise order when comparing, and check their scores against human labels on a sample before relying on them."
  - q: "How many examples does an LLM eval set need?"
    a: "Fewer than people expect to start. A few dozen well-chosen real examples covering key tasks and known failures are useful on day one. Grow the set over time by adding every new failure you find in production."
---

**LLM evals** are automated tests for AI features: a fixed set of realistic inputs, run through your system on every change, with outputs scored by exact checks, an LLM judge or people. They're how teams change prompts and models every week without quietly making things worse ([Hamel Husain on evals](https://hamel.dev/blog/posts/evals/)).

In interviews, it sounds like this: "Your team changes prompts and models every week. How would you catch quality regressions before users see them?"

<!-- cta -->

## Why "we test it manually" isn't enough

LLM outputs change in subtle ways. A prompt tweak that fixes one case can break three others, and a new model version can change formats or tone. Reading a few outputs by eye misses most of this. Interviewers want to hear that you treat quality like **tests in CI**, not vibes.

## Step 1: Build a golden dataset

- Collect **real inputs from production** (with privacy handled), not just inputs you invented.
- Include **past failures and edge cases** so known bugs can't come back.
- For each input, write an **expected output or grading criteria**: the right answer, required facts, or what a good response must and must not do.

Start small. A few dozen strong examples beat a thousand vague ones, and the set grows every time something breaks.

## Step 2: Run cheap checks first

Many failures can be caught with plain code, which is fast, free and never flaky:

- Output is **valid JSON** or matches the schema.
- **Required fields** or facts are present.
- **Banned content** is absent, such as competitor names or internal URLs.
- The agent called the **right tool with valid arguments**.
- Length and latency stay within limits.

## Step 3: Add a calibrated LLM judge

For qualities code can't check, such as helpfulness, tone or whether an answer is supported by the source, use a model as a **judge** with a specific rubric.

Judges have biases: they can prefer longer answers or the first option shown. So:

- Write **precise rubrics**, ideally pass/fail per criterion rather than a 1–10 score.
- **Randomise the order** when comparing two outputs.
- **Calibrate:** label a sample by hand and check the judge agrees before trusting it ([Anthropic: develop tests](https://docs.claude.com/en/docs/test-and-evaluate/develop-tests)).

## Step 4: Gate releases in CI

- Run the suite on **every prompt, model or retrieval change**, the same way unit tests run on code changes.
- Compare against the **current baseline**, not an absolute score.
- **Block merges** that regress on key metrics, and review the specific examples that changed.

This turns "the new prompt feels better" into "the new prompt passes 94% of cases versus 91%, with no regressions on billing questions."

## Step 5: Watch production too

Offline sets never cover everything real users do.

- Ship risky changes behind a **canary or split test** and compare live metrics.
- **Sample live traces** for human review each week.
- Track signals like thumbs down, retries and escalations to a human.
- **Add every new failure** to the golden dataset, closing the loop.

## The eval stack at a glance

| Layer | Catches | Cost |
| --- | --- | --- |
| Assertions in code | Format, required fields, tool calls | Very low |
| LLM judge with rubric | Quality, tone, groundedness | Medium |
| Human review of samples | Subtle issues, judge mistakes | High |
| Canary or split test | Real-user impact | Medium |
| Production feedback loop | Unknown unknowns | Ongoing |

## The one-line answer

> "I'd treat evals like tests: a golden dataset from real traffic, cheap assertions plus a calibrated LLM judge running in CI on every change, and production monitoring that feeds new failures back into the set."

## Follow-up questions to expect

- **"How do you evaluate an agent, not just one answer?"** Score the whole task: did it succeed, how many steps, which tools, and whether any step was unsafe.
- **"What if the judge and humans disagree?"** Fix the rubric or the judge prompt, and keep humans in the loop for that criterion.
- **"How do you avoid overfitting to the eval set?"** Keep a held-out set, refresh with new production data, and watch live metrics too.

Pairs well with our guide on [how to debug a RAG system](/blog/debug-rag-system), where the same test set does double duty.
