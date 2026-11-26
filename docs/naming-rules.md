# 네이밍 규칙 (초안)

2단계에서 다듬을 초안이다. Gemini 프롬프트와 `src/core/casing.ts`의 기준이 된다.

## 언어별 표기법

| 종류         | JavaScript / TypeScript | Python             |
| ------------ | ----------------------- | ------------------ |
| 변수, 함수   | `camelCase`             | `snake_case`       |
| 클래스, 타입 | `PascalCase`            | `PascalCase`       |
| 상수         | `UPPER_SNAKE_CASE`      | `UPPER_SNAKE_CASE` |

## 공통 규칙

- boolean은 `is`, `has`, `can`, `should`로 시작한다. 예: `isLoggedIn`, `has_permission`
- 함수와 메서드는 동사로 시작한다. 예: `fetchUser`, `calculate_total`
- 배열과 리스트는 복수형으로 쓴다. 예: `users`, `order_items`
- 약어는 한 단어처럼 다룬다. 예: `parseHtml`, `userId`
