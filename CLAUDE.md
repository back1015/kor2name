# Kor2Name

한글 설명을 선택하고 단축키를 누르면 Gemini가 영어 이름 후보 3~5개를 제안하고, 고르면 선택 영역을 바로 바꿔주는 VS Code 익스텐션.
목표: 영어 네이밍 고민 시간을 없애고 개발에 집중하기. 대상 언어는 JavaScript, TypeScript, Python.

## 소통

- 사용자와는 한국어로 대화한다. 코드 식별자, 커밋 메시지 제목은 영어로 쓴다. 코드 주석과 사용자에게 보이는 문구는 한국어로 쓴다.

## 구조

- `src/extension.ts`: VS Code 진입점. 명령 등록과 UI만 담당하고 로직은 `src/core`로 넘긴다.
- `src/core/`: vscode를 import하지 않는 순수 로직(표기법 변환, 프롬프트 생성, 응답 파싱). 여기 있는 코드는 전부 Vitest 단위 테스트로 덮는다.
- `test/unit/`: Vitest 단위 테스트 (`*.test.ts`).
- `src/test/`: 실제 VS Code를 띄우는 통합 테스트 (Mocha TDD). CI에서 `xvfb-run`으로 실행된다.
- `docs/naming-rules.md`: 네이밍 규칙. Gemini 프롬프트의 기준이며 `src/core/casing.ts`의 `styleFor`와 내용이 일치해야 한다.

## 명령어

- `npm run check`: 타입 체크 + ESLint + Prettier 확인 + 단위 테스트. **작업을 마치기 전에 반드시 통과시킨다.**
- `npm run test`: 단위 테스트만. 실패한 테스트만 다시 돌릴 때는 `npx vitest run <파일>`.
- `npm run build`: esbuild로 `dist/extension.js` 번들.
- `npm run test:vscode`: VS Code 통합 테스트 (VS Code 다운로드가 필요해서 보통 CI에서만 돈다).
- VS Code에서 F5: 익스텐션 개발 호스트 실행.

## 규칙

- 새 로직은 `src/core`에 먼저 테스트와 함께 만들고, `extension.ts`에서는 호출만 한다.
- Gemini API 키는 절대 코드나 저장소에 넣지 않는다. VS Code `SecretStorage`에 저장한다. `.env`는 커밋 금지.
- 외부 의존성은 꼭 필요할 때만 추가한다. Gemini 호출은 Node 내장 `fetch`로 한다.
- ESLint `naming-convention` 규칙을 끄지 않는다. 이 프로젝트 자체가 좋은 네이밍의 예시여야 한다.
- 파일을 수정하면 `.claude/hooks/format-edited-file.sh` 훅이 Prettier와 ESLint --fix를 자동으로 돌린다. 훅이 에러를 돌려주면 바로 고친다.

## 진행 계획

1. 범위 정하기 (현재 단계)
2. 네이밍 규칙 문서 정리 → `docs/naming-rules.md`
3. MVP: Gemini 호출, QuickPick 후보 선택, 선택 영역 치환
4. 직접 써보며 다듬기
