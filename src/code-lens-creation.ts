import { commands, ExtensionContext, window } from 'vscode';
import { addCodeLens } from './state-service';

export const registerCodeLensCreateCommand = (context: ExtensionContext) => {
  context.subscriptions.push(
    commands.registerTextEditorCommand('mocker.addCodeLens', async (editor) => {
      const { start, end } = editor.selection;
      if (start.line !== end.line) {
        window.showErrorMessage('Sorry, only single line selections are supported at this time');
        return;
      }
      const tokenString = editor.document.getText(editor.selection);
      const codeLensLabel: string = await window.showInputBox({
        title: 'Enter CodeLens label',
        validateInput: (value: string) => {
          if (value && value.trim().length > 0) {
            return null;
          } else {
            return 'Cannot have empty string as a CodeLens Label';
          }
        },
      }) as string;
      const allCommands = await commands.getCommands(true);
      const command = await window.showQuickPick(allCommands, {
        title: 'What command should run when this codelens is clicked?'
      });

      addCodeLens({
        tokenString,
        codeLensLabel,
        command,
      });
    })
  );
};
