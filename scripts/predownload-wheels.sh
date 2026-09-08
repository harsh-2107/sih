#!/usr/bin/env bash
# ──────────────────────────────────────────────────────────────────────────────
# scripts/predownload-wheels.sh
#
# Pre-download all processing service Python wheels on the host machine.
# Run this BEFORE `docker compose ... up --build` when you have a slow/flaky
# network. Docker will then install packages from the local wheelhouse/
# directory instead of downloading them inside the container.
#
# Usage:
#   bash scripts/predownload-wheels.sh
#
# After running, uncomment the two lines in processing/Dockerfile marked
# "OPTIONAL: offline install from pre-downloaded wheelhouse".
# ──────────────────────────────────────────────────────────────────────────────

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
WHEELHOUSE="$REPO_ROOT/processing/wheelhouse"

echo "==> Creating wheelhouse directory: $WHEELHOUSE"
mkdir -p "$WHEELHOUSE"

echo "==> Downloading base requirements (lightweight)…"
pip download \
  --prefer-binary \
  --dest "$WHEELHOUSE" \
  -r "$REPO_ROOT/processing/requirements-base.txt"

echo "==> Downloading ML requirements (heavy — this may take a while)…"
pip download \
  --prefer-binary \
  --dest "$WHEELHOUSE" \
  -r "$REPO_ROOT/processing/requirements-ml.txt"

echo ""
echo "✅  All wheels saved to: $WHEELHOUSE"
echo ""
echo "Next steps:"
echo "  1. Open processing/Dockerfile"
echo "  2. Uncomment the two lines under '# OPTIONAL: offline install from pre-downloaded wheelhouse'"
echo "  3. Run: docker compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build"
echo "     Docker will now install from local wheels — no internet required inside the container."
