import * as vscode from 'vscode';
import { registerInlineProvider } from './inline-provider';

export function activate(context: vscode.ExtensionContext) {
  registerInlineProvider();
}
