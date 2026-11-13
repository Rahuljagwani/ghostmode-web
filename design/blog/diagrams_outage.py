"""Diagrams for /blog/microsoft-outage-retry-storms. Run: python3 design/blog/diagrams_outage.py"""

from diagram import Diagram

SLUG = "microsoft-outage-retry-storms"


def amplification():
    d = Diagram("How retries multiply load", "Each layer retries up to 4 times: one click becomes 64 database attempts")
    boxes = [(70, "1 click", "frontend", "sky"), (450, "4 attempts", "API layer", "amber"), (830, "16 attempts", "service layer", "amber"), (1210, "64 attempts", "database", "red")]
    for x, label, sub, color in boxes:
        d.box(x, 330, 320, 170, label, [sub], color, size=34)
    for a, b in [(390, 446), (770, 826), (1150, 1206)]:
        d.arrow(a, 415, b, 415, "x4", label_dy=-30)
    d.note(80, 640, "The overloaded database sees 64 times the load at exactly the moment it can least handle it.", size=26, weight=600)
    d.note(80, 690, "Fix: retry at one layer only, cap attempts, add backoff with jitter, and keep a retry budget.", size=26)
    d.note(80, 790, "Example from the Google SRE book, \"Addressing Cascading Failures\".", size=20, color="#94a3b8")
    d.save(SLUG, "retry-amplification")


def breaker():
    d = Diagram("Circuit breaker: three states", "Stop calling a dependency that is clearly down, then test it carefully")
    d.box(90, 330, 360, 180, "Closed", ["calls go through,", "failures are counted"], "green", size=34)
    d.box(620, 330, 360, 180, "Open", ["fail fast, don't call", "the dependency at all"], "red", size=34)
    d.box(1150, 330, 360, 180, "Half-open", ["let a few test", "calls through"], "amber", size=34)
    d.arrow(452, 390, 616, 390, "too many failures", label_dy=-28)
    d.arrow(982, 390, 1146, 390, "cool-down ends", label_dy=-28)
    d.path("M 1330 512 C 1330 680, 270 680, 270 514", "test calls succeed", at=(800, 655))
    d.path("M 1250 330 C 1180 230, 900 230, 840 326", "test calls fail", at=(1045, 235))
    d.note(80, 800, "Retries handle short blips. A circuit breaker stops the flood when a dependency is clearly down.", size=24)
    d.save(SLUG, "circuit-breaker")


if __name__ == "__main__":
    amplification()
    breaker()
    print("done")
