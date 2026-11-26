/**
 * 이름 표기법 변환. vscode에 의존하지 않는 순수 로직이라 Vitest로 바로 테스트할 수 있다.
 */

export type CaseStyle = "camelCase" | "PascalCase" | "snake_case" | "UPPER_SNAKE_CASE";

export type IdentifierKind = "variable" | "function" | "class" | "constant";

export type SupportedLanguage = "javascript" | "typescript" | "python";

/** "userLoginCount", "user_login_count", "user login count" 등을 ["user", "login", "count"]로 나눈다. */
export function splitWords(input: string): string[] {
  return input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .split(/[^A-Za-z0-9]+/)
    .filter((word) => word.length > 0)
    .map((word) => word.toLowerCase());
}

function capitalize(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export function toCase(input: string, style: CaseStyle): string {
  const words = splitWords(input);
  switch (style) {
    case "camelCase":
      return words.map((word, index) => (index === 0 ? word : capitalize(word))).join("");
    case "PascalCase":
      return words.map(capitalize).join("");
    case "snake_case":
      return words.join("_");
    case "UPPER_SNAKE_CASE":
      return words.join("_").toUpperCase();
  }
}

/** 언어와 식별자 종류에 맞는 표기법. 규칙 근거는 docs/naming-rules.md 참고. */
export function styleFor(language: SupportedLanguage, kind: IdentifierKind): CaseStyle {
  if (kind === "class") {
    return "PascalCase";
  }
  if (kind === "constant") {
    return "UPPER_SNAKE_CASE";
  }
  return language === "python" ? "snake_case" : "camelCase";
}
