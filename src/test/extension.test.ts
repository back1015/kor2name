import * as assert from "node:assert";
import * as vscode from "vscode";

suite("Kor2Name 익스텐션", () => {
  test("이름 추천 명령이 등록되어 있다", async () => {
    const commands = await vscode.commands.getCommands(true);
    assert.ok(commands.includes("kor2name.suggestName"));
  });
});
