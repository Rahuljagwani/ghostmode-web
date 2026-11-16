---
slug: llm-chatbot-memory
date: "2026-11-18"
title: "Chatbot memory: how to make an LLM remember long conversations without blowing up cost"
seoTitle: "LLM Chatbot Memory: Long Conversations Without High Cost"
description: "Why chatbots forget in long conversations, why a bigger context window isn't the fix, and the 5-step memory design interviewers want: recent window, running summary, fact store, retrieval and evals."
excerpt: "Forty messages in, your chatbot forgets the user's name. Here's why it happens, why a bigger context window only raises the bill, and how to answer the chatbot memory question in an AI engineer interview."
tag: "AI engineer"
tool: "/tools/interview-question-predictor"
keywords:
  - llm memory
  - chatbot memory
  - conversation memory llm
  - context window
  - conversation summarization
  - long term memory for chatbots
  - ai engineer interview questions
  - llm system design
tldr:
  - "Chat model APIs are stateless: every turn sends the conversation again, so tokens, cost and latency grow with conversation length, and apps start cutting old messages."
  - "A bigger context window delays the problem but makes every turn more expensive, and models don't use very long contexts evenly."
  - "The interview answer: measure what gets dropped, keep the last few turns verbatim, summarize older turns, store key facts in a memory store and retrieve them, and test with long-conversation evals."
faqs:
  - q: "Why do chatbots forget earlier messages?"
    a: "The model itself has no memory between requests. The app resends past messages each turn, and once the conversation gets too long or too expensive, it trims the oldest ones. Anything in the trimmed part, like the user's name, is gone unless the app saved it somewhere else."
  - q: "Is a bigger context window the solution?"
    a: "Not on its own. Every token in the history is sent and paid for on every turn, so cost and latency keep climbing, and research such as 'Lost in the Middle' found models use information in the middle of long contexts less reliably."
  - q: "What is a running summary in an LLM chatbot?"
    a: "A short text that describes the older part of the conversation, updated every few turns, often by a cheaper model. It replaces the old messages in the prompt, so the prompt stays a roughly constant size."
  - q: "How do you test chatbot memory?"
    a: "Build evals from long scripted conversations, say 50 turns, where an early fact is needed late. Check that the bot recalls it, and track tokens and latency per turn to make sure they stay flat."
---

**"Your chatbot loses track of long conversations. How do you give it memory without blowing up cost?"** Forty messages in, the bot forgets the user's name. It's a common AI engineer interview question, and the usual first answer, "use a bigger context window", misses the point.

<!-- cta -->

## Why chatbots forget

Chat model APIs are **stateless**. As [OpenAI's conversation state guide](https://developers.openai.com/docs/guides/conversation-state?api-mode=chat) puts it, each request is independent, and multi-turn chat works by sending the earlier messages again with every request. That has two consequences:

- **Cost and latency grow every turn.** Turn 40 sends turns 1 to 39 again. Input tokens rise with every message.
- **Apps start trimming.** To stay under the context limit or a budget, many apps drop the oldest messages. If the user's name was in message 2, it's gone.

A bigger context window postpones the trimming but makes every turn more expensive. And models don't use long contexts evenly: the [Lost in the Middle](https://arxiv.org/abs/2307.03172) study found performance drops when the relevant information sits in the middle of a long input.

## The answer in 5 steps

![Each request holds a system prompt, retrieved key facts, a running summary and the last few turns; after each turn the summary is updated and new facts are extracted](/blog-images/llm-chatbot-memory/memory-layers.png "A bounded prompt instead of the whole conversation")

### 1. Measure what gets dropped

Before designing anything, look at real conversations:

- Log input tokens per turn and see where history gets cut off.
- Find the facts users have to repeat ("I already told you I'm vegetarian"). Those are what memory must keep.

### 2. Keep a recent window

Send the last few turns word for word, for example the last 6 to 10 messages. They carry most of what the next reply needs: the current question, pronouns that refer back, the tone of the conversation.

### 3. Summarize older turns

Replace everything older than the window with a **running summary**. Every few turns, ask a model (a cheaper one is usually fine) to update the summary with the messages that just left the window. The prompt now stays roughly the same size, however long the conversation gets.

The risk: summaries lose details. That's why step 4 exists.

### 4. Store key facts separately

Some facts must never be summarized away: the user's name, their goals, preferences, constraints and decisions already made.

- After each turn, extract durable facts into a **memory store** (a database table, or a vector store if there are many).
- On each new turn, retrieve only the facts relevant to the current message and put them in the prompt. This is retrieval, the same idea as RAG, applied to the user's own history (see [how to debug a RAG system](/blog/debug-rag-system)).
- Let facts be updated and deleted. If the user moves city, the old fact must go. Users should be able to see and clear what's stored.

### 5. Test long conversations

Memory bugs only show up late in a conversation, so test there.

- Build evals from scripted 50-turn conversations where an early fact is needed late ("book a table for me", after the user said they're vegetarian 40 turns ago).
- Check recall of early facts, and also check that the bot doesn't bring up stale or wrong facts.
- Track tokens and latency per turn: they should stay roughly flat. More on this in [LLM evals: catching regressions](/blog/llm-evals-catch-regressions).

## Cost levers on top

- **Prompt caching:** many providers discount repeated prompt prefixes, so keep the system prompt and summary at the start and stable.
- **Cheaper models for housekeeping:** summarizing and fact extraction rarely need the biggest model.
- More in [how to reduce LLM latency and cost](/blog/reduce-llm-latency-and-cost).

## The one-line answer

> "The model is stateless, so resending the whole history makes cost grow every turn. I'd send the last few turns verbatim, a running summary of older ones, and the relevant facts from a memory store, then prove it works with long-conversation evals that track recall and tokens per turn."

## Follow-up questions to expect

- **"What if the summary is wrong?"** Keep the raw history in your database, regenerate summaries when needed, and rely on the fact store for anything critical.
- **"How do you handle privacy?"** Store only what's needed, let users view and delete memory, and never store secrets like passwords or card numbers.
- **"When is a long context window the right call?"** Short sessions over one big document, where the whole document matters every turn and the session ends soon.

For more AI engineering breakdowns, see [LLM system design interview](/blog/llm-system-design-interview) and [semantic caching for LLMs](/blog/semantic-cache-llm).
