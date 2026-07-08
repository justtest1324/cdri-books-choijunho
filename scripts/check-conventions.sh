#!/usr/bin/env bash
# CONVENTIONS.md의 기계 검증 가능한 규칙을 검사한다 (1.5 사이드 이펙트 경계 등)
set -u
fail=0

# 1. localStorage 접근은 src/lib/ 에서만 (테스트 파일 제외, 주석 속 단어가 아닌 실제 사용만)
hits=$(grep -rn "localStorage\." src --include='*.ts' --include='*.tsx' -l 2>/dev/null | grep -v "^src/lib/" | grep -v "^src/test/" | grep -v "\.test\." || true)
if [ -n "$hits" ]; then
  echo "✗ localStorage는 src/lib/ 밖에서 사용할 수 없습니다:"
  echo "$hits"
  fail=1
fi

# 2. fetch 호출은 src/api/ 에서만 (테스트 파일 제외)
hits=$(grep -rn "fetch(" src --include='*.ts' --include='*.tsx' -l 2>/dev/null | grep -v "^src/api/" | grep -v "\.test\." || true)
if [ -n "$hits" ]; then
  echo "✗ fetch는 src/api/ 밖에서 호출할 수 없습니다:"
  echo "$hits"
  fail=1
fi

# 3. 훅 파일은 JSX를 반환하지 않는다 (hooks/는 .ts만 허용)
hits=$(find src/hooks -name '*.tsx' 2>/dev/null || true)
if [ -n "$hits" ]; then
  echo "✗ src/hooks/ 에는 .tsx 파일을 둘 수 없습니다 (훅은 UI를 모른다):"
  echo "$hits"
  fail=1
fi

if [ $fail -eq 0 ]; then
  echo "✓ 컨벤션 검사 통과"
fi
exit $fail
