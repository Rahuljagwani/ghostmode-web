"""Tiny SVG diagram kit for blog posts. Every diagram is 1600x900 (the size markdown.ts reserves).

Usage: each diagrams_*.py file builds Diagram objects and calls .save(slug, name). save() writes the SVG
source next to this file and a PNG (via rsvg-convert) into public/blog-images/<slug>/<name>.png.
"""

import os
import subprocess
from html import escape

W, H = 1600, 900
FONT = "Helvetica Neue, Helvetica, Arial, sans-serif"
MONO = "Menlo, Monaco, monospace"

# Palette: one accent per role, plus neutrals.
COLORS = {
    "sky": ("#e0f2fe", "#0284c7", "#0c4a6e"),
    "green": ("#dcfce7", "#16a34a", "#14532d"),
    "amber": ("#fef3c7", "#d97706", "#78350f"),
    "red": ("#fee2e2", "#dc2626", "#7f1d1d"),
    "violet": ("#ede9fe", "#7c3aed", "#4c1d95"),
    "gray": ("#f1f5f9", "#64748b", "#0f172a"),
}

HERE = os.path.dirname(os.path.abspath(__file__))
PUBLIC = os.path.join(HERE, "..", "..", "public", "blog-images")


class Diagram:
    def __init__(self, title, subtitle=None):
        self.parts = []
        self.title = title
        self.subtitle = subtitle

    def text(self, x, y, s, size=24, weight=400, color="#0f172a", anchor="middle", mono=False):
        fam = MONO if mono else FONT
        self.parts.append(
            f'<text x="{x}" y="{y}" font-family="{fam}" font-size="{size}" font-weight="{weight}" '
            f'fill="{color}" text-anchor="{anchor}">{escape(s)}</text>'
        )

    def box(self, x, y, w, h, label, sub=None, color="sky", size=28, radius=18, dashed=False):
        fill, stroke, ink = COLORS[color]
        dash = ' stroke-dasharray="10 8"' if dashed else ""
        self.parts.append(
            f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{radius}" fill="{fill}" '
            f'stroke="{stroke}" stroke-width="3"{dash}/>'
        )
        lines = sub if isinstance(sub, list) else ([sub] if sub else [])
        total = size + len(lines) * (size * 0.95)
        ty = y + h / 2 - total / 2 + size * 0.85
        self.text(x + w / 2, ty, label, size=size, weight=700, color=ink)
        for i, line in enumerate(lines):
            self.text(x + w / 2, ty + (i + 1) * size * 0.95, line, size=int(size * 0.78), color=ink)

    def arrow(self, x1, y1, x2, y2, label=None, color="#475569", dashed=False, label_dx=0, label_dy=-14, both=False):
        dash = ' stroke-dasharray="10 8"' if dashed else ""
        start = ' marker-start="url(#head)"' if both else ""
        self.parts.append(
            f'<line x1="{x1}" y1="{y1}" x2="{x2}" y2="{y2}" stroke="{color}" stroke-width="3.5"{dash}{start} '
            f'marker-end="url(#head)"/>'
        )
        if label:
            mx, my = (x1 + x2) / 2 + label_dx, (y1 + y2) / 2 + label_dy
            self.pill(mx, my, label)

    def path(self, d, label=None, at=None, color="#475569", dashed=False):
        dash = ' stroke-dasharray="10 8"' if dashed else ""
        self.parts.append(
            f'<path d="{d}" fill="none" stroke="{color}" stroke-width="3.5"{dash} marker-end="url(#head)"/>'
        )
        if label and at:
            self.pill(at[0], at[1], label)

    def pill(self, cx, cy, s, size=20):
        w = len(s) * size * 0.56 + 28
        self.parts.append(
            f'<rect x="{cx - w / 2}" y="{cy - size}" width="{w}" height="{size * 1.6}" rx="{size * 0.8}" '
            f'fill="#ffffff" stroke="#cbd5e1" stroke-width="2"/>'
        )
        self.text(cx, cy + size * 0.32, s, size=size, weight=600, color="#334155")

    def note(self, x, y, s, size=22, color="#475569", anchor="start", weight=400):
        self.text(x, y, s, size=size, color=color, anchor=anchor, weight=weight)

    def svg(self):
        head = (
            f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" viewBox="0 0 {W} {H}">'
            '<defs><marker id="head" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" '
            'orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10 z" fill="#475569"/></marker></defs>'
            f'<rect width="{W}" height="{H}" fill="#ffffff"/>'
        )
        title = []
        title.append(
            f'<text x="80" y="92" font-family="{FONT}" font-size="44" font-weight="800" fill="#0f172a">'
            f"{escape(self.title)}</text>"
        )
        if self.subtitle:
            title.append(
                f'<text x="80" y="138" font-family="{FONT}" font-size="26" fill="#64748b">{escape(self.subtitle)}</text>'
            )
        footer = (
            f'<text x="{W - 60}" y="{H - 36}" font-family="{FONT}" font-size="20" font-weight="600" fill="#94a3b8" '
            'text-anchor="end">renekin.com</text>'
        )
        return head + "".join(title) + "".join(self.parts) + footer + "</svg>"

    def save(self, slug, name):
        src_dir = os.path.join(HERE, "src", slug)
        out_dir = os.path.join(PUBLIC, slug)
        os.makedirs(src_dir, exist_ok=True)
        os.makedirs(out_dir, exist_ok=True)
        svg_path = os.path.join(src_dir, f"{name}.svg")
        with open(svg_path, "w") as f:
            f.write(self.svg())
        png_path = os.path.join(out_dir, f"{name}.png")
        subprocess.run(["rsvg-convert", "-w", str(W), "-h", str(H), svg_path, "-o", png_path], check=True)
        return png_path
