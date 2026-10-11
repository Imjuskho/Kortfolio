#!/usr/bin/env bash
#
# One-off raster optimisation for Kortfolio's public assets.
#
# Rationale (see docs/performance/PERFORMANCE_REPORT.md): the shipped imagery was
# 48 MB, dominated by 3–6 MB files at print resolutions (e.g. 5459x4024 photos,
# 2064x2752 device mockups). Nothing on the page renders wider than ~2000px, so
# the files were downscaled to the largest size actually used, JPEGs were
# recompressed, and the oversized alpha PNGs were converted to WebP.
#
# Requires: ImageMagick (`convert`) and `cwebp`. Originals are expected to be
# backed up before running. Safe to re-run (idempotent on already-optimised files).
#
set -euo pipefail
cd "$(dirname "$0")/.."
ASSETS="public/assets"

echo "Before: $(du -sh "$ASSETS" | cut -f1)"

# 1. Documentary photos: cap the longest edge at 2000px (the lightbox renders at
#    most ~68vh) and recompress. 2000px covers a 2x display at lightbox size.
# NB: encode to a sibling temp file, never in place — ImageMagick writing over its
# own input silently produces a much larger file.
for f in "$ASSETS"/photos/photo_*.jpg; do
  convert "$f" -strip -resize '2000x2000>' -interlace Plane -quality 82 "${f%.jpg}.opt.jpg"
  mv "${f%.jpg}.opt.jpg" "$f"
done

# 2. Project captures: cap the longest edge at 1600px, JPEG q82.
for f in "$ASSETS"/projects/*.jpg; do
  convert "$f" -strip -resize '1600x1600>' -interlace Plane -quality 82 "${f%.jpg}.opt.jpg"
  mv "${f%.jpg}.opt.jpg" "$f"
done

# 3. Oversized device-mockup PNGs (alpha, 1.8–5.8 MB) -> WebP q90, capped 1600px.
#    The modal renders them inside a ~900px container, so 1600px keeps UI text crisp.
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT
for n in bawo_glass ipad-home ipad-malawi iphone-kiswahili iphone-kujifunza iphone-malawi; do
  convert "$ASSETS/projects/$n.png" -resize '1600x1600>' -strip "$TMP/$n.png"
  cwebp -quiet -q 90 "$TMP/$n.png" -o "$ASSETS/projects/$n.webp"
  rm -f "$ASSETS/projects/$n.png"
done

# 4. Profile portrait -> WebP q90, capped 1000px.
convert "$ASSETS/profile/kondwani.png" -resize '1000x1000>' -strip "$TMP/kondwani.png"
cwebp -quiet -q 90 "$TMP/kondwani.png" -o "$ASSETS/profile/kondwani.webp"
rm -f "$ASSETS/profile/kondwani.png" "$ASSETS/profile/kondwani.jpg"

# 5. Dead assets — never referenced anywhere in src/.
rm -f "$ASSETS/projects/ipad-kiswahili.png" "$ASSETS/projects/iphone-home.png"

echo "After:  $(du -sh "$ASSETS" | cut -f1)"
