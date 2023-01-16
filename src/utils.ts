import * as vscode from "vscode";

export function getWorkspaceUri() {
	const firstWorkplaceFolder = null;

	if (!vscode.workspace.workspaceFolders?.length) {
		return firstWorkplaceFolder;
	}

	return vscode.workspace.getWorkspaceFolder(vscode.workspace.workspaceFolders[0].uri) || null;
}
