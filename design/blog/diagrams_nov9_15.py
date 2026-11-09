"""Diagrams for the Nov 9-15, 2026 posts. Run: python3 design/blog/diagrams_nov9_15.py"""

from diagram import Diagram


def caching():
    slug = "caching-strategies-system-design"

    d = Diagram("Cache-aside: the app manages the cache", "Read path on a cache miss, and how a write invalidates")
    d.box(110, 330, 300, 170, "App server", ["your code decides", "what to cache"], "sky")
    d.box(650, 210, 320, 150, "Cache", ["Redis / Memcached", "key -> value, with TTL"], "green")
    d.box(650, 560, 320, 150, "Database", ["source of truth"], "gray")
    d.arrow(410, 370, 645, 290, "1. GET user:42", label_dy=-22)
    d.arrow(645, 330, 410, 410, "2. miss", color="#dc2626", label_dy=26)
    d.arrow(410, 450, 645, 610, "3. SELECT ... WHERE id = 42", label_dy=-36, label_dx=90)
    d.path("M 975 620 C 1100 560, 1100 360, 975 300", "4. SET user:42 (TTL 10 min)", at=(1210, 460))
    d.box(1180, 640, 360, 140, "On write", ["update the DB, then", "DELETE the cache key"], "amber", size=26)
    d.note(80, 840, "Next read of user:42 is a cache hit until the TTL expires or the key is deleted.", size=24)
    d.save(slug, "cache-aside")

    d = Diagram("Three ways to write with a cache", "Where the write goes first decides speed, freshness and risk")
    cols = [
        (90, "Cache-aside", "sky", ["App writes DB", "App deletes cache key"], "Simple, cache only holds", "what's actually read"),
        (585, "Write-through", "green", ["App writes cache", "Cache writes DB (same request)"], "Cache always fresh,", "writes a bit slower"),
        (1080, "Write-back", "amber", ["App writes cache", "Cache flushes DB later"], "Fastest writes, but data", "is lost if cache dies first"),
    ]
    for x, name, color, steps, pro1, pro2 in cols:
        d.box(x, 190, 430, 110, name, None, color, size=32)
        d.box(x + 30, 340, 370, 100, "Step 1", [steps[0]], "gray", size=26)
        d.box(x + 30, 480, 370, 100, "Step 2", [steps[1]], "gray", size=26)
        d.arrow(x + 215, 440, x + 215, 476)
        d.note(x + 215, 640, pro1, size=24, anchor="middle", weight=600)
        d.note(x + 215, 675, pro2, size=24, anchor="middle", weight=600)
    d.note(80, 800, "Default for most read-heavy apps: cache-aside with a TTL, and delete (not update) the key on write.", size=24)
    d.save(slug, "write-strategies")


def queues():
    slug = "kafka-vs-rabbitmq-vs-sqs"

    d = Diagram("Kafka: a log that consumers read at their own pace", "Messages stay after reading; each consumer group tracks its own offset")
    d.box(80, 330, 230, 150, "Producers", ["order-service"], "sky", size=28)
    d.box(420, 200, 640, 410, "", None, "gray")
    d.note(740, 240, "Topic: orders", size=28, anchor="middle", weight=700)
    for i, y in enumerate([280, 400, 520]):
        d.note(450, y + 45, f"P{i}", size=24, weight=700)
        for j in range(7):
            d.parts.append(
                f'<rect x="{500 + j * 76}" y="{y}" width="68" height="70" rx="8" fill="#ffffff" stroke="#94a3b8" stroke-width="2"/>'
            )
            d.text(534 + j * 76, y + 45, str(j), size=22, color="#475569", mono=True)
    d.arrow(310, 405, 415, 405, "append")
    d.box(1180, 220, 340, 150, "Billing group", ["offset P0 = 6"], "green", size=26)
    d.box(1180, 450, 340, 150, "Analytics group", ["offset P0 = 2 (behind)"], "violet", size=26)
    d.arrow(1062, 330, 1176, 295, "read")
    d.arrow(1062, 480, 1176, 525, "read")
    d.note(80, 740, "Order is kept within a partition. Add partitions to scale consumers in a group.", size=24)
    d.note(80, 780, "Replay = move the offset back. Retention is by time or size, not by acknowledgement.", size=24)
    d.save(slug, "kafka-log")

    d = Diagram("RabbitMQ and SQS: queues that hand out work", "A message is gone once a consumer acknowledges (deletes) it")
    d.box(70, 340, 220, 140, "Producer", None, "sky")
    d.box(380, 320, 260, 180, "Exchange", ["routes by key", "(RabbitMQ only)"], "amber", size=28)
    d.box(760, 200, 300, 120, "Queue: emails", None, "green", size=26)
    d.box(760, 500, 300, 120, "Queue: invoices", None, "green", size=26)
    d.box(1200, 160, 300, 100, "Worker A", None, "gray", size=26)
    d.box(1200, 290, 300, 100, "Worker B", None, "gray", size=26)
    d.box(1200, 520, 300, 100, "Worker C", None, "gray", size=26)
    d.arrow(290, 410, 376, 410)
    d.arrow(640, 380, 756, 270, "email.*", label_dy=-8)
    d.arrow(640, 440, 756, 555, "invoice.*", label_dy=24)
    d.arrow(1062, 245, 1196, 215, "deliver")
    d.arrow(1062, 275, 1196, 335)
    d.arrow(1062, 560, 1196, 570, "ack = delete")
    d.note(80, 740, "SQS has no exchange: producers send straight to a queue, and consumers poll and delete.", size=24)
    d.note(80, 780, "Unacked messages come back after a timeout, so consumers must be idempotent.", size=24)
    d.save(slug, "work-queues")


def tools():
    slug = "llm-tool-calling-agent-design"
    d = Diagram("The tool-calling loop", "The model only asks for a tool. Your code runs it, checks it, and returns the result")
    d.box(70, 300, 260, 160, "User", ["\"Refund order 1182\""], "sky", size=28)
    d.box(450, 280, 340, 200, "LLM", ["sees tool schemas:", "get_order, refund_order"], "violet", size=30)
    d.box(950, 170, 380, 170, "Tool call (JSON)", ["refund_order", "{order_id: 1182}"], "amber", size=26)
    d.box(950, 500, 380, 170, "Your app runs it", ["validate args, check", "permissions, then call API"], "green", size=26)
    d.box(450, 600, 340, 120, "Answer to user", None, "sky", size=28)
    d.arrow(330, 380, 446, 380)
    d.arrow(792, 320, 946, 260, "1. request tool", label_dy=-20)
    d.arrow(1140, 342, 1140, 496, "2. execute", label_dx=95, label_dy=0)
    d.arrow(946, 590, 792, 450, "3. result", label_dx=40, label_dy=20)
    d.arrow(620, 482, 620, 596, "4. reply", label_dx=80, label_dy=0, dashed=True)
    d.note(80, 790, "Loop until the model answers instead of calling a tool. Cap the number of steps,", size=24)
    d.note(80, 826, "and ask the user before any action that changes data or moves money.", size=24)
    d.save(slug, "tool-calling-loop")


def saga():
    slug = "saga-pattern-distributed-transactions"
    d = Diagram("An orchestrated saga, with compensations", "Each step commits locally. If a later step fails, earlier steps are undone in reverse")
    steps = [("Create order", "PENDING"), ("Charge payment", "$49 captured"), ("Reserve stock", "out of stock"), ("Ship", "never runs")]
    xs = [90, 470, 850, 1230]
    for (name, sub), x, color in zip(steps, xs, ["green", "green", "red", "gray"]):
        d.box(x, 260, 290, 150, name, [sub], color, size=28, dashed=(color == "gray"))
    for a, b in zip(xs, xs[1:]):
        d.arrow(a + 292, 335, b - 4, 335)
    d.note(1000, 230, "fails", size=24, color="#dc2626", anchor="middle", weight=700)
    d.box(470, 560, 290, 140, "Refund payment", ["compensation"], "amber", size=26)
    d.box(90, 560, 290, 140, "Cancel order", ["compensation"], "amber", size=26)
    d.path("M 995 412 C 995 520, 860 630, 764 630", "1. undo", at=(905, 545))
    d.arrow(466, 630, 384, 630, "2. undo", label_dy=-22)
    d.note(80, 800, "The orchestrator stores saga state, retries steps, and runs compensations. Every step and", size=24)
    d.note(80, 836, "compensation must be idempotent, because messages can be delivered more than once.", size=24)
    d.save(slug, "orchestrated-saga")


def latency():
    slug = "reduce-llm-latency-and-cost"

    d = Diagram("Routing and streaming", "Send easy requests to a small model, and show tokens as they arrive")
    d.box(70, 330, 230, 150, "Request", None, "sky")
    d.box(390, 300, 300, 210, "Router", ["easy -> small model", "hard -> large model"], "violet", size=28)
    d.box(800, 190, 330, 160, "Small model", ["fast, cheap"], "green", size=28)
    d.box(800, 460, 330, 160, "Large model", ["slower, better"], "amber", size=28)
    d.box(1230, 320, 300, 170, "Stream tokens", ["first words appear", "before the answer ends"], "sky", size=26)
    d.arrow(300, 405, 386, 405)
    d.arrow(692, 360, 796, 280)
    d.arrow(692, 450, 796, 535)
    d.arrow(1132, 270, 1226, 370)
    d.arrow(1132, 540, 1226, 445)
    d.note(80, 720, "Also: cache repeated prompt prefixes, cap output length, and batch offline work.", size=24)
    d.note(80, 760, "Measure time to first token and cost per request before and after each change.", size=24)
    d.save(slug, "latency-levers")

    d = Diagram("Prompt caching: reuse the stable prefix", "Put what never changes first. Only the end of the prompt is new each time")
    d.note(80, 250, "Request 1", size=26, weight=700)
    d.box(80, 275, 900, 110, "System prompt + docs + examples", ["6,000 tokens, written to cache"], "amber", size=26, radius=12)
    d.box(990, 275, 300, 110, "Question", ["120 tokens"], "sky", size=26, radius=12)
    d.note(80, 470, "Request 2 (within the cache lifetime)", size=26, weight=700)
    d.box(80, 495, 900, 110, "Same prefix, read from cache", ["billed at a fraction of the price"], "green", size=26, radius=12)
    d.box(990, 495, 300, 110, "New question", ["140 tokens"], "sky", size=26, radius=12)
    d.note(1330, 340, "full price", size=24, weight=600)
    d.note(1330, 560, "cheaper and", size=24, weight=600)
    d.note(1330, 592, "faster", size=24, weight=600)
    d.note(80, 720, "Anything that changes per user (name, date, history) must go after the cached part,", size=24)
    d.note(80, 756, "or the prefix no longer matches and nothing is reused.", size=24)
    d.save(slug, "prompt-caching")


def indexing():
    slug = "database-indexing-interview-questions"

    d = Diagram("A B-tree index on users(email)", "The database walks a few sorted pages instead of scanning every row")
    d.box(640, 180, 320, 100, "Root", ["a ... m | n ... z"], "violet", size=26)
    d.box(250, 360, 320, 100, "Internal", ["a ... f | g ... m"], "sky", size=26)
    d.box(1030, 360, 320, 100, "Internal", ["n ... s | t ... z"], "sky", size=26)
    leaves = [(80, "ada@ ... bob@"), (420, "gia@ ... max@"), (860, "nia@ ... sam@"), (1200, "tom@ ... zoe@")]
    for x, s in leaves:
        d.box(x, 540, 320, 100, "Leaf", [s], "green", size=24)
    d.arrow(740, 282, 450, 356)
    d.arrow(860, 282, 1150, 356)
    d.arrow(350, 462, 240, 536)
    d.arrow(470, 462, 580, 536)
    d.arrow(1130, 462, 1020, 536)
    d.arrow(1250, 462, 1360, 536)
    d.box(420, 720, 320, 90, "Table row", ["id 42, gia@..."], "gray", size=24)
    d.arrow(580, 642, 580, 716, "row pointer", label_dx=90, label_dy=0)
    d.note(1560, 790, "Millions of rows, about 3-4 page reads per lookup", size=24, anchor="end", weight=600)
    d.save(slug, "b-tree")

    d = Diagram("Composite index: column order matters", "INDEX ON orders (customer_id, created_at)  -  the leftmost-prefix rule")
    rows = [
        ("WHERE customer_id = 7", "Uses index", "green"),
        ("WHERE customer_id = 7 AND created_at > '2026-11-01'", "Uses index (both columns)", "green"),
        ("WHERE customer_id = 7 ORDER BY created_at DESC", "Uses index, no sort needed", "green"),
        ("WHERE created_at > '2026-11-01'", "Can't use it well: skips the first column", "red"),
    ]
    for i, (q, verdict, color) in enumerate(rows):
        y = 200 + i * 140
        d.box(80, y, 900, 100, "", None, "gray", radius=12)
        d.text(110, y + 60, q, size=24, color="#0f172a", anchor="start", mono=True)
        d.box(1020, y, 500, 100, verdict, None, color, size=24, radius=12)
    d.note(80, 820, "Put equality columns first, then the range or sort column. Check with EXPLAIN.", size=24)
    d.save(slug, "composite-index")


def semantic():
    slug = "semantic-cache-llm"
    d = Diagram("Semantic cache for an LLM app", "Similar questions reuse a stored answer instead of calling the model again")
    d.box(60, 340, 260, 150, "Question", ["\"How do I reset", "my password?\""], "sky", size=26)
    d.box(410, 340, 250, 150, "Embed", ["question becomes", "a vector"], "violet", size=26)
    d.box(750, 320, 320, 190, "Vector search", ["nearest stored", "question in cache"], "amber", size=28)
    d.box(1200, 170, 330, 160, "Hit: return", ["cached answer,", "no model call"], "green", size=26)
    d.box(1200, 520, 330, 160, "Miss: call LLM", ["then store question,", "vector and answer"], "gray", size=26)
    d.arrow(320, 415, 406, 415)
    d.arrow(660, 415, 746, 415)
    d.arrow(1072, 360, 1196, 260, "similarity >= 0.92", label_dy=-18)
    d.arrow(1072, 470, 1196, 590, "below threshold", label_dy=26)
    d.path("M 1365 684 C 1365 790, 910 790, 910 514", "store", at=(1140, 748))
    d.note(80, 820, "Scope the cache per user or tenant, and expire entries when the source data changes.", size=24)
    d.save(slug, "semantic-cache-flow")


if __name__ == "__main__":
    for fn in (caching, queues, tools, saga, latency, indexing, semantic):
        fn()
    print("done")
