"""Rebuild src/app/fonts/PixelMplus12-Bold.subset.woff2.

The hero/title pixel font (Press Start 2P) has no Japanese, so Japanese glyphs
fall back to PixelMplus12 Bold. The full TTF is ~1.2MB, so we ship a subset:
kana, CJK/full-width symbols, JIS X 0208 level-1 kanji, plus every Japanese
character currently used in src/ (so level-2 kanji in content are covered).
Re-run after adding content with rare kanji.

The glyphs are also re-fitted to sit beside Press Start 2P (see refit()):
PixelMplus kanji fill the whole 1em box and hang below the baseline, so next
to Press Start's 7/8-em capitals they looked bigger, lower and cramped.

Usage:
  python3 -m venv .venv && .venv/bin/pip install fonttools brotli
  # PixelMplus12-Bold.ttf from https://github.com/itouhiro/PixelMplus/releases
  .venv/bin/python scripts/subset-pixel-font.py path/to/PixelMplus12-Bold.ttf
"""

import pathlib
import subprocess
import sys
import tempfile

ROOT = pathlib.Path(__file__).resolve().parent.parent
OUT = ROOT / "src/app/fonts/PixelMplus12-Bold.subset.woff2"
JP_START = 0x3000  # Latin stays on Press Start 2P

# Press Start 2P capitals are 7/8 em tall, sit on the baseline, and every glyph
# has a 1/8 em gap. Scale Japanese glyphs to the same height, drop their bottom
# onto the baseline and center them so neighbours get the same 1/8 em gap.
SCALE = 0.875


def charset() -> str:
    chars = set()
    for lo, hi in [(0x3000, 0x3100), (0xFF00, 0xFFF0)]:
        chars.update(chr(cp) for cp in range(lo, hi))
    # JIS X 0208 rows 1-8 (symbols) and 16-47 (level-1 kanji)
    for row in [*range(1, 9), *range(16, 48)]:
        for cell in range(1, 95):
            try:
                chars.add(bytes([row + 0xA0, cell + 0xA0]).decode("euc_jp"))
            except UnicodeDecodeError:
                pass
    for path in (ROOT / "src").rglob("*.ts*"):
        chars.update(path.read_text(encoding="utf-8"))
    return "".join(sorted(c for c in chars if ord(c) >= JP_START))


def refit(path: pathlib.Path) -> None:
    from fontTools.pens.transformPen import TransformPen
    from fontTools.pens.ttGlyphPen import TTGlyphPen
    from fontTools.ttLib import TTFont

    font = TTFont(path)
    upm = font["head"].unitsPerEm
    glyf, hmtx = font["glyf"], font["hmtx"]
    cmap = font.getBestCmap()
    ref = glyf[cmap[ord("株")]]
    ref.recalcBounds(glyf)
    dx = upm * (1 - SCALE) / 2
    dy = -ref.yMin * SCALE  # kanji bottom -> baseline
    for name in font.getGlyphOrder():
        glyph = glyf[name]
        if glyph.numberOfContours == 0:
            continue
        pen = TTGlyphPen(glyf)
        glyph.draw(TransformPen(pen, (SCALE, 0, 0, SCALE, dx, dy)), glyf)
        new = pen.glyph()
        new.recalcBounds(glyf)
        glyf[name] = new
        advance, _ = hmtx[name]
        hmtx[name] = (advance, new.xMin)
    font.save(path)


def main() -> None:
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    with tempfile.NamedTemporaryFile("w", suffix=".txt", encoding="utf-8", delete=False) as f:
        f.write(charset())
    subprocess.run(
        [
            sys.executable, "-m", "fontTools.subset", sys.argv[1],
            f"--text-file={f.name}", "--flavor=woff2", f"--output-file={OUT}",
            "--layout-features=*", "--no-hinting",
        ],
        check=True,
    )
    refit(OUT)
    print(f"wrote {OUT} ({OUT.stat().st_size // 1024} KB)")


if __name__ == "__main__":
    main()
