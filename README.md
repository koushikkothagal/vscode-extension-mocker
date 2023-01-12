# vscode-extension-mocker README

Extension to mock features of a VS Code extension. Useful in demos and such.

## Features

- Mock inline completions by adding lines to settings
- Mock codelens by selecting a line of text, right click and `Add new Codelens here`. You can then enter the codelens label and choose one of the existing commands to run when the codelens is clicked.

## Extension Settings

`mocker.inlineCompletion.suggestionLines`: List of suggested lines that (when matched) are suggested for inline completion

## Known Issues

The line has to match entirely. Doesn't match if there are other characters in front of or after cursor

## Release Notes

### 1.0.0

Initial release of vscode-extension-mocker

---

**Enjoy!**
