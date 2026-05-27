"""
Inject body_pwa_block.html into the 4 index.html files (idempotent).

Reads:  output/inline_patches/body_pwa_block.html
Writes: 2026_*/index.html (4 files)

Injection anchor: the lightbox closing pattern, common to all 4 files:

    <img id="lightbox-img" alt="">
  </div>
</body>

The PWA block is inserted between </div> (lightbox) and </body>.
If the PWA block (detected by id="pwaInstallPrompt") is already present,
the file is skipped — re-running is a no-op.
"""
from pathlib import Path

PROJECT_ROOT = Path(__file__).resolve().parents[5]
PATCH = (PROJECT_ROOT / "_PM/harness/sprint-001-pwa-install-prompt/output/inline_patches/body_pwa_block.html").read_text(encoding="utf-8")

TRIPS = ["2026_04_HK", "2026_04_MO", "2026_05_Singapore", "2026_07_AKAME"]

ANCHOR = "    <img id=\"lightbox-img\" alt=\"\">\n  </div>\n</body>"

REPLACEMENT = (
    "    <img id=\"lightbox-img\" alt=\"\">\n"
    "  </div>\n\n"
    "  " + PATCH.strip().replace("\n", "\n  ") + "\n"
    "</body>"
)


def main():
    for d in TRIPS:
        f = PROJECT_ROOT / d / "index.html"
        text = f.read_text(encoding="utf-8")
        if 'id="pwaInstallPrompt"' in text:
            print(f"[SKIP] {d}/index.html already patched")
            continue
        if ANCHOR not in text:
            print(f"[FAIL] {d}/index.html anchor not found")
            continue
        new_text = text.replace(ANCHOR, REPLACEMENT, 1)
        f.write_text(new_text, encoding="utf-8")
        print(f"[OK]   {d}/index.html patched ({len(new_text) - len(text)} chars added)")


if __name__ == "__main__":
    main()
