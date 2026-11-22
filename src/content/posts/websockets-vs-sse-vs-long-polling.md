---
slug: websockets-vs-sse-vs-long-polling
date: "2026-11-23"
title: "WebSockets vs SSE vs long polling: how to choose (and explain it in an interview)"
seoTitle: "WebSockets vs SSE vs Long Polling: How to Choose"
description: "WebSockets, Server-Sent Events and long polling compared: how each works, latency, direction, scaling, proxies and reconnects, with a simple rule for choosing one in a system design interview."
excerpt: "Three ways to get live updates into a browser. Here's how each works, where each breaks, and the one-line rule for picking between them."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - websockets vs sse
  - websocket vs long polling
  - server sent events
  - sse vs websocket
  - real-time updates system design
  - long polling
tldr:
  - "Long polling: the client asks, the server holds the request until there's news, then the client asks again. Simple and works everywhere, but adds requests and delay."
  - "SSE: one long HTTP response that the server streams events down. One direction only (server to client), text only, with built-in reconnect. Great for feeds, notifications and LLM token streaming."
  - "WebSockets: a two-way connection after an HTTP upgrade. Best when both sides talk often, like chat or multiplayer, but connections are stateful, so scaling needs more care."
faqs:
  - q: "What is the difference between WebSockets and SSE?"
    a: "SSE (Server-Sent Events) sends data in one direction, from server to client, over a normal HTTP response, and the browser reconnects automatically. WebSockets open a two-way connection where both sides can send text or binary messages at any time. Use SSE when the client only listens, and WebSockets when it also sends often."
  - q: "Is long polling still used?"
    a: "Yes, as a fallback and for simple cases where updates are rare. It works through almost any proxy or firewall because it's just regular HTTP requests, but each update costs a new request and adds some delay."
  - q: "Why do LLM chat apps use SSE?"
    a: "The model's answer flows one way, from server to browser, token by token. SSE fits that exactly, works over plain HTTP and HTTP/2, and needs no special server setup. The user's next message is just a normal POST request."
  - q: "How do you scale WebSocket servers?"
    a: "Each connection lives on one server, so you need a way to reach the right one: a shared pub/sub layer (for example Redis or a message broker) or a registry of which user is on which server. You also need heartbeats, load balancer timeouts set for long connections, and reconnect logic on the client."
---

"How would you push live updates to the user?" comes up in almost every system design interview: chat, notifications, live scores, dashboards, collaborative editing, and now streaming LLM answers. The three standard answers are **long polling**, **Server-Sent Events (SSE)** and **WebSockets**.

Interviewers rarely want a long lecture. They want you to pick one, explain why, and know where it breaks.

<!-- cta -->

## How each one works

![Timelines of long polling, SSE and WebSockets: repeated held requests, one long response streaming events, and one two-way connection](/blog-images/websockets-vs-sse-vs-long-polling/patterns.png "The same goal, three very different shapes on the wire")

### Long polling

1. The client sends a normal HTTP request: "anything new?"
2. The server **doesn't answer straight away**. It holds the request open until there's news, or until a timeout (often 20 to 30 seconds).
3. The server responds, and the client immediately sends the next request.

It's just HTTP, so it works through almost any proxy, firewall or old browser. The cost: every update needs a new request with headers, and there's a small gap between one response and the next request.

### Server-Sent Events (SSE)

1. The client opens a request with the browser's `EventSource` API.
2. The server replies with `Content-Type: text/event-stream` and **keeps the response open**.
3. Whenever there's news, the server writes an event down the same response.

```text
event: score
id: 1042
data: {"home": 2, "away": 1}
```

SSE is **one-way** (server to client) and **text only**. In exchange you get things for free: the browser **reconnects automatically**, and it sends the last event ID it saw (`Last-Event-ID`), so the server can resend anything missed.

### WebSockets

1. The client sends an HTTP request asking to **upgrade** the connection.
2. The server answers `101 Switching Protocols`.
3. From then on it's a **two-way connection**: either side can send text or binary messages at any time, with very little overhead per message.

## Comparison

| | Long polling | SSE | WebSockets |
|---|---|---|---|
| Direction | Server to client (client sends normal requests) | Server to client | Both ways |
| Data | Anything HTTP can carry | Text (UTF-8) | Text or binary |
| Protocol | Plain HTTP | Plain HTTP | Upgrade, then the WebSocket protocol |
| Reconnect | Built into the pattern | Automatic in the browser | You write it |
| Overhead per update | A full request and response | Small | Very small |
| Works with HTTP/2 | Yes | Yes, many streams on one connection | Usually a separate connection |
| Best for | Rare updates, fallback | Feeds, notifications, progress, LLM streaming | Chat, multiplayer, collaborative editing |

One detail worth knowing: over **HTTP/1.1**, browsers limit how many connections a page can open to one domain (about six), so several SSE streams in different tabs can run out. Over **HTTP/2** this mostly goes away, because many streams share one connection.

## Which one to choose

![Long polling for rare updates, SSE when only the server sends, WebSockets when both sides talk often](/blog-images/websockets-vs-sse-vs-long-polling/choice.png "Pick by direction and frequency of messages")

The rule of thumb:

- **Only the server sends updates?** Use **SSE**. Notifications, live dashboards, build logs, order tracking, and streaming an LLM's answer token by token.
- **Both sides send often, with low delay?** Use **WebSockets**. Chat, multiplayer games, live cursors in a shared document, trading screens.
- **Updates are rare, or you're stuck behind something that breaks long connections?** **Long polling** is fine and simple.

A good interview sentence: *"The client mostly listens, and it can send the occasional action as a normal POST, so I'd use SSE. It's plain HTTP, reconnects on its own, and works well with HTTP/2. If we later need frequent two-way messages, I'd move that feature to WebSockets."*

## What breaks at scale

Long-lived connections change how you run servers. Mention these and you'll stand out.

1. **Connections are stateful.** A user's connection lives on one specific server. To send them a message, you need to know which server that is. Common answers: a **pub/sub layer** (Redis pub/sub or a message broker) that every server subscribes to, or a **session registry** mapping user to server. Our [chat system design](/blog/chat-system-design) post shows this in full.
2. **Load balancers and proxies time out idle connections.** Send **heartbeats** (WebSocket ping/pong, or an SSE comment line every 15 to 30 seconds) and set the load balancer's idle timeout above that.
3. **Deploys drop connections.** When a server restarts, every client on it reconnects at once. Add **random jitter** to client reconnect delays so they don't all hit the new servers in the same second.
4. **Missed messages.** Reconnects happen. Give events IDs, and let the client say "I last saw 1042" so the server can send what was missed. SSE has this built in; with WebSockets you design it yourself.
5. **Backpressure.** If a client reads slower than you send, buffers grow. Drop or merge updates for slow clients (for example, only send the latest price) instead of queueing forever.
6. **Authentication.** Check auth when the connection opens, and plan for tokens that expire while the connection is still open.

## Common interview follow-ups

**"Why not just poll every few seconds?"** Regular (short) polling is the simplest of all, and it's fine for data that changes slowly. But most requests return nothing, it wastes server work at scale, and updates arrive up to one interval late.

**"How many connections can one server hold?"** Tens of thousands or more per server is common with an event-driven server, because idle connections cost little CPU. Memory per connection and file descriptor limits are usually the real ceiling. Say you'd load test it rather than quote a number.

**"What about mobile apps?"** When the app is open, the same options apply. When it's in the background or closed, you can't keep a connection open, so you use **push notifications** (APNs and FCM). See our [notification system design](/blog/notification-system-design) post.

**"Is there anything newer?"** WebTransport (built on HTTP/3) offers two-way streams and unreliable datagrams, useful for games and media. It's worth a mention, but WebSockets and SSE are still the standard answers.

## Summary

Pick by **who sends** and **how often**. SSE for one-way streams, WebSockets for frequent two-way messages, and long polling as the simple fallback. Then show you know the operational side: routing messages to the right server, heartbeats, reconnects with missed-message recovery, and slow clients.
