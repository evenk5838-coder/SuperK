#!/bin/bash
set -eu
umask 077
HARNESS="/Users/niannian/deepseek-harness"
PATCH="/Users/niannian/SuperK/harness/superk.patch.yml"
PORT=3088
LOG_DIR="/Users/niannian/SuperK/logs"
LOG="$LOG_DIR/harness.log"
LEGACY_LOG="/tmp/superk-harness.log"
NODE="/usr/local/bin/node"
RUN=()
[ "$(sysctl -n hw.optional.arm64 2>/dev/null)" = "1" ] && RUN=(arch -arm64)

read_url() { grep -o "http://127.0.0.1:$PORT/?token=[A-Za-z0-9_-]*" "$1" 2>/dev/null | tail -1 || true; }
fail() {
  local reason="$1"
  printf 'SuperK: %s\nLog: %s\n' "$reason" "$LOG" >&2
  /usr/bin/osascript - "$reason" "$LOG" <<'APPLESCRIPT' >/dev/null 2>&1 || true
on run argv
  display alert "SuperK 启动失败" message ((item 1 of argv) & return & return & "日志：" & (item 2 of argv)) as critical
end run
APPLESCRIPT
  exit 1
}

[ -x "$NODE" ] || fail "找不到 Node 运行程序。"
[ -d "$HARNESS" ] || fail "找不到 DeepSeek Harness 目录。"
[ -f "$PATCH" ] || fail "找不到 SuperK 插件配置。"
mkdir -p "$LOG_DIR" || fail "无法创建启动日志目录。"
chmod 700 "$LOG_DIR"
LISTENER="$(lsof -nP -iTCP:$PORT -sTCP:LISTEN -t 2>/dev/null | sort -u || true)"
if [ -z "$LISTENER" ]; then
  cd "$HARNESS" || fail "无法进入 DeepSeek Harness 目录。"
  if [ -f "$LOG" ]; then cp -p "$LOG" "$LOG_DIR/harness.$(date +%Y%m%d-%H%M%S).$$.log"; fi
  : > "$LOG"
  chmod 600 "$LOG"
  nohup "${RUN[@]}" "$NODE" --import tsx/esm apps/cli/src/bin.ts web --patch "$PATCH" --port "$PORT" --no-open >> "$LOG" 2>&1 &
  SERVER_PID=$!
  for _ in $(seq 1 200); do
    if [ -n "$(read_url "$LOG")" ] && lsof -nP -iTCP:$PORT -sTCP:LISTEN >/dev/null 2>&1; then break; fi
    kill -0 "$SERVER_PID" 2>/dev/null || fail "后台服务启动后退出，请检查日志。"
    sleep 0.2
  done
else
  COMMAND="$(ps -p "$LISTENER" -o command= 2>/dev/null || true)"
  case "$COMMAND" in
    *"apps/cli/src/bin.ts web"*"--patch $PATCH"*"--port $PORT"*) ;;
    *) fail "3088 端口被其他程序占用，未停止该程序。" ;;
  esac
  # Migrate an existing launch without discarding its authenticated URL.
  if [ -z "$(read_url "$LOG")" ] && [ -n "$(read_url "$LEGACY_LOG")" ]; then
    cp "$LEGACY_LOG" "$LOG"
    chmod 600 "$LOG"
  fi
fi
URL="$(read_url "$LOG")"
[ -n "$URL" ] || fail "后台服务没有提供启动地址。若服务已在运行，可能是启动日志丢失；请让 Codex 检查并重启 SuperK。"
if [ -d "/Applications/Google Chrome.app" ]; then
  open -na "Google Chrome" --args --app="$URL" --window-size=1440,960 || fail "无法打开 Google Chrome。"
else
  open "$URL" || fail "无法打开默认浏览器。"
fi
