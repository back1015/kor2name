import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext): void {
  const suggestName = vscode.commands.registerCommand("kor2name.suggestName", () => {
    const editor = vscode.window.activeTextEditor;
    const selection = editor ? editor.document.getText(editor.selection).trim() : "";
    if (selection.length === 0) {
      void vscode.window.showWarningMessage("이름을 추천받을 한글 설명을 먼저 선택해 주세요.");
      return;
    }
    // TODO(3단계): Gemini로 후보를 받아 QuickPick으로 보여주고 선택 영역을 치환한다.
    void vscode.window.showInformationMessage(`"${selection}"에 대한 추천은 아직 준비 중이에요.`);
  });

  context.subscriptions.push(suggestName);
}

export function deactivate(): void {
  // 정리할 리소스 없음
}
