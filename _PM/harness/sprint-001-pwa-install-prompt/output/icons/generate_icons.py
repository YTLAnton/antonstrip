"""
Generator artifact: icon producer for sprint-001-pwa-install-prompt Step 2.

Produces 8 PNG icons (192px + 512px for each of 4 trips). Each icon:
- Background brand color (per-trip; HK cyan, MO crimson, Singapore teal, AKAME amber)
  to keep trips visually distinguishable; manifest theme_color stays #121212.
- Centered white CJK text (Microsoft JhengHei) within a 80% safe area (maskable
  ready — safe area equals central 80% per W3C maskable spec).
- Rounded contour painted on top for "any" purpose visual identity.

Run from project root:
    python _PM/harness/sprint-001-pwa-install-prompt/output/icons/generate_icons.py
"""
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

FONT_PATH = r"C:\Windows\Fonts\msjhbd.ttc"  # Microsoft JhengHei Bold
PROJECT_ROOT = Path(__file__).resolve().parents[5]

TRIPS = [
    {
        "dir": "2026_04_HK",
        "bg": (8, 145, 178),
        "label": "Horlick",
    },
    {
        "dir": "2026_04_MO",
        "bg": (190, 51, 64),
        "label": "MO",
    },
    {
        "dir": "2026_05_Singapore",
        "bg": (15, 118, 110),
        "label": "新加坡",
    },
    {
        "dir": "2026_07_AKAME",
        "bg": (217, 119, 6),
        "label": "AKAME",
    },
]

SIZES = [192, 512]


def fit_font(text: str, max_width: int, max_height: int):
    """Binary-search font size that fits both width and height of the safe area."""
    lo, hi, best = 8, max_height, 8
    while lo <= hi:
        mid = (lo + hi) // 2
        font = ImageFont.truetype(FONT_PATH, mid)
        bbox = font.getbbox(text)
        w = bbox[2] - bbox[0]
        h = bbox[3] - bbox[1]
        if w <= max_width and h <= max_height:
            best = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return ImageFont.truetype(FONT_PATH, best)


def render(size: int, bg, label: str, out_path: Path):
    img = Image.new("RGBA", (size, size), bg + (255,))
    draw = ImageDraw.Draw(img)

    safe_margin = int(size * 0.1)  # 10% padding -> 80% safe area
    safe = size - 2 * safe_margin

    font = fit_font(label, int(safe * 0.95), int(safe * 0.55))
    bbox = font.getbbox(label)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    tx = (size - tw) // 2 - bbox[0]
    ty = (size - th) // 2 - bbox[1]

    shadow_offset = max(1, size // 96)
    draw.text(
        (tx + shadow_offset, ty + shadow_offset),
        label,
        font=font,
        fill=(0, 0, 0, 96),
    )
    draw.text((tx, ty), label, font=font, fill=(255, 255, 255, 255))

    ring_width = max(2, size // 64)
    draw.ellipse(
        [
            (safe_margin // 2, safe_margin // 2),
            (size - safe_margin // 2, size - safe_margin // 2),
        ],
        outline=(255, 255, 255, 64),
        width=ring_width,
    )

    out_path.parent.mkdir(parents=True, exist_ok=True)
    img.save(out_path, format="PNG", optimize=True)


def main():
    written = []
    for trip in TRIPS:
        for size in SIZES:
            out = PROJECT_ROOT / trip["dir"] / "img" / f"icon-{size}.png"
            render(size, trip["bg"], trip["label"], out)
            written.append(out.relative_to(PROJECT_ROOT).as_posix())
    print("Wrote", len(written), "icons:")
    for p in written:
        print("  -", p)


if __name__ == "__main__":
    main()
