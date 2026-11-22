---
slug: distributed-locks-explained
date: "2026-11-27"
title: "Distributed locks explained: Redis, ZooKeeper, fencing tokens, and when you don't need one"
seoTitle: "Distributed Locks Explained: Redis, ZooKeeper and Fencing Tokens"
description: "How distributed locks work and where they fail: Redis SET NX with expiry, safe release, the Redlock debate, ZooKeeper and etcd, fencing tokens, and the simpler alternatives interviewers like to hear."
excerpt: "A lock with a timeout can still let two workers in at once. Here's how distributed locks really work, how fencing tokens fix them, and when to avoid locks altogether."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - distributed lock
  - redis distributed lock
  - fencing token
  - redlock
  - zookeeper lock
  - system design interview questions
tldr:
  - "A distributed lock makes sure only one worker does something at a time across many servers. The simplest version is a Redis key set with SET NX and an expiry, released only by its owner."
  - "Any lock with a timeout can expire while its holder is paused, so two workers can believe they hold it. Fencing tokens (an increasing number checked by the storage) make that safe."
  - "Often you don't need a lock at all: a database transaction, a unique constraint, optimistic concurrency with a version column, or routing all work for one key to one worker does the job more simply."
faqs:
  - q: "What is a distributed lock?"
    a: "A distributed lock is a way for processes on different machines to agree that only one of them may do a certain task, or change a certain resource, at a time. It's stored in a shared system such as Redis, ZooKeeper, etcd or a database."
  - q: "How do you implement a distributed lock with Redis?"
    a: "Acquire it with SET lock_key random_value NX PX 30000, which only succeeds if the key doesn't exist and sets a 30-second expiry. Release it with a small Lua script that deletes the key only if it still holds your random value, so you never delete someone else's lock."
  - q: "What is a fencing token?"
    a: "A number that increases every time the lock is granted. The lock holder sends it with every write, and the storage rejects any write carrying a lower number than the highest it has already seen. That stops a client whose lock has expired from overwriting newer data."
  - q: "Is Redlock safe?"
    a: "It's debated. Redlock acquires the lock on a majority of independent Redis nodes. Critics, notably Martin Kleppmann, argue it depends on timing assumptions and doesn't provide fencing tokens, so it isn't safe for correctness-critical work. For efficiency (avoiding duplicate work), a single Redis lock is usually fine; for correctness, use fencing tokens with a consensus system such as ZooKeeper or etcd, or avoid the lock."
---

"How would you make sure only one worker processes this job?" Sooner or later every backend interview reaches that question, and "use a distributed lock" is only the start of a good answer. The interesting part is **how locks fail**, and when you don't need one at all.

<!-- cta -->

## When do you need a lock?

Ask why you want it first. There are two very different reasons:

1. **Efficiency:** avoid doing the same work twice, like two servers sending the same daily report. If the lock occasionally fails, you waste some work or send a duplicate email. Annoying, not catastrophic.
2. **Correctness:** two workers must never act at once, like two processes writing the same file or overselling the last seat. If the lock fails, data is corrupted.

Say this distinction in the interview. It decides how strong the lock must be.

## The simple Redis lock

Acquire:

```text
SET lock:report:2026-11-27 <random-token> NX PX 30000
```

- `NX`: only set it if the key doesn't exist, so only one client succeeds.
- `PX 30000`: expire after 30 seconds, so a crashed holder doesn't block everyone forever.
- `<random-token>`: a unique value per client, so you can prove the lock is yours.

Release, **only if it's still yours** (a Lua script runs atomically in Redis):

```lua
if redis.call("GET", KEYS[1]) == ARGV[1] then
  return redis.call("DEL", KEYS[1])
else
  return 0
end
```

Why the check? If your work ran longer than 30 seconds, the lock expired and **someone else may hold it now**. A plain `DEL` would delete their lock.

## Where every timeout-based lock breaks

![Client 1 takes the lock with token 33 and pauses; the lock expires; client 2 takes it with token 34 and writes; client 1 wakes up and writes with 33, which the storage rejects](/blog-images/distributed-locks-explained/fencing-token.png "With fencing tokens, the late write from the paused client is rejected")

Picture this:

1. Client 1 gets the lock with a 30-second expiry.
2. Client 1 **pauses**: a long garbage-collection pause, a slow network call, the VM being suspended.
3. The lock **expires**. Client 2 gets it and starts writing.
4. Client 1 wakes up, still believing it holds the lock, and **writes too**.

Nothing in the lock service can prevent this, because client 1 doesn't know it was paused. Extending the timeout only makes it rarer. This is why timeout-based locks alone aren't enough for correctness.

## The fix: fencing tokens

Every time the lock is granted, the lock service returns a **number that only goes up**: 33, then 34, then 35. The holder sends that number with **every write**, and the storage **remembers the highest number it has seen** and rejects anything lower.

In the example, client 2 writes with token 34. When client 1 wakes up and writes with 33, the storage refuses it. The data stays correct even though two clients briefly thought they held the lock.

The catch: **the storage has to check the token.** That's easy if you control it (a database with a `WHERE token <= :token` condition, or a version column), harder with external systems.

## ZooKeeper and etcd

For correctness-critical locks, teams often use a **consensus-based** system:

- **ZooKeeper:** a client creates an *ephemeral sequential* node under a lock path. The lowest number holds the lock; others watch the node just ahead of them. If the holder's session dies, its node disappears and the next in line takes over. The sequence number (or the node's version) can serve as a fencing token.
- **etcd:** a lock is tied to a **lease** that the client must keep renewing. Each change in etcd has a **revision number** that only increases, which works as a fencing token.

These systems replicate state with a consensus protocol (Zab in ZooKeeper, Raft in etcd), so a single node failing doesn't hand the lock to two clients. They're slower and more work to run than Redis.

## What about Redlock?

**Redlock** tries to make Redis locks safer by acquiring the lock on a **majority of independent Redis nodes** (for example, 3 out of 5). It's well known partly because it's **disputed**: Martin Kleppmann argued it relies on timing assumptions (clocks and pauses behaving) and doesn't provide fencing tokens, so it isn't safe for correctness; Redis's creator, Salvatore Sanfilippo, published a response defending it.

A balanced interview answer: *"For efficiency locks, a single Redis instance with SET NX and an expiry is usually enough. For correctness, I wouldn't rely on Redlock alone. I'd use fencing tokens with ZooKeeper or etcd, or better, avoid the lock with a database constraint."*

## Often you don't need a lock at all

Interviewers love this part. Many "lock" problems have simpler answers:

- **Database transaction with a row lock:** `SELECT ... FOR UPDATE` on the row you're changing. If your data is in one database, this is the simplest correct lock.
- **Unique constraint:** to make sure an order is only created once, put a unique index on the order key and let the second insert fail. Pair it with [idempotency keys](/blog/idempotency-keys-explained) for API retries.
- **Optimistic concurrency:** add a `version` column. Update with `WHERE id = :id AND version = :seen_version`; if zero rows change, someone else got there first, so reload and retry. No lock held at all.
- **Atomic operations:** a counter or stock level can often be one atomic statement: `UPDATE stock SET qty = qty - 1 WHERE id = :id AND qty > 0`. We used this in our [flash sale system design](/blog/flash-sale-system-design).
- **Single writer per key:** route all work for one customer or one resource to the same worker or partition (for example, a Kafka partition keyed by customer ID). If only one worker ever handles a key, nothing needs locking.
- **Scheduled jobs:** for "run this once a day", use a scheduler that guarantees one run, or record "report for 2026-11-27 done" with a unique constraint.

## Checklist for an interview answer

1. Ask: **efficiency or correctness?**
2. Prefer **no lock**: a transaction, unique constraint, version column, atomic update or single writer per key.
3. If you need a lock for efficiency: Redis `SET NX PX` with a random value and owner-only release.
4. If you need it for correctness: **fencing tokens**, with ZooKeeper or etcd, and storage that checks the token.
5. Mention the failure mode: **pauses and expiries**, and how your design survives them.
