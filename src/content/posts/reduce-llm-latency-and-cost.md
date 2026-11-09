---
slug: reduce-llm-latency-and-cost
date: "2026-11-13"
title: "How to reduce LLM latency and cost: streaming, prompt caching and model routing"
seoTitle: "Reduce LLM Latency and Cost: Streaming, Caching, Routing"
description: "How to make an LLM feature faster and cheaper: measure first, then stream, cache prompt prefixes, route easy requests to small models and cap output."
excerpt: "\"Our AI feature takes 8 seconds and the bill doubled last month. What do you do?\" A step-by-step answer for AI engineer interviews."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - reduce llm latency
  - reduce llm cost
  - prompt caching
  - llm model routing
  - time to first token
  - ai engineer interview questions
tldr:
  - "Measure first: time to first token, total time, input and output tokens, and cost per request."
  - "Streaming makes answers feel fast; capping output and trimming the prompt make them actually faster and cheaper."
  - "Cache the stable start of your prompt, route easy requests to a smaller model, and use batch APIs for work that can wait."
faqs:
  - q: "What is time to first token?"
    a: "Time to first token (TTFT) is how long a user waits before the first words of a model's answer appear. With streaming, it is what users feel as speed, even if the full answer takes longer."
  - q: "How does prompt caching reduce LLM cost?"
    a: "Prompt caching stores the processed start of a prompt, such as a long system prompt and documents. Later requests that begin with exactly the same prefix reuse it, which is billed at a much lower rate and returns faster. It only works if the stable content comes first and the changing content comes last."
  - q: "What is model routing?"
    a: "Model routing sends each request to the cheapest model that can handle it well: simple requests go to a small, fast model and hard ones to a larger model. The router can be rules, a classifier or a small model."
  - q: "Do output tokens cost more than input tokens?"
    a: "With most major LLM APIs, yes. Output tokens are usually priced several times higher than input tokens and are generated one at a time, so long answers drive both cost and latency."
---

LLM features get slow and expensive fast. A typical interview question: **"Our AI feature takes 8 seconds to answer and the bill doubled last month. What would you do?"** The strong answer starts with measurement, then uses a handful of levers, each aimed at a specific cost.

<!-- cta -->

## Step 1: Measure before changing anything

Log for every request:

- **Time to first token (TTFT)** and **total time**.
- **Input tokens** and **output tokens**. Output is usually priced higher and is generated one token at a time, so it drives both cost and latency.
- **Cost per request** and per user, by feature.
- Whether a cache was used, and which model handled it.

Then find the biggest cost. Very often it's a huge prompt resent on every request, or answers far longer than needed.

## Step 2: Stream, and shorten the output

- **Stream tokens** so the first words appear quickly. A 6-second answer that starts after half a second feels fast.
- **Cap output length** with a max-token limit and clear instructions: "Answer in 3 bullet points." Shorter output is cheaper and faster.
- **Ask for structure**, like JSON with only the fields you need, instead of prose you then parse.

## Step 3: Route requests to the right model

![Router sends easy requests to a small model and hard ones to a large model; tokens stream to the user](/blog-images/reduce-llm-latency-and-cost/latency-levers.png "Route by difficulty, then stream the answer")

Not every request needs the biggest model. Classifying a support ticket or extracting a date works fine on a small model at a fraction of the cost and time.

- Start with **simple rules**: by feature, input length or user tier.
- Upgrade to a **classifier** or a small model that decides, if needed.
- **Fall back** to the larger model when the small one's answer fails validation.
- Check quality with an eval set before and after, as in [LLM evals that catch regressions](/blog/llm-evals-catch-regressions).

## Step 4: Cache what repeats

![Prompt caching: the long stable prefix is cached on the first request and reused on the next; only the new question is processed at full price](/blog-images/reduce-llm-latency-and-cost/prompt-caching.png "Stable content first, changing content last")

- **Prompt caching:** most providers can reuse the processed start of a prompt if it's identical between requests. Put the system prompt, documents and examples **first**, and anything that changes per request, like the user's question or the date, **last**. Cached input is billed at a fraction of the normal rate and is faster ([Anthropic: prompt caching](https://docs.anthropic.com/en/docs/build-with-claude/prompt-caching), [OpenAI: prompt caching](https://platform.openai.com/docs/guides/prompt-caching)). Check each provider's minimum prompt length and how long the cache lasts.
- **Response caching:** if many users ask the same thing, cache the answer itself. For questions that are similar but not identical, see [semantic caching](/blog/semantic-cache-llm).

## Step 5: Trim the prompt and batch what can wait

- **Retrieve less, retrieve better:** send the 5 most relevant chunks, not 30. Better retrieval cuts tokens and often improves answers.
- **Summarise long chat history** instead of resending every message.
- **Batch APIs:** for work that doesn't need an instant answer, like nightly summaries or bulk classification, batch endpoints are typically much cheaper in exchange for slower turnaround.

## The one-line answer

> "I'd measure time to first token, tokens and cost per request first. Then stream responses, cap output length, route easy requests to a smaller model with an eval to protect quality, put the stable prompt first so prompt caching applies, trim retrieval and history, and batch anything that can wait."

## Follow-up questions to expect

- **"How do you know quality didn't drop?"** Run the eval set on every change and watch user feedback and retry rates.
- **"Streaming with structured output?"** Stream partial JSON, or stream the prose part and send structured data at the end.
- **"Self-host to save money?"** Only at high, steady volume, and after counting GPU, operations and quality costs.
