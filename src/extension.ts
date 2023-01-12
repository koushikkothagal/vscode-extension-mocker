import * as vscode from 'vscode';
import { registerCodeLensCreateCommand } from './code-lens-creation';
import { CodelensProvider } from './code-lens-provider';
import { registerInlineProvider } from './inline-provider';

export function activate(context: vscode.ExtensionContext) {
  registerInlineProvider();

  const codelensProvider = new CodelensProvider();
	vscode.languages.registerCodeLensProvider("*", codelensProvider);

  registerCodeLensCreateCommand(context);
}
