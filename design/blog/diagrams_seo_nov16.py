"""Diagrams for the Nov 16, 2026 search-demand posts. Run from design/blog: python3 diagrams_seo_nov16.py
Competitor prices: Cluely from cluely.com/pricing (Nov 16, 2026); the others from the pages checked on Nov 6, 2026
(see the comments in src/app/*-alternative/page.tsx)."""

from diagram import Diagram, COLORS


def bars(d, rows, x0=420, y0=200, bar_h=62, gap=26, max_val=300, width=1000):
    for i, (label, value, text, color) in enumerate(rows):
        y = y0 + i * (bar_h + gap)
        d.note(x0 - 24, y + bar_h / 2 + 9, label, size=26, anchor="end", weight=600)
        w = max(8, width * value / max_val)
        fill, stroke, ink = COLORS[color]
        d.parts.append(f'<rect x="{x0}" y="{y}" width="{w}" height="{bar_h}" rx="10" fill="{fill}" stroke="{stroke}" stroke-width="3"/>')
        d.note(x0 + w + 18, y + bar_h / 2 + 9, text, size=24, weight=700, color=ink)


def pricing_one_month():
    slug = "ai-interview-copilot-pricing"
    d = Diagram("Cheapest way to get live interview help for one month", "Lowest price you can pay to use each tool live, without committing to a longer plan (USD, Nov 2026)")
    rows = [
        ("Ghost by Renekin AI", 10, "$10 once (200 credits, 3-4 interviews)", "green"),
        ("ParakeetAI", 25, "$25 for 1 credit (1 hour)", "sky"),
        ("LockedIn AI", 66, "about $66 (promo; about $132 regular)", "sky"),
        ("Cluely (hidden on screen share)", 149.99, "$149.99 a month", "sky"),
        ("Final Round AI", 150, "$150 a month", "sky"),
        ("Interview Coder", 299, "$299 a month", "sky"),
    ]
    bars(d, rows, x0=520, max_val=300, width=760)
    d.note(80, 790, "Prices change often and can vary by country and promotion. Check each site before buying.", size=22, color="#64748b")
    d.save(slug, "cheapest-month")


def cost_per_interview():
    slug = "ai-interview-copilot-pricing"
    d = Diagram("What a few interviews actually cost", "Example: 4 one-hour interviews in one month, using the cheapest option that covers them")
    rows = [
        ("Ghost (450 credits, $19)", 19, "$19 once, credits left over", "green"),
        ("ParakeetAI (4 credits)", 64, "$64 (3 for $39 + 1 for $25)", "sky"),
        ("LockedIn AI (1 month)", 66, "about $66 with promo", "sky"),
        ("Cluely Pro + Undetectability", 149.99, "$149.99", "sky"),
        ("Final Round AI (monthly)", 150, "$150", "sky"),
    ]
    bars(d, rows, x0=520, max_val=200, width=760)
    d.note(80, 720, "Ghost charges per question: a typical interview uses 50 to 60 credits, about $2 to $3.", size=24, weight=600)
    d.note(80, 765, "Subscriptions cost the same whether you have 1 interview that month or 20.", size=24)
    d.save(slug, "four-interviews")


def cluely_plans():
    slug = "cluely-pricing"
    d = Diagram("Cluely's plans at a glance", "From cluely.com/pricing, checked November 16, 2026")
    d.box(80, 220, 440, 360, "Starter", ["Free", "", "limited AI responses", "limited notetaking", "not hidden on", "screen share"], "gray", size=34)
    d.box(580, 220, 440, 360, "Pro", ["$19.99 a month", "", "unlimited responses", "and notetaking", "not hidden on", "screen share"], "sky", size=34)
    d.box(1080, 220, 440, 360, "Pro + Undetectability", ["$149.99 a month", "", "everything in Pro", "plus hidden from", "screen sharing", ""], "violet", size=32)
    d.note(80, 680, "Staying hidden while you share your screen is only on the $149.99 plan.", size=28, weight=700)
    d.note(80, 730, "The page title also mentions Pro \"from $11.99/mo\", which usually means billed annually.", size=24)
    d.save(slug, "plans")


def bullet_formula():
    slug = "resume-bullet-points-examples"
    d = Diagram("The resume bullet point formula", "Action verb + what you did + how + measurable result")
    parts = [("Action verb", ["Built, cut, led,", "automated"], "sky"), ("What", ["the task or", "system"], "violet"),
             ("How", ["tools, approach,", "scope"], "amber"), ("Result", ["a number:", "%, time, $, users"], "green")]
    x = 80
    for i, (label, sub, color) in enumerate(parts):
        d.box(x, 230, 320, 180, label, sub, color, size=34)
        if i < 3:
            d.arrow(x + 322, 320, x + 376, 320)
        x += 380
    d.note(80, 530, "Before:", size=26, weight=700, color="#dc2626")
    d.note(200, 530, "Responsible for the checkout API.", size=26)
    d.note(80, 590, "After:", size=26, weight=700, color="#16a34a")
    d.note(200, 590, "Rebuilt the checkout API with Redis caching and async payment calls,", size=26)
    d.note(200, 630, "cutting p95 latency from 900 ms to 250 ms during peak sales.", size=26)
    d.save(slug, "formula")


if __name__ == "__main__":
    pricing_one_month()
    cost_per_interview()
    cluely_plans()
    bullet_formula()
    print("done")
