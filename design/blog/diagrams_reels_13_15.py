"""Diagrams for the posts matching reels #13 to #15: hot-key-problem-redis, cursor-pagination-vs-offset,
llm-chatbot-memory. Run: python3 design/blog/diagrams_reels_13_15.py"""

from diagram import Diagram


def hot_key_problem():
    d = Diagram("The hot key problem", "Every read of one key lands on the same shard, however many nodes you add")
    d.box(80, 330, 300, 170, "App servers", ["millions of reads", "of post:42"], "sky", size=30)
    d.box(620, 230, 360, 130, "Shard A", ["post:42 lives here", "100% CPU"], "red", size=30)
    d.box(620, 400, 360, 110, "Shard B", ["idle"], "gray", size=28)
    d.box(620, 550, 360, 110, "Shard C (new)", ["idle"], "gray", size=28, dashed=True)
    d.arrow(382, 400, 616, 300, "all traffic", label_dy=-20)
    d.note(1040, 300, "A key maps to one hash slot,", size=24, weight=600)
    d.note(1040, 336, "and one slot to one shard.", size=24, weight=600)
    d.note(1040, 400, "Adding shards spreads keys,", size=24)
    d.note(1040, 436, "not the traffic of one key.", size=24)
    d.note(80, 790, "Redis Cluster: 16,384 hash slots, each served by one master (replicas can serve reads).", size=20, color="#94a3b8")
    d.save("hot-key-problem-redis", "hot-key-problem")


def hot_key_fixes():
    d = Diagram("Two ways to spread a hot key", "A local copy absorbs most reads; key copies spread the rest across shards")
    d.box(80, 300, 300, 200, "App server", ["in-memory copy", "TTL 1-2 s"], "green", size=30)
    d.arrow(382, 400, 560, 400, "miss only", label_dy=-22)
    d.box(565, 230, 420, 100, "post:42:1 on shard A", None, "sky", size=26)
    d.box(565, 350, 420, 100, "post:42:2 on shard B", None, "sky", size=26)
    d.box(565, 470, 420, 100, "post:42:3 on shard C", None, "sky", size=26)
    d.note(1040, 300, "Read a random copy.", size=24, weight=600)
    d.note(1040, 340, "Write or delete all copies", size=24)
    d.note(1040, 376, "when the value changes.", size=24)
    d.note(1040, 450, "On expiry, one request", size=24, weight=600)
    d.note(1040, 486, "rebuilds; the rest wait.", size=24, weight=600)
    d.note(80, 790, "Most reads stop at the app server. The few that reach Redis are spread over several shards.", size=22)
    d.save("hot-key-problem-redis", "hot-key-fixes")


def offset_vs_cursor():
    d = Diagram("OFFSET vs cursor pagination", "Same page 10,001, very different work")
    d.box(80, 260, 680, 200, "OFFSET 200000 LIMIT 20", ["reads 200,020 rows", "throws away 200,000"], "red", size=32)
    d.box(840, 260, 680, 200, "WHERE id > :last_id LIMIT 20", ["jumps to the cursor in the index", "reads 20 rows"], "green", size=30)
    d.note(80, 540, "Cost grows with page depth.", size=26, weight=600)
    d.note(840, 540, "Cost is the same on every page.", size=26, weight=600)
    d.note(80, 640, "Trade-off: cursors can't jump to page 7,431. Most feeds and infinite scroll don't need to.", size=24)
    d.note(80, 790, "PostgreSQL manual: rows skipped by OFFSET still have to be computed inside the server.", size=20, color="#94a3b8")
    d.save("cursor-pagination-vs-offset", "offset-vs-cursor")


def tie_breaker():
    d = Diagram("Why the cursor needs a tie-breaker", "Two rows with the same created_at sit on a page boundary")
    rows = [("10:00:05", "id 91"), ("10:00:04", "id 88"), ("10:00:04", "id 87"), ("10:00:03", "id 80")]
    for i, (t, idn) in enumerate(rows):
        color = "amber" if t == "10:00:04" else "gray"
        d.box(80, 220 + i * 105, 420, 85, f"{t}  {idn}", None, color, size=26)
    d.text(515, 428, "< page 1 ends", size=20, color="#d97706", weight=700, anchor="start")
    d.note(720, 280, "Cursor on created_at only:", size=26, weight=600)
    d.note(720, 320, "WHERE created_at < '10:00:04' skips id 87.", size=24, color="#dc2626")
    d.note(720, 430, "Cursor on (created_at, id):", size=26, weight=600)
    d.note(720, 470, "WHERE (created_at, id) < ('10:00:04', 88)", size=24, color="#16a34a")
    d.note(720, 506, "returns id 87 next. Nothing skipped or repeated.", size=24)
    d.note(720, 600, "Index: (created_at, id), same order as the sort.", size=24)
    d.save("cursor-pagination-vs-offset", "tie-breaker")


def chatbot_memory():
    d = Diagram("What goes into each request", "A bounded prompt instead of the whole conversation")
    d.box(80, 230, 330, 110, "System prompt", None, "gray", size=28)
    d.box(80, 360, 330, 110, "Key facts", ["retrieved for this turn"], "violet", size=28)
    d.box(80, 490, 330, 110, "Running summary", ["of older turns"], "amber", size=28)
    d.box(80, 620, 330, 110, "Last few turns", ["word for word"], "sky", size=28)
    d.arrow(412, 480, 600, 480, "prompt", label_dy=-22)
    d.box(605, 400, 300, 160, "LLM", ["reply"], "green", size=34)
    d.arrow(907, 480, 1080, 480, "after the turn", label_dy=-22)
    d.box(1085, 300, 430, 130, "Update summary", ["every few turns, cheaper model"], "amber", size=26)
    d.box(1085, 520, 430, 130, "Extract new facts", ["name, goals, preferences"], "violet", size=26)
    d.note(80, 800, "Tokens per turn stay roughly flat instead of growing with every message.", size=22)
    d.save("llm-chatbot-memory", "memory-layers")


if __name__ == "__main__":
    hot_key_problem()
    hot_key_fixes()
    offset_vs_cursor()
    tie_breaker()
    chatbot_memory()
    print("done")
