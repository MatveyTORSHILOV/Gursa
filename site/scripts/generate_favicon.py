#!/usr/bin/env python3
"""Favicon: прозрачный фон, золотая сота, чёрная заливка внутри, змея."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parents[1]
SNAKE = ROOT / "public/logo/snake-gold-premium-super-puper.png"
OUT = ROOT / "public/favicon.png"

SIZE = 512
GOLD = (212, 175, 55, 255)
BLACK = (5, 6, 8, 255)
STROKE = 14


def hex_points(cx: float, cy: float, radius: float) -> list[tuple[float, float]]:
    # Вершина сверху, как в GyurzaLogo
    return [
        (
            cx + radius * math.cos(math.radians(angle)),
            cy - radius * math.sin(math.radians(angle)),
        )
        for angle in (90, 30, -30, -90, -150, 150)
    ]


def main() -> None:
    cx = cy = SIZE / 2
    radius = SIZE * 0.43
    points = hex_points(cx, cy, radius)

    canvas = Image.new("RGBA", (SIZE, SIZE), (0, 0, 0, 0))
    draw = ImageDraw.Draw(canvas)

    draw.polygon(points, fill=BLACK, outline=GOLD, width=STROKE)

    snake = Image.open(SNAKE).convert("RGBA")
    inner = SIZE * 0.56
    scale = inner / max(snake.size)
    w = int(snake.width * scale)
    h = int(snake.height * scale)
    snake = snake.resize((w, h), Image.Resampling.LANCZOS)
    canvas.paste(snake, (int(cx - w / 2), int(cy - h / 2 + SIZE * 0.02)), snake)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG")
    print(f"Wrote {OUT} ({SIZE}x{SIZE})")


if __name__ == "__main__":
    main()
