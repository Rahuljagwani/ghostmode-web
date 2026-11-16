---
slug: consistent-hashing-explained
date: "2026-11-16"
title: "Consistent hashing explained: the hash ring, virtual nodes and how to answer it in an interview"
seoTitle: "Consistent Hashing Explained: Hash Ring and Virtual Nodes"
description: "Why hash(key) % N breaks when servers change, how a consistent hashing ring moves only about 1/N of keys, why virtual nodes matter, and a ready interview answer."
excerpt: "\"You have 4 cache servers and need to add a fifth without wiping the cache. How do you spread the keys?\" Here's the answer, step by step."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - consistent hashing
  - consistent hashing explained
  - hash ring
  - virtual nodes
  - distributed cache sharding
  - system design interview questions
tldr:
  - "With hash(key) % N, changing the number of servers remaps most keys. Going from 4 to 5 servers moves about 80% of them."
  - "Consistent hashing places servers and keys on a ring. Each key belongs to the first server clockwise, so adding or removing a server moves only about 1/N of the keys."
  - "Virtual nodes give each server many points on the ring, which evens out the load and spreads a failed server's keys over all the others."
faqs:
  - q: "What is consistent hashing?"
    a: "Consistent hashing is a way to assign keys to servers so that adding or removing a server moves only a small share of keys. Servers and keys are hashed onto the same ring, and each key belongs to the first server found clockwise from its position."
  - q: "Why not just use hash(key) % N?"
    a: "Because N is part of the formula. When a server is added or removed, almost every key maps to a different server. For a cache, that means a sudden wave of misses that all hit the database at once."
  - q: "What are virtual nodes in consistent hashing?"
    a: "Virtual nodes are extra positions on the ring for each physical server. Instead of one point per server, each server gets many, often around 100 to 200. This spreads load more evenly and lets you give bigger machines more points."
  - q: "Where is consistent hashing used?"
    a: "In distributed caches, sharded key-value stores and load balancers that need sticky routing. Amazon's Dynamo paper (2007) used it to partition data, and Cassandra and many cache client libraries use the same idea."
---

**Consistent hashing** is one of those ideas that shows up in almost every system design interview: in distributed caches, sharded databases, rate limiters and load balancers. It's simple once you see the ring.

The interview prompt: **"You have 4 cache servers and need to add a fifth. How do you spread the keys so you don't wipe out the cache?"**

<!-- cta -->

## Step 1: Show why hash(key) % N breaks

The obvious approach is `server = hash(key) % N`. It spreads keys evenly, and it works until N changes.

When you go from 4 to 5 servers, a key stays on the same server only if `hash % 4` equals `hash % 5`. That's true for just 4 out of every 20 values, so **about 80% of keys move**. For a cache, every moved key is a miss, and all those misses hit the database at the same moment. That's how a routine scale-up turns into an outage.

![hash(key) % N moves about 80% of keys when going from 4 to 5 servers; a hash ring moves about 1/5](/blog-images/consistent-hashing-explained/mod-vs-ring.png "The formula depends on N, so changing N reshuffles almost everything")

## Step 2: Draw the ring

Consistent hashing was introduced by Karger and colleagues at MIT in 1997 to spread web caching load. The idea:

1. Hash every server onto a ring of numbers, for example 0 to 2^32.
2. Hash every key onto the same ring.
3. Walk clockwise from the key. The first server you meet owns it.

![A hash ring with servers A, B and C and keys k1, k2 and k3, each assigned to the next server clockwise](/blog-images/consistent-hashing-explained/hash-ring.png "Each key belongs to the first server clockwise from it")

Now look at what changes:

- **Add server D** between A and B: only the keys between A and D move to D. Everything else stays.
- **Remove server B**: only B's keys move, to the next server clockwise.

On average, adding or removing one of N servers moves **about 1/N of the keys**, instead of nearly all of them.

## Step 3: Fix the uneven load with virtual nodes

With only one point per server, the gaps on the ring are random, so one server can own a much bigger slice than another. And when a server dies, its whole slice lands on **one** neighbour, which may then fall over too.

**Virtual nodes** fix both problems. Each physical server is hashed onto the ring many times, often 100 to 200 points (`A#1`, `A#2`, ...). Then:

- Each server owns many small slices, so load evens out.
- A failed server's keys spread across **all** the remaining servers, not just one.
- A bigger machine can get more virtual nodes, so it takes a bigger share.

## Step 4: Explain lookups and replication

- **Lookup:** keep the ring positions in a sorted array (or tree) and binary-search for the first position at or after the key's hash. That's O(log V) for V virtual nodes, and the ring is small enough to keep in memory on every client or router.
- **Replication:** store each key on the next R **distinct physical** servers clockwise, skipping virtual nodes that belong to a server you've already picked. This is the approach described in Amazon's [Dynamo paper](https://www.allthingsdistributed.com/files/amazon-dynamo-sosp2007.pdf).
- **Membership:** every client needs the same view of the ring. Use a config service or gossip, and change membership gradually.

## Step 5: Mention the limits and alternatives

- **Hot keys:** consistent hashing spreads keys, not traffic. One celebrity key still lands on one server. Fix it with replication of hot keys or a small local cache in front. (See [caching strategies for system design](/blog/caching-strategies-system-design).)
- **Rendezvous hashing** (highest random weight) is a simpler alternative: score every server for each key and pick the highest. It needs no ring, but costs O(N) per lookup.
- **Jump consistent hash** is fast and uses no memory, but works best when servers are only added or removed at the end of a numbered list.

## The one-line answer

> "Modulo hashing remaps most keys when the server count changes, so I'd use consistent hashing: servers and keys on a ring, each key owned by the next server clockwise, so a change moves only about 1/N of keys. I'd add virtual nodes for even load and replicate each key to the next few distinct servers."

## Follow-up questions to expect

- **"How many virtual nodes?"** Enough that the load spread is even, often 100 to 200 per server. More nodes mean a bigger ring to store and search, so measure the imbalance and stop when it's small enough.
- **"What happens when a node fails?"** Its keys move to the next servers clockwise. With virtual nodes, that extra load spreads across the whole cluster. With replication, reads keep working from the replicas.
- **"How would you use this for a sharded database?"** The same ring decides which shard owns a key, but moving data takes time, so you copy the affected range in the background before switching ownership. See [how to scale a database](/blog/how-to-scale-a-database).
