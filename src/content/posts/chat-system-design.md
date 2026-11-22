---
slug: chat-system-design
date: "2026-11-25"
title: "Chat app system design: how to design WhatsApp in an interview"
seoTitle: "Chat System Design: How to Design WhatsApp (Interview Guide)"
description: "Design a chat app like WhatsApp or Messenger for a system design interview: requirements, WebSocket gateways, message IDs and ordering, storage, delivery and read receipts, offline users, group chats, presence and scaling."
excerpt: "\"Design WhatsApp\" is a system design classic. Here's a clear answer, from connections and message ordering to read receipts, group chats and offline delivery."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - chat system design
  - design whatsapp
  - messaging system design
  - chat application architecture
  - system design interview questions
  - read receipts design
tldr:
  - "Clients keep a WebSocket connection to a gateway. A chat service gives each message an ID, saves it, then looks up which gateway the receiver is connected to and delivers it there, or sends a push notification if they're offline."
  - "Store messages by conversation, ordered by a per-conversation sequence or time-sortable ID. Use client-generated message IDs so retries never create duplicates."
  - "Sent, delivered and read are acknowledgements flowing back. Group chats fan out to members; very large groups switch to members pulling new messages."
faqs:
  - q: "How does WhatsApp deliver messages in real time?"
    a: "Each phone keeps a long-lived connection to a server. When you send a message, the server stores it and forwards it over the receiver's open connection. If the receiver is offline, the message waits on the server and a push notification tells their phone to connect and fetch it."
  - q: "How do you keep chat messages in order?"
    a: "Give each message a sequence number within its conversation, assigned by the server, or a time-sortable ID. Clients display messages sorted by that number rather than by arrival time, so network delays don't reorder the conversation."
  - q: "Which database is good for storing chat messages?"
    a: "A store that is fast at writing and at reading a range of rows by key fits well, such as a wide-column database (Cassandra or similar) partitioned by conversation ID and sorted by message ID. Many relational databases also work at moderate scale with the right index."
  - q: "How do read receipts work?"
    a: "The receiver's app sends an acknowledgement when a message reaches the device (delivered) and another when the user opens the conversation (read). The server records the latest delivered and read message for each member and forwards the update to the sender."
---

"Design a chat app like WhatsApp" is one of the most common system design questions. It looks simple, but it tests real-time connections, ordering, duplicates, storage at scale and offline users in one problem.

Here's a structure you can follow in a 45-minute interview.

<!-- cta -->

## Step 1: Agree on requirements

**Functional:**
- One-to-one chats and group chats (say, up to 500 members).
- Sent, delivered and read status.
- Online status ("last seen").
- Messages reach users who were offline when they come back.
- Text first; images and files as a follow-up.

**Non-functional:**
- **Low latency:** messages should arrive in well under a second when both users are online.
- **No lost messages, no duplicates,** and correct order within a conversation.
- **Scale:** assume tens of millions of daily users and billions of messages a day. Say the numbers out loud and let them drive the design.

## Step 2: Estimate

Suppose 50 million daily users each send 40 messages: 2 billion messages a day, about **23,000 per second on average**, and several times that at peak. At around 200 bytes per message with metadata, that's roughly **400 GB of new data a day** before replication. Writes are heavy, so the storage must handle a high write rate.

## Step 3: High-level design

![Chat architecture: clients connect over WebSockets to gateways; the chat service saves messages, finds the receiver's gateway in a session registry, and delivers or sends a push notification](/blog-images/chat-system-design/architecture.png "Connections live on gateways; the chat service stores and routes")

1. **Gateways** hold the long-lived **WebSocket** connections. They're thin: authenticate, keep the connection alive, pass messages through. (Why WebSockets and not SSE? Both sides send constantly. See [WebSockets vs SSE vs long polling](/blog/websockets-vs-sse-vs-long-polling).)
2. The **chat service** receives a message, assigns it an ID, **saves it first**, then routes it.
3. A **session registry** (for example in Redis) maps each online user to the gateway holding their connection.
4. If the receiver is online, the chat service sends the message to **their gateway**, which pushes it down the connection. If not, the message stays stored and the **push service** sends a notification through APNs or FCM.

## Step 4: Message IDs, ordering and duplicates

**Duplicates.** Phones lose signal mid-send and retry. The client generates a **client message ID** (a UUID) for every message. The server stores it with a unique constraint per sender, so a retry with the same ID is ignored and simply acknowledged again. This is the same idea as [idempotency keys](/blog/idempotency-keys-explained).

**Ordering.** Arrival time isn't reliable, so the server assigns each message a **sequence number within its conversation** (1, 2, 3...), or a time-sortable ID such as a Snowflake-style ID. Clients sort by that, not by when the message arrived.

**Sync after reconnecting.** Each device remembers the last sequence number it has for each conversation and asks: "give me everything after 1,284." That one rule handles offline users, flaky networks and multiple devices.

## Step 5: Storage

Access pattern: "write a message" and "read the latest N messages of a conversation, then older pages." So:

- **Partition by conversation ID**, sort by message sequence or ID within the partition.
- A wide-column store (Cassandra, ScyllaDB or similar) is a common choice because it handles very high write rates and range reads by key well.
- Very large or old conversations: keep recent messages hot, move older ones to cheaper storage.
- **Media** (photos, videos) goes to object storage. The message holds a link and a thumbnail.

A separate, smaller database (relational is fine) stores users, groups and memberships.

## Step 6: Sent, delivered and read

![Message states: sending, sent once the server saves it, delivered when the receiver's device acknowledges, read when they open the chat](/blog-images/chat-system-design/delivery-states.png "Each tick is an acknowledgement travelling back to the sender")

- **Sent (one tick):** the server saved the message and acknowledged the sender.
- **Delivered (two ticks):** the receiver's device acknowledged receiving it.
- **Read:** the receiver opened the conversation.

Don't store a status row per message per user. Store, for each member of a conversation, the **last delivered** and **last read** sequence number. "Read up to 1,290" covers every earlier message in one write.

## Step 7: Group chats

For small and medium groups, **fan out on write**: when a message arrives, look up the members and deliver to each online member's gateway; offline members get a push notification and fetch it later. The message itself is stored **once**, per conversation, not once per member.

For very large groups or channels with thousands of members, fanning out every message is expensive. Switch to members **pulling** new messages when they open the group, with a lighter notification.

## Step 8: Presence ("online" and "last seen")

The gateway knows when a connection opens and closes. Clients send a **heartbeat** every 30 seconds or so; if it stops, the user is marked offline and "last seen" is updated. Presence changes are frequent and not critical, so send them only to people who currently have that chat open, and accept small delays.

## Step 9: Scaling and failures

- **Gateways** scale horizontally. When one dies, its clients reconnect to another (with random backoff so they don't all reconnect in the same second) and sync from their last sequence number. Nothing is lost because messages are saved before delivery.
- **Chat service** is stateless and scales horizontally.
- **Hot conversations** (a huge group during a big event) can overload one partition. Rate limit per sender and spread very large channels differently.
- **Multi-region:** users connect to the nearest region; conversations have a home region for ordering, or you accept cross-region replication delay.

## Follow-ups interviewers like

**"How would you add end-to-end encryption?"** Messages are encrypted on the sender's device with keys only the participants have (WhatsApp uses the Signal Protocol). The server stores and routes ciphertext it can't read. That means server-side search and moderation of message content aren't possible.

**"How do you support multiple devices per user?"** The session registry maps a user to **several** connections. Each device syncs from its own last sequence number.

**"How do you handle a user sending messages too fast?"** Rate limit per user and per conversation at the chat service. See our [rate limiter system design](/blog/rate-limiter-system-design).

## Summary

Gateways hold connections, the chat service saves first and routes second, a session registry says where each user is, and push notifications cover offline users. Client message IDs remove duplicates, per-conversation sequence numbers keep order, and "last read" pointers make receipts cheap. Say those three ideas clearly and you've covered what interviewers look for.
