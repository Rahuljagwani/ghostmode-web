"""Diagrams for the Nov 16-22, 2026 posts. Run from design/blog: python3 diagrams_nov16_22.py"""

import math

from diagram import Diagram, COLORS


def circle(d, cx, cy, r, stroke="#94a3b8", width=4, fill="none"):
    d.parts.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="{width}"/>')


def dot(d, cx, cy, r, color):
    fill, stroke, _ = COLORS[color]
    d.parts.append(f'<circle cx="{cx}" cy="{cy}" r="{r}" fill="{fill}" stroke="{stroke}" stroke-width="3"/>')


def on_ring(cx, cy, r, deg):
    a = math.radians(deg - 90)
    return cx + r * math.cos(a), cy + r * math.sin(a)


# ---------- consistent hashing ----------
def hash_ring():
    slug = "consistent-hashing-explained"
    d = Diagram("The hash ring", "Each key goes to the first server clockwise from its position")
    cx, cy, r = 470, 520, 270
    circle(d, cx, cy, r)
    servers = [("A", 20, "sky"), ("B", 140, "green"), ("C", 255, "violet")]
    for name, deg, color in servers:
        x, y = on_ring(cx, cy, r, deg)
        dot(d, x, y, 46, color)
        d.text(x, y + 12, name, size=34, weight=800, color=COLORS[color][2])
    keys = [("k1", 70, "B"), ("k2", 190, "C"), ("k3", 320, "A")]
    for name, deg, _ in keys:
        x, y = on_ring(cx, cy, r, deg)
        dot(d, x, y, 22, "amber")
        lx, ly = on_ring(cx, cy, r - 70, deg)
        d.text(lx, ly + 9, name, size=24, weight=700, color="#78350f")
    d.text(cx, cy - 10, "hash space", size=24, color="#64748b")
    d.text(cx, cy + 24, "0 to 2^32", size=24, color="#64748b", mono=True)
    d.note(880, 300, "k1 goes to B, k2 goes to C, k3 goes to A.", size=28, weight=700)
    d.note(880, 380, "Add server D between A and B:", size=26, weight=600)
    d.note(880, 425, "only the keys between A and D move to D.", size=26)
    d.note(880, 505, "Remove server B:", size=26, weight=600)
    d.note(880, 550, "only B's keys move, to the next server (C).", size=26)
    d.note(880, 640, "Every other key stays where it was.", size=26, color="#16a34a", weight=700)
    d.save(slug, "hash-ring")


def mod_vs_ring():
    slug = "consistent-hashing-explained"
    d = Diagram("hash(key) % N vs a hash ring", "What happens to 1,000,000 cached keys when you go from 4 to 5 servers")
    d.box(90, 230, 660, 300, "hash(key) % N", ["N changes from 4 to 5,", "so most keys map to a new server.", "About 80% of keys move."], "red", size=36)
    d.box(850, 230, 660, 300, "Hash ring", ["The new server takes one slice", "of the ring. About 1/5 of keys", "move (roughly 1/N)."], "green", size=36)
    d.note(90, 640, "With a cache, every moved key is a cache miss that hits the database at once.", size=26, weight=600)
    d.note(90, 690, "Virtual nodes: give each server many points on the ring (for example 100 to 200),", size=26)
    d.note(90, 735, "so load spreads evenly and a leaving server's keys spread over all the others.", size=26)
    d.save(slug, "mod-vs-ring")


# ---------- URL shortener ----------
def shortener_arch():
    slug = "url-shortener-system-design"
    d = Diagram("URL shortener: high-level design", "Reads (redirects) outnumber writes, so the read path is built around the cache")
    d.box(60, 380, 220, 130, "Client", ["browser / app"], "gray", size=30)
    d.box(360, 380, 240, 130, "Load", ["balancer"], "gray", size=30)
    d.box(680, 380, 260, 130, "API service", ["stateless"], "sky", size=30)
    d.box(1040, 220, 280, 130, "Cache", ["code -> long URL"], "amber", size=30)
    d.box(1040, 540, 280, 130, "Database", ["code, URL, owner,", "expiry"], "violet", size=30)
    d.box(680, 640, 260, 130, "ID generator", ["counter ranges"], "green", size=30)
    d.arrow(282, 445, 356, 445)
    d.arrow(602, 445, 676, 445)
    d.arrow(940, 410, 1036, 300, "1. read", label_dy=-10, label_dx=-20)
    d.arrow(940, 480, 1036, 590, "2. on miss", label_dy=10, label_dx=-30)
    d.arrow(810, 512, 810, 636, "new code", label_dx=-80, label_dy=10)
    d.text(1360, 300, "GET /aB3x9Kq", size=22, anchor="start", mono=True)
    d.text(1360, 335, "-> 302 redirect", size=22, anchor="start", mono=True)
    d.text(1360, 600, "POST /shorten", size=22, anchor="start", mono=True)
    d.text(1360, 635, "-> new code", size=22, anchor="start", mono=True)
    d.save(slug, "architecture")


def shortener_ids():
    slug = "url-shortener-system-design"
    d = Diagram("Generating short codes without collisions", "Each API server takes a block of numbers, then encodes each number in base62")
    d.box(80, 230, 380, 170, "Counter service", ["hands out blocks", "of 1,000 IDs"], "green", size=32)
    d.box(620, 200, 330, 110, "Server 1", ["IDs 1,000,000-1,000,999"], "sky", size=28)
    d.box(620, 340, 330, 110, "Server 2", ["IDs 1,001,000-1,001,999"], "sky", size=28)
    d.arrow(462, 290, 616, 255)
    d.arrow(462, 340, 616, 395)
    d.box(1100, 250, 420, 170, "base62(1,000,123)", ["= \"4cb1\"", "alphabet 0-9, a-z, A-Z"], "amber", size=30)
    d.arrow(952, 330, 1096, 330, "encode")
    d.note(80, 560, "7 base62 characters give 62^7, about 3.5 trillion codes.", size=28, weight=700)
    d.note(80, 620, "No collision checks: every number is used once.", size=26)
    d.note(80, 670, "A crashed server only wastes the rest of its block.", size=26)
    d.note(80, 720, "Sequential codes are guessable: shuffle the number first if links must not be enumerable.", size=26)
    d.save(slug, "id-generation")


# ---------- vector databases ----------
def vector_query():
    slug = "vector-database-interview-questions"
    d = Diagram("How a vector search query runs", "Approximate search gives speed; filters and re-ranking give accuracy")
    steps = [("Embed", ["query -> vector"], "sky"), ("ANN index", ["HNSW / IVF", "top 100"], "violet"),
             ("Filter", ["tenant, date,", "permissions"], "amber"), ("Re-rank", ["cross-encoder", "top 5"], "green")]
    x = 70
    for i, (label, sub, color) in enumerate(steps):
        d.box(x, 330, 300, 180, label, sub, color, size=34)
        if i < len(steps) - 1:
            d.arrow(x + 302, 420, x + 376, 420)
        x += 380
    d.note(70, 640, "Approximate nearest neighbour (ANN) search trades a little recall for big speed.", size=26, weight=600)
    d.note(70, 690, "Filtering after the search can leave too few results; filter during the search if the store supports it.", size=24)
    d.note(70, 735, "Measure recall@k against exact (brute-force) search on a sample of real queries.", size=24)
    d.save(slug, "query-flow")


def vector_indexes():
    slug = "vector-database-interview-questions"
    d = Diagram("Vector index types at a glance", "There's no best index, only the right trade-off for your data size and latency")
    rows = [("Flat", "exact search, scans every vector", "small data, or ground truth for tests", "gray"),
            ("IVF", "clusters vectors, searches the nearest few", "large data, fast builds, tune nprobe", "sky"),
            ("HNSW", "layered graph, greedy walk to neighbours", "low latency, high recall, more memory", "violet"),
            ("PQ", "compresses vectors into short codes", "huge data that must fit in memory", "amber")]
    y = 200
    for name, how, when, color in rows:
        d.box(80, y, 220, 120, name, None, color, size=36)
        d.note(340, y + 55, how, size=26, weight=600)
        d.note(340, y + 95, "Use for: " + when, size=24, color="#475569")
        y += 150
    d.save(slug, "index-types")


# ---------- SQL vs NoSQL ----------
def sql_nosql():
    slug = "sql-vs-nosql-system-design"
    d = Diagram("SQL or NoSQL? A quick decision path", "Start from the access patterns, not the brand name")
    d.box(560, 180, 480, 120, "Do you need joins or", ["multi-row transactions?"], "gray", size=30)
    d.box(120, 420, 420, 130, "Relational (SQL)", ["Postgres, MySQL"], "sky", size=32)
    d.box(1060, 400, 460, 150, "Are the access patterns", ["known and key-based", "at very high scale?"], "gray", size=28)
    d.box(820, 680, 340, 130, "Key-value / wide-column", ["DynamoDB, Cassandra"], "violet", size=26)
    d.box(1220, 680, 330, 130, "Start with SQL", ["it scales further", "than most need"], "sky", size=28)
    d.arrow(700, 302, 400, 416, "yes", label_dx=-20)
    d.arrow(900, 302, 1200, 396, "no", label_dx=20)
    d.arrow(1200, 552, 1000, 676, "yes", label_dx=-30)
    d.arrow(1380, 552, 1385, 676, "no", label_dx=30, label_dy=0)
    d.note(120, 640, "Documents with flexible", size=22)
    d.note(120, 672, "shape: MongoDB or JSONB", size=22)
    d.note(120, 704, "columns in Postgres.", size=22)
    d.save(slug, "decision-path")


# ---------- fine-tuning vs RAG ----------
def ft_vs_rag():
    slug = "fine-tuning-vs-rag"
    d = Diagram("Fine-tuning vs RAG: what each one changes", "RAG changes what the model knows right now; fine-tuning changes how it behaves")
    d.box(90, 210, 640, 420, "RAG", ["fetches documents at question time", "", "+ fresh, private, changing data", "+ can cite sources", "+ update by re-indexing, no training", "- adds retrieval latency", "- only as good as the search"], "sky", size=36)
    d.box(870, 210, 640, 420, "Fine-tuning", ["trains on examples of the task", "", "+ format, tone, style, labels", "+ shorter prompts, smaller models", "+ narrow, repeated tasks", "- needs good training data", "- knowledge goes stale"], "violet", size=36)
    d.note(90, 720, "Common answer: start with prompting, add RAG for knowledge, fine-tune for behaviour. Many systems use both.", size=26, weight=600)
    d.save(slug, "rag-vs-fine-tuning")


# ---------- notification system ----------
def notifications():
    slug = "notification-system-design"
    d = Diagram("Notification system: high-level design", "Accept fast, deliver asynchronously, one queue per channel")
    d.box(50, 380, 230, 130, "Services", ["orders, chat,", "marketing"], "gray", size=28)
    d.box(350, 380, 280, 130, "Notification", ["API"], "sky", size=30)
    d.box(350, 180, 280, 120, "Preferences", ["opt-outs, quiet hrs"], "amber", size=26)
    d.box(350, 600, 280, 120, "Dedup + limits", ["idempotency key"], "amber", size=26)
    d.box(720, 380, 230, 130, "Queues", ["one per", "channel"], "violet", size=30)
    d.box(1030, 380, 230, 130, "Workers", ["retry with", "backoff"], "green", size=30)
    for i, (name, sub) in enumerate([("Push", "APNs / FCM"), ("Email", "provider"), ("SMS", "provider")]):
        d.box(1340, 230 + i * 160, 220, 120, name, [sub], "sky", size=28)
        d.arrow(1262, 445, 1336, 290 + i * 160)
    d.arrow(282, 445, 346, 445)
    d.arrow(490, 378, 490, 304, both=True)
    d.arrow(490, 512, 490, 596, both=True)
    d.arrow(632, 445, 716, 445)
    d.arrow(952, 445, 1026, 445)
    d.note(50, 810, "Failed sends retry with backoff, then go to a dead-letter queue. Delivery status is stored for every message.", size=24)
    d.save(slug, "architecture")


# ---------- greatest weakness ----------
def weakness():
    slug = "greatest-weakness-interview-answer"
    d = Diagram("A 3-part answer to \"What is your greatest weakness?\"", "About 45 to 60 seconds, real, and pointing at progress")
    parts = [("1. The weakness", ["real, specific,", "not core to the job"], "red"),
             ("2. The proof", ["one moment it", "actually cost you"], "amber"),
             ("3. The fix", ["what you changed,", "and the result"], "green")]
    x = 90
    for i, (label, sub, color) in enumerate(parts):
        d.box(x, 260, 400, 220, label, sub, color, size=34)
        if i < 2:
            d.arrow(x + 402, 370, x + 516, 370)
        x += 520
    d.note(90, 610, "Avoid: \"I'm a perfectionist\", \"I work too hard\", or a weakness that is the core skill of the role.", size=26, weight=600)
    d.note(90, 660, "End on the improvement, not the problem.", size=26)
    d.save(slug, "answer-structure")


if __name__ == "__main__":
    hash_ring()
    mod_vs_ring()
    shortener_arch()
    shortener_ids()
    vector_query()
    vector_indexes()
    sql_nosql()
    ft_vs_rag()
    notifications()
    weakness()
    print("done")
