"""Diagrams for the Nov 23-29, 2026 posts. Run from design/blog: python3 diagrams_nov23_29.py"""

from diagram import Diagram, COLORS


def lane(d, y, label, color):
    """A horizontal timeline lane with a label on the left."""
    d.text(80, y + 8, label, size=26, weight=700, anchor="start", color=COLORS[color][2])
    d.parts.append(f'<line x1="330" y1="{y}" x2="1520" y2="{y}" stroke="#cbd5e1" stroke-width="3"/>')


# ---------- WebSockets vs SSE vs long polling ----------
def realtime_patterns():
    slug = "websockets-vs-sse-vs-long-polling"
    d = Diagram("Three ways to push updates to the browser", "What travels over the network, from left to right in time")
    # Long polling
    lane(d, 250, "Long polling", "amber")
    for x in (360, 700, 1040):
        d.arrow(x, 250, x + 40, 300, color="#d97706")
        d.parts.append(f'<rect x="{x + 40}" y="290" width="220" height="20" rx="10" fill="#fef3c7" stroke="#d97706" stroke-width="2"/>')
        d.arrow(x + 260, 300, x + 300, 250, color="#d97706")
    d.note(360, 350, "request waits on the server until there's news (or a timeout), then the client asks again", size=22)
    # SSE
    lane(d, 470, "SSE", "green")
    d.arrow(360, 470, 400, 520, color="#16a34a")
    d.parts.append('<rect x="400" y="510" width="1100" height="20" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>')
    for x in (560, 820, 1080, 1340):
        d.arrow(x, 510, x, 478, color="#16a34a")
    d.note(360, 570, "one long HTTP response; the server sends events down it whenever it wants (one direction)", size=22)
    # WebSocket
    lane(d, 690, "WebSocket", "violet")
    d.arrow(360, 690, 400, 740, color="#7c3aed")
    d.parts.append('<rect x="400" y="730" width="1100" height="20" rx="10" fill="#ede9fe" stroke="#7c3aed" stroke-width="2"/>')
    for x in (560, 1080):
        d.arrow(x, 730, x, 698, color="#7c3aed")
    for x in (820, 1340):
        d.arrow(x, 698, x, 728, color="#7c3aed")
    d.note(360, 790, "HTTP upgrade (101), then one TCP connection; both sides send messages at any time", size=22)
    d.save(slug, "patterns")


def realtime_choice():
    slug = "websockets-vs-sse-vs-long-polling"
    d = Diagram("Which one should you use?", "Start from who needs to send messages, and how often")
    d.box(80, 230, 440, 420, "Long polling", ["Updates are rare,", "or nothing else works", "", "Simple, works", "everywhere", "Extra requests", "and latency"], "amber", size=32)
    d.box(580, 230, 440, 420, "SSE", ["Server to client only:", "feeds, notifications,", "LLM token streaming", "", "Plain HTTP,", "auto-reconnect", "Text only, one way"], "green", size=32)
    d.box(1080, 230, 440, 420, "WebSocket", ["Both sides talk often:", "chat, multiplayer,", "collaborative editing", "", "Low latency,", "two-way, binary", "Stateful to scale"], "violet", size=32)
    d.note(80, 730, "Rule of thumb: if the client only listens, use SSE. If it talks back often, use WebSockets.", size=26, weight=700)
    d.save(slug, "choice")


# ---------- AI agents ----------
def agent_loop():
    slug = "ai-agent-interview-questions"
    d = Diagram("The agent loop", "The model decides the next step; your code runs it and feeds the result back")
    d.box(80, 360, 260, 150, "Goal", ["user request"], "gray", size=30)
    d.box(440, 250, 320, 150, "LLM decides", ["answer, or call", "a tool?"], "sky", size=30)
    d.box(880, 250, 320, 150, "Run the tool", ["your code:", "API, DB, search"], "amber", size=30)
    d.box(880, 520, 320, 150, "Observation", ["tool result added", "to the context"], "violet", size=30)
    d.box(440, 520, 320, 150, "Final answer", ["when the goal", "is met"], "green", size=30)
    d.arrow(342, 435, 436, 340)
    d.arrow(762, 325, 876, 325, "tool call", label_dy=-30)
    d.arrow(1040, 402, 1040, 516)
    d.path("M 876 595 C 820 595 800 470 765 400", "next step", at=(830, 500))
    d.arrow(600, 402, 600, 516, "done", label_dx=40, label_dy=0)
    d.note(1250, 300, "Guardrails around the loop:", size=24, weight=700)
    for i, line in enumerate(["max steps and budget", "allowed tools only", "validate tool inputs", "approval for risky actions", "log every step"]):
        d.note(1250, 345 + i * 40, "- " + line, size=22)
    d.save(slug, "agent-loop")


# ---------- Chat system ----------
def chat_arch():
    slug = "chat-system-design"
    d = Diagram("Chat app: high-level design", "Long-lived connections on gateways; messages stored once, then routed to the receiver")
    d.box(60, 250, 220, 120, "Alice", ["phone"], "gray", size=30)
    d.box(60, 560, 220, 120, "Bob", ["laptop"], "gray", size=30)
    d.box(380, 250, 280, 120, "Gateway 1", ["WebSocket"], "sky", size=30)
    d.box(380, 560, 280, 120, "Gateway 2", ["WebSocket"], "sky", size=30)
    d.box(700, 400, 260, 130, "Chat service", ["IDs, store, route"], "violet", size=30)
    d.box(1190, 210, 340, 130, "Message store", ["by conversation, in order"], "amber", size=28)
    d.box(1190, 400, 340, 130, "Session registry", ["user -> gateway"], "green", size=28)
    d.box(1190, 590, 340, 130, "Push service", ["if receiver offline"], "red", size=28)
    d.arrow(282, 310, 376, 310, both=True)
    d.arrow(282, 620, 376, 620, both=True)
    d.arrow(662, 340, 696, 420, "1. send", label_dx=60, label_dy=-6)
    d.arrow(962, 420, 1186, 290, "2. save", label_dx=-10, label_dy=-8)
    d.arrow(962, 465, 1186, 465, "3. where is Bob?", label_dy=-22)
    d.arrow(696, 510, 662, 590, "4. deliver", label_dx=70, label_dy=14)
    d.arrow(962, 510, 1186, 640, "else push", label_dx=-10, label_dy=22)
    d.save(slug, "architecture")


def chat_states():
    slug = "chat-system-design"
    d = Diagram("Message delivery states", "Each tick is an acknowledgement travelling back to the sender")
    steps = [("Sending", ["on the phone,", "not saved yet"], "gray"), ("Sent", ["server saved it", "and gave it an ID"], "sky"),
             ("Delivered", ["receiver's device", "acknowledged it"], "violet"), ("Read", ["receiver opened", "the conversation"], "green")]
    x = 80
    for i, (label, sub, color) in enumerate(steps):
        d.box(x, 300, 320, 200, label, sub, color, size=34)
        if i < 3:
            d.arrow(x + 322, 400, x + 376, 400)
        x += 380
    d.note(80, 600, "Retries are safe because the client sends a client message ID: the server ignores repeats.", size=26, weight=600)
    d.note(80, 650, "Offline receiver: the message waits in the store and a push notification wakes the app.", size=26)
    d.save(slug, "delivery-states")


# ---------- Questions to ask ----------
def questions_by_round():
    slug = "questions-to-ask-the-interviewer"
    d = Diagram("Match your questions to the person in front of you", "Each round can answer different things")
    cols = [("Recruiter", ["process and timeline", "team and level", "salary range"], "gray"),
            ("Hiring manager", ["what success looks like", "biggest challenge now", "how the team works"], "sky"),
            ("Engineers", ["a normal week", "code review, deploys", "on-call, tech debt"], "violet"),
            ("Final / leadership", ["direction for the year", "how you'd grow here", "what worries them"], "green")]
    x = 80
    for label, sub, color in cols:
        d.box(x, 250, 340, 340, label, sub, color, size=32)
        x += 370
    d.note(80, 690, "Ask 2 or 3 questions per round. Skip anything the job post or website already answers.", size=26, weight=700)
    d.save(slug, "by-round")


# ---------- Distributed locks ----------
def fencing():
    slug = "distributed-locks-explained"
    d = Diagram("Why a lock with a timeout isn't enough", "Client 1 pauses, its lock expires, and two clients think they hold it. Fencing tokens fix this.")
    lane(d, 280, "Client 1", "sky")
    lane(d, 470, "Client 2", "violet")
    lane(d, 660, "Storage", "amber")
    d.parts.append('<rect x="360" y="262" width="160" height="36" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>')
    d.text(440, 287, "lock, token 33", size=20, weight=700, color="#14532d")
    d.parts.append('<rect x="540" y="262" width="740" height="36" rx="10" fill="#fee2e2" stroke="#dc2626" stroke-width="2"/>')
    d.text(910, 287, "long GC pause (its lock expires meanwhile)", size=20, weight=700, color="#7f1d1d")
    d.parts.append('<rect x="950" y="452" width="170" height="36" rx="10" fill="#dcfce7" stroke="#16a34a" stroke-width="2"/>')
    d.text(1035, 477, "lock, token 34", size=20, weight=700, color="#14532d")
    d.arrow(1140, 480, 1140, 648, "write, 34", label_dx=70, label_dy=0)
    d.arrow(1300, 290, 1300, 648, "write, 33", label_dx=70, label_dy=40)
    d.text(1140, 720, "accepted", size=22, weight=700, color="#16a34a")
    d.text(1300, 720, "rejected: 33 < 34", size=22, weight=700, color="#dc2626")
    d.note(80, 800, "The storage keeps the highest token it has seen and refuses older ones.", size=24, weight=600)
    d.save(slug, "fencing-token")


# ---------- Prompt engineering ----------
def prompt_anatomy():
    slug = "prompt-engineering-interview-questions"
    d = Diagram("Anatomy of a production prompt", "Stable parts first (cacheable), the changing input last")
    rows = [("Role and task", "You are a support assistant for an online bank...", "sky"),
            ("Rules", "Answer only from the context. If unsure, say so...", "violet"),
            ("Examples", "2 or 3 short input -> output pairs", "green"),
            ("Context", "retrieved documents, user profile", "amber"),
            ("Input", "the user's question", "gray"),
            ("Output format", "JSON schema or exact headings", "red")]
    y = 190
    for label, sub, color in rows:
        fill, stroke, ink = COLORS[color]
        d.parts.append(f'<rect x="80" y="{y}" width="1440" height="88" rx="14" fill="{fill}" stroke="{stroke}" stroke-width="3"/>')
        d.text(110, y + 54, label, size=28, weight=700, anchor="start", color=ink)
        d.text(440, y + 54, sub, size=24, anchor="start", color=ink)
        y += 104
    d.save(slug, "anatomy")


# ---------- Salary ----------
def salary_range():
    slug = "salary-expectations-interview-answer"
    d = Diagram("The range method", "Research the market, then give a range whose bottom you'd happily accept")
    d.parts.append('<rect x="160" y="330" width="1280" height="40" rx="20" fill="#f1f5f9" stroke="#94a3b8" stroke-width="2"/>')
    d.parts.append('<rect x="760" y="330" width="440" height="40" rx="20" fill="#dcfce7" stroke="#16a34a" stroke-width="3"/>')
    for x, label in ((160, "low end of market"), (800, "market median"), (1440, "high end of market")):
        d.parts.append(f'<line x1="{x}" y1="300" x2="{x}" y2="400" stroke="#64748b" stroke-width="3"/>')
        d.text(x, 440, label, size=22, color="#475569")
    d.text(980, 300, "your range", size=26, weight=800, color="#14532d")
    d.note(160, 540, "1. Research: the job post range, salary sites, people in similar roles.", size=26)
    d.note(160, 590, "2. Set your floor: the lowest number you'd accept without regret.", size=26)
    d.note(160, 640, "3. Range = floor to about 15-20% above it, placed around or above the median.", size=26)
    d.note(160, 690, "4. Say it once, calmly, then talk about the whole package.", size=26)
    d.save(slug, "range-method")


if __name__ == "__main__":
    realtime_patterns()
    realtime_choice()
    agent_loop()
    chat_arch()
    chat_states()
    questions_by_round()
    fencing()
    prompt_anatomy()
    salary_range()
    print("done")
