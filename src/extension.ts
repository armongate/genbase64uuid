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
	context.subscriptions.push(vscode.commands.registerCommand('genbase64uuid.todasheduuid', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(edit => editor.selections.forEach(v => {
				const txt = editor.document.getText(v);
				try {
					const hex = Buffer.from(txt, "base64").toString("hex");
					const dashed = [hex.substring(0, 8), hex.substring(8, 12),
					hex.substring(12, 16), hex.substring(16, 20), hex.substring(20)].join("-");
					if (!uuid.validate(dashed)) {
						vscode.window.showErrorMessage(dashed + " is not a uuid v4");
						return;
					}
					edit.replace(v, dashed);
				} catch (error) {
					vscode.window.showErrorMessage(error.message || error);
					return;
				}
			}));
		}
	}));
	context.subscriptions.push(vscode.commands.registerCommand('genbase64uuid.tobase64uuid', () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			editor.edit(edit => editor.selections.forEach(v => {
				const txt = editor.document.getText(v);
				if (!uuid.validate(txt)) {
					vscode.window.showErrorMessage(txt + " is not a uuid v4");
					return;
				}
				try {
					const base64 = Buffer.from(txt.replace(/-/gi, ""), "hex").toString("base64").substring(0, 22);
					edit.replace(v, base64);
				} catch (error) {
					vscode.window.showErrorMessage(error.message || error);
					return;
				}
			}));
		}
	}));
}

export function deactivate() { }
