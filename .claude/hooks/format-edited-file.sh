#!/usr/bin/env bash
# Claude가 파일을 수정한 직후 Prettier와 ESLint --fix를 그 파일에만 돌린다.
# 남은 린트 에러는 exit 2로 Claude에게 돌려보내서 바로 고치게 한다.
set -uo pipefail

# jq 없이도 돌도록 node로 stdin JSON에서 file_path를 꺼낸다.
file=$(node -e 'let d="";process.stdin.on("data",c=>d+=c).on("end",()=>{try{console.log(JSON.parse(d).tool_input?.file_path??"")}catch{}})')
[ -z "$file" ] && exit 0
[ -f "$file" ] || exit 0

cd "$CLAUDE_PROJECT_DIR" || exit 0

case "$file" in
  *.ts|*.mts|*.mjs|*.js|*.json|*.md|*.yml|*.yaml)
    npx --no-install prettier --write --log-level warn "$file" >/dev/null 2>&1 || true
    ;;
esac

case "$file" in
  *.ts|*.mts|*.mjs|*.js)
    if ! output=$(npx --no-install eslint --fix "$file" 2>&1); then
      echo "ESLint 에러가 남아 있어요. 고쳐 주세요:" >&2
      echo "$output" >&2
      exit 2
    fi
    ;;
esac

exit 0
