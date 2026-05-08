#!/usr/bin/env bash
#
# deploy.sh — Build the language-learning app and deploy to nginx
#
# Usage:
#   ./scripts/deploy.sh          # Full build + deploy + reload
#   ./scripts/deploy.sh --build  # Build only (skip deploy)
#   ./scripts/deploy.sh --copy   # Copy only (skip build)
#   ./scripts/deploy.sh --help   # Show this help
#

set -euo pipefail

# ── Paths ──────────────────────────────────────────────────────────────
PROJECT_DIR="/root/Projects/language-learning"
DIST_DIR="$PROJECT_DIR/dist"
NGINX_DIR="/var/www/apps/language-learning"
NGINX_CONF="/etc/nginx/sites-available/apps.conf"

# ── Colors ─────────────────────────────────────────────────────────────
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# ── Helpers ────────────────────────────────────────────────────────────
log() {
  echo -e "${CYAN}[$(date '+%Y-%m-%d %H:%M:%S')]${NC} $1"
}

ok() {
  echo -e "${GREEN}✅ $1${NC}"
}

warn() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

err() {
  echo -e "${RED}❌ $1${NC}" >&2
}

die() {
  err "$1"
  exit 1
}

# ── Steps ──────────────────────────────────────────────────────────────
step_build() {
  log "Building application…"
  cd "$PROJECT_DIR"

  # Clean previous dist
  if [ -d "$DIST_DIR" ]; then
    rm -rf "$DIST_DIR"
    log "Cleaned previous dist/"
  fi

  # Build
  if ! npm run build; then
    die "Build failed — check output above"
  fi

  ok "Build complete → $DIST_DIR"
}

step_copy() {
  log "Deploying to nginx…"

  # Verify dist exists
  if [ ! -f "$DIST_DIR/index.html" ]; then
    die "No dist/index.html found. Run build first."
  fi

  # Clean nginx target
  if [ -d "$NGINX_DIR" ]; then
    rm -rf "$NGINX_DIR"/*
    log "Cleaned $NGINX_DIR"
  else
    mkdir -p "$NGINX_DIR"
    log "Created $NGINX_DIR"
  fi

  # Copy files
  cp -r "$DIST_DIR"/* "$NGINX_DIR/"
  ok "Copied dist → $NGINX_DIR"

  # Verify key files
  if [ ! -f "$NGINX_DIR/index.html" ]; then
    die "Deploy failed: index.html missing in nginx dir"
  fi
  if [ ! -d "$NGINX_DIR/assets" ]; then
    warn "assets/ directory not found in nginx dir"
  fi

  # Show deployed files
  log "Deployed files:"
  ls -la "$NGINX_DIR/" | sed 's/^/  /'
  if [ -d "$NGINX_DIR/assets" ]; then
    log "Assets:"
    ls -la "$NGINX_DIR/assets/" | sed 's/^/  /'
  fi
}

step_reload() {
  log "Testing nginx config…"
  if ! nginx -t; then
    die "Nginx config test failed — fix before reloading"
  fi

  log "Reloading nginx…"
  if systemctl reload nginx; then
    ok "Nginx reloaded successfully"
  else
    die "Nginx reload failed"
  fi
}

step_verify() {
  log "Verifying deployment…"

  # Check nginx is serving the app
  local url="http://localhost/language-learning/"
  local status
  status=$(curl -s -o /dev/null -w "%{http_code}" "$url" 2>/dev/null || echo "000")

  if [ "$status" = "200" ]; then
    ok "App responds at $url (HTTP 200)"
  elif [ "$status" = "000" ]; then
    warn "Could not connect to localhost — nginx may not be running"
  else
    warn "App returned HTTP $status (expected 200)"
  fi
}

show_help() {
  cat << 'EOF'
Usage: ./scripts/deploy.sh [OPTION]

Build the language-learning app and deploy to nginx.

Options:
  (none)    Full pipeline: build → deploy → reload → verify
  --build   Build only, skip deploy and reload
  --copy    Copy dist to nginx only, skip build
  --help    Show this help message

Examples:
  ./scripts/deploy.sh           # Full deploy
  ./scripts/deploy.sh --build     # Just run npm run build
  ./scripts/deploy.sh --copy      # Just copy existing dist to nginx

Paths:
  Project:  /root/Projects/language-learning
  Dist:     /root/Projects/language-learning/dist
  Nginx:    /var/www/apps/language-learning
  Config:   /etc/nginx/sites-available/apps.conf
EOF
}

# ── Main ───────────────────────────────────────────────────────────────
main() {
  local do_build=true
  local do_copy=true
  local do_reload=true

  case "${1:-}" in
    --build)
      do_build=true
      do_copy=false
      do_reload=false
      ;;
    --copy)
      do_build=false
      do_copy=true
      do_reload=true
      ;;
    --help|-h)
      show_help
      exit 0
      ;;
    "")
      : # default: full pipeline
      ;;
    *)
      err "Unknown option: $1"
      show_help
      exit 1
      ;;
  esac

  echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${BLUE}║       Language Learning — Build & Deploy Script            ║${NC}"
  echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
  echo

  if $do_build; then
    step_build
    echo
  fi

  if $do_copy; then
    step_copy
    echo
  fi

  if $do_reload; then
    step_reload
    echo
    step_verify
  fi

  echo
  ok "All done! 🚀"
  echo -e "  ${CYAN}URL:${NC} http://<server>/language-learning/"
}

main "$@"
