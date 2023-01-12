import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const provider: vscode.InlineCompletionItemProvider = {
    provideInlineCompletionItems: async (document, position, context, token) => {
      const lines: string[] =
        vscode.workspace.getConfiguration('mocker').get('inlineCompletion.suggestionLines') || [];
      if (position.line <= 0) {
        return;
      }
      const lineAtCursor = document.lineAt(position.line).text.trim();
      const match = lineAtCursor.length > 3 && lines.find((str) => str.startsWith(lineAtCursor));
      console.log(match);
      if (match && match !== lineAtCursor) {
        return [new vscode.InlineCompletionItem(match)];
      } else {
        return [];
      }
    },
  };

  vscode.languages.registerInlineCompletionItemProvider({ pattern: '**' }, provider);
}
