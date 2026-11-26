import { describe, expect, it } from "vitest";
import { splitWords, styleFor, toCase } from "../../src/core/casing";

describe("splitWords", () => {
  it("camelCase, snake_case, 공백 구분을 모두 단어로 나눈다", () => {
    expect(splitWords("userLoginCount")).toEqual(["user", "login", "count"]);
    expect(splitWords("user_login_count")).toEqual(["user", "login", "count"]);
    expect(splitWords("user login count")).toEqual(["user", "login", "count"]);
  });

  it("연속된 대문자 약어를 분리한다", () => {
    expect(splitWords("parseHTMLResponse")).toEqual(["parse", "html", "response"]);
  });
});

describe("toCase", () => {
  it.each([
    ["camelCase", "isLoggedIn"],
    ["PascalCase", "IsLoggedIn"],
    ["snake_case", "is_logged_in"],
    ["UPPER_SNAKE_CASE", "IS_LOGGED_IN"],
  ] as const)("%s로 변환한다", (style, expected) => {
    expect(toCase("is logged in", style)).toBe(expected);
  });
});

describe("styleFor", () => {
  it("JS/TS 변수와 함수는 camelCase", () => {
    expect(styleFor("typescript", "variable")).toBe("camelCase");
    expect(styleFor("javascript", "function")).toBe("camelCase");
  });

  it("Python 변수와 함수는 snake_case", () => {
    expect(styleFor("python", "function")).toBe("snake_case");
  });

  it("클래스는 PascalCase, 상수는 UPPER_SNAKE_CASE", () => {
    expect(styleFor("python", "class")).toBe("PascalCase");
    expect(styleFor("typescript", "constant")).toBe("UPPER_SNAKE_CASE");
  });
});
