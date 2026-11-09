---
slug: saga-pattern-distributed-transactions
date: "2026-11-12"
title: "The saga pattern: distributed transactions explained for backend interviews"
seoTitle: "Saga Pattern Explained: Distributed Transactions Interview Guide"
description: "How to keep data consistent across microservices without a distributed lock: sagas, compensating actions, orchestration vs choreography, and the outbox pattern."
excerpt: "\"An order touches payments, inventory and shipping, each with its own database. What if inventory fails after the card is charged?\" Here's the answer."
tag: "Backend"
tool: "/tools/interview-question-predictor"
keywords:
  - saga pattern
  - distributed transactions microservices
  - saga pattern interview questions
  - orchestration vs choreography
  - compensating transaction
  - outbox pattern
tldr:
  - "A saga splits one business transaction into local steps, each committed in its own service, with a compensating action to undo each step."
  - "If a step fails, run the compensations for the completed steps in reverse order: refund the payment, then cancel the order."
  - "Orchestration (a coordinator) is easier to follow; choreography (services reacting to events) is more decoupled. Steps must be idempotent, and the outbox pattern keeps events and data in sync."
faqs:
  - q: "What is the saga pattern?"
    a: "The saga pattern manages a transaction that spans several services by breaking it into a sequence of local transactions. Each step commits in its own service and has a compensating action. If a later step fails, the compensations undo the earlier steps."
  - q: "What is the difference between orchestration and choreography in sagas?"
    a: "In orchestration, a central coordinator tells each service what to do next and tracks the saga's state. In choreography, there is no coordinator: each service listens for events and publishes its own, so the flow emerges from the events."
  - q: "Why not use two-phase commit across microservices?"
    a: "Two-phase commit locks resources across services until every participant agrees, which hurts availability and latency, and many databases and message brokers used in microservices don't support it. Sagas trade immediate consistency for availability."
  - q: "What is a compensating transaction?"
    a: "A compensating transaction is a business action that semantically undoes an earlier step, such as refunding a payment or releasing reserved stock. It doesn't erase history; it records a new action that reverses the effect."
---

In a monolith, one database transaction can create an order, charge the card and reserve stock: all or nothing. With **microservices**, each of those lives in a different service with its own database, so there's no single transaction to roll back. The **saga pattern** is the standard answer.

The question usually sounds like: "Placing an order touches payments, inventory and shipping. What happens if inventory fails after the card is charged?"

<!-- cta -->

## Step 1: Say why a normal transaction won't work

- Each service owns its data, so there's no shared database transaction.
- **Two-phase commit** could coordinate them, but it holds locks across services while waiting for everyone to agree. One slow or failed service blocks the rest, and many databases and brokers used in microservices don't support it.
- So we accept that the system is **briefly inconsistent** and make sure it always ends up consistent.

## Step 2: Describe the saga

![Orchestrated saga: create order, charge payment, reserve stock fails, then refund payment and cancel order run as compensations](/blog-images/saga-pattern-distributed-transactions/orchestrated-saga.png "Each step commits locally; a failure triggers compensations in reverse order")

A saga is a sequence of **local transactions**, each with a **compensating action**:

| Step | Action | Compensation |
| --- | --- | --- |
| 1 | Create order (status PENDING) | Cancel order |
| 2 | Charge payment | Refund payment |
| 3 | Reserve stock | Release stock |
| 4 | Create shipment | Cancel shipment |

If step 3 fails, run the compensations for steps 2 and 1 **in reverse**: refund, then cancel. The order ends as CANCELLED, and the customer sees a clear message instead of a half-finished purchase.

Note that compensations are **business actions**, not database rollbacks. A refund is a new transaction; the charge still appears in the history. Chris Richardson's write-up is the classic reference ([microservices.io: Saga](https://microservices.io/patterns/data/saga.html)).

## Step 3: Choose orchestration or choreography

| | Orchestration | Choreography |
| --- | --- | --- |
| How | A coordinator tells each service what to do | Services react to each other's events |
| Visibility | The whole flow is in one place | The flow is spread across services |
| Coupling | Services depend on the orchestrator | Services only depend on events |
| Best for | Many steps, complex rules | Few steps, simple flows |

For an order flow with 4+ steps, **orchestration** is usually easier to reason about, debug and change. Workflow engines like Temporal or AWS Step Functions handle state, retries and timeouts for you.

## Step 4: Make it reliable

- **Idempotent steps:** messages can be delivered twice, so "charge payment" must use an idempotency key. See [idempotency keys explained](/blog/idempotency-keys-explained).
- **Outbox pattern:** a service must update its database and publish its event together. Write the event into an outbox table in the same local transaction, and a separate process publishes it. Otherwise you can save the order but lose the event, or the reverse.
- **Retries and timeouts:** retry temporary failures with backoff. Decide how long to wait before giving up and compensating.
- **Compensations can fail too:** retry them until they succeed, and alert a human if they keep failing.

## Step 5: Handle what users see

While the saga runs, the order is in an in-between state. Show "Processing" rather than "Confirmed", and design reads so other features don't act on PENDING orders. Interviewers like hearing that you've thought about this lack of **isolation**.

## The one-line answer

> "I'd use an orchestrated saga: create the order as PENDING, charge, reserve stock, ship, each a local transaction with a compensation. On failure, compensate in reverse. Every step is idempotent, events go through an outbox, and the UI shows a pending state until the saga completes."

## Follow-up questions to expect

- **"What if the refund fails?"** Keep retrying with backoff; it's an operation that must eventually succeed. Alert after a threshold and allow a manual fix.
- **"Can you reorder steps to reduce compensations?"** Yes. Do the step most likely to fail, like reserving stock, before charging the card.
- **"How do you trace a saga?"** Give it a saga ID, log every step against it, and show its state in an admin view.

Related: [Kafka vs RabbitMQ vs SQS](/blog/kafka-vs-rabbitmq-vs-sqs) and [zero-downtime database migrations](/blog/zero-downtime-database-migrations).
