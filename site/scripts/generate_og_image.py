#!/usr/bin/env python3
"""OG-картинка 1200×630 для соцсетей и SEO."""
from __future__ import annotations

import math
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SNAKE = ROOT / "public/logo/snake-gold-premium-super-puper.png"
OUT = ROOT / "public/og-image.png"
FONT_BOLD = Path("/usr/share/fonts/truetype/liberation/LiberationSans-Bold.ttf")
FONT_REG = Path("/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf")

W, H = 1200, 630
BG = (16, 20, 28)
GOLD = (212, 175, 55)
WHITE = (245, 245, 245)
MUTED = (180, 186, 198)


def hex_points(cx: float, cy: float, radius: float) -> list[tuple[float, float]]:
    return [
        (
            cx + radius * math.cos(math.radians(angle)),
            cy - radius * math.sin(math.radians(angle)),
        )
        for angle in (90, 30, -30, -90, -150, 150)
    ]


def draw_emblem(canvas: Image.Image, cx: int, cy: int, size: int) -> None:
    draw = ImageDraw.Draw(canvas)
    radius = size * 0.43
    points = hex_points(cx, cy, radius)
    draw.polygon(points, fill=(5, 6, 8), outline=GOLD, width=max(4, size // 80))

    snake = Image.open(SNAKE).convert("RGBA")
    inner = size * 0.56
    scale = inner / max(snake.size)
    sw, sh = int(snake.width * scale), int(snake.height * scale)
    snake = snake.resize((sw, sh), Image.Resampling.LANCZOS)
    canvas.paste(snake, (cx - sw // 2, cy - sh // 2 + size // 40), snake)


def main() -> None:
    canvas = Image.new("RGB", (W, H), BG)
    draw = ImageDraw.Draw(canvas)

    draw.rectangle((0, 0, W, 6), fill=GOLD)
    draw_emblem(canvas, 280, H // 2, 340)

    title_font = ImageFont.truetype(str(FONT_BOLD), 64)
    sub_font = ImageFont.truetype(str(FONT_REG), 34)
    phone_font = ImageFont.truetype(str(FONT_BOLD), 30)

    draw.text((540, 200), "ЧОО «ГЮРЗА»", font=title_font, fill=GOLD)
    draw.text((540, 285), "Частная охранная организация", font=sub_font, fill=WHITE)
    draw.text((540, 340), "Воронеж и Воронежская область", font=sub_font, fill=MUTED)
    draw.text((540, 420), "+7 (473) 278-51-47", font=phone_font, fill=WHITE)

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.save(OUT, "PNG", optimize=True)
    print(f"Wrote {OUT} ({W}x{H})")


if __name__ == "__main__":
    main()
