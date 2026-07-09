#!/usr/bin/env bash
# Wrapper para o preview: usa a porta atribuída pelo harness via $PORT
export PATH="$HOME/.local/node/bin:$PATH"
PORT="${PORT:-8081}"
exec npx quartz build --serve --port "$PORT" --wsPort "$((PORT + 1))"
