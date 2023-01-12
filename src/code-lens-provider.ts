import * as vscode from 'vscode';
import { getCodeLensState } from './state-service';
import { CodeLensData } from './state-types';

export class CodelensProvider implements vscode.CodeLensProvider {
  private codeLenses: vscode.CodeLens[] = [];
  private _onDidChangeCodeLenses: vscode.EventEmitter<void> = new vscode.EventEmitter<void>();
  public readonly onDidChangeCodeLenses: vscode.Event<void> = this._onDidChangeCodeLenses.event;

  constructor() {
    vscode.workspace.onDidChangeConfiguration((_) => {
      this._onDidChangeCodeLenses.fire();
    });
  }

  public provideCodeLenses(
    document: vscode.TextDocument,
    token: vscode.CancellationToken
  ): vscode.CodeLens[] | Thenable<vscode.CodeLens[]> {
    this.codeLenses = [];
    getCodeLensState().forEach((codeLensData) => {
      const tokenString = codeLensData.tokenString;
      const regex = new RegExp(tokenString, 'g');
      const text = document.getText();
      let matches;
      while ((matches = regex.exec(text)) !== null) {
        const line = document.lineAt(document.positionAt(matches.index).line);
        const indexOf = line.text.indexOf(matches[0]);
        const position = new vscode.Position(line.lineNumber, indexOf);
        const range = document.getWordRangeAtPosition(position, new RegExp(tokenString, 'g'));
        if (range) {
          this.codeLenses.push(new CodeLensWrapper(range, codeLensData));
        }
      }
    });
    return this.codeLenses;
  }

  public resolveCodeLens(codeLens: CodeLensWrapper, token: vscode.CancellationToken) {
    codeLens.command = {
      title: codeLens.codeLensData.codeLensLabel,
      tooltip: codeLens.codeLensData.tokenString,
      command: codeLens.codeLensData.command || '',
    };
    return codeLens;
  }
}

class CodeLensWrapper extends vscode.CodeLens {
  codeLensData: CodeLensData;

  constructor(range: vscode.Range, codeLensData: CodeLensData) {
    super(range);
    this.codeLensData = codeLensData;
  }
}
