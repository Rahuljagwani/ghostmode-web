"""Diagrams for /blog/flash-sale-system-design. Run: python3 design/blog/diagrams_flash_sale.py"""

from diagram import Diagram

SLUG = "flash-sale-system-design"


def race():
    d = Diagram("The oversell bug: read, then write", "Two buyers read the same stock before either one writes")
    d.note(80, 230, "Time", size=24, weight=700)
    d.arrow(80, 250, 1520, 250)
    d.box(80, 300, 300, 110, "Buyer A", None, "sky", size=30)
    d.box(80, 560, 300, 110, "Buyer B", None, "amber", size=30)
    steps = [(470, "reads stock = 1"), (830, "writes stock = 0"), (1190, "order confirmed")]
    for x, label in steps:
        d.box(x, 300, 300, 110, label, None, "green", size=24)
        d.box(x, 560, 300, 110, label, None, "green" if label != "order confirmed" else "red", size=24)
    d.arrow(382, 355, 466, 355)
    d.arrow(772, 355, 826, 355)
    d.arrow(1132, 355, 1186, 355)
    d.arrow(382, 615, 466, 615)
    d.arrow(772, 615, 826, 615)
    d.arrow(1132, 615, 1186, 615)
    d.pill(620, 480, "both read 1 in the same millisecond")
    d.note(80, 780, "Stock was 1. Two orders were confirmed. The fix: make check and subtract a single step.", size=26, weight=600)
    d.save(SLUG, "race-condition")


def architecture():
    d = Diagram("Flash sale checkout that never oversells", "Five layers, each closing one way the sale can break")
    d.box(60, 330, 230, 150, "Buyers", ["10,000 at once"], "amber", size=28)
    d.box(360, 320, 260, 170, "Waiting room", ["lets people in at", "a steady rate"], "violet", size=26)
    d.box(690, 320, 260, 170, "Checkout API", ["one request", "per buyer"], "sky", size=26)
    d.box(1020, 180, 300, 150, "Redis counter", ["DECR, or 10 buckets"], "green", size=26)
    d.box(1020, 480, 300, 150, "Reservation", ["held for 10 min,", "then expires"], "amber", size=26)
    d.box(1020, 700, 300, 130, "Payment", ["idempotency key"], "sky", size=26)
    d.box(1390, 700, 170, 130, "Orders DB", ["source of truth"], "gray", size=24)
    d.arrow(292, 405, 356, 405)
    d.arrow(622, 405, 686, 405)
    d.arrow(952, 360, 1016, 270, "1. take one", label_dx=-70, label_dy=-10)
    d.arrow(952, 420, 1016, 540, "2. hold it", label_dx=-70, label_dy=30)
    d.arrow(1170, 632, 1170, 696, "3. pay", label_dx=60, label_dy=0)
    d.arrow(1322, 765, 1386, 765, "4. confirm", label_dx=0, label_dy=-75)
    d.path("M 1322 540 C 1430 480, 1430 330, 1324 280", "expired: put it back", at=(1430, 410), dashed=True)
    d.save(SLUG, "architecture")


if __name__ == "__main__":
    race()
    architecture()
    print("done")
