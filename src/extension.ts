import * as vscode from 'vscode';
import * as uuid from 'uuid';

function uuidV4Base64(): string {
	return uuid.v4(null, Buffer.alloc(16)).toString("base64").substring(0, 22);
}

export function activate(context: vscode.ExtensionContext) {

	context.subscriptions.push(vscode.commands.registerCommand('genbase64uuid.base64uuid', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(edit => editor.selections.forEach(v => edit.replace(v, uuidV4Base64())));
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('genbase64uuid.dasheduuid', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(edit => editor.selections.forEach(v => edit.replace(v, uuid.v4())));
		}
	}));
}

export function deactivate() { }
