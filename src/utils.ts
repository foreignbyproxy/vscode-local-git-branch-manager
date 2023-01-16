import * as vscode from "vscode";

const EOL_REGEX = /\r\n|\r|\n/g;

export function getWorkspaceUri() {
	const firstWorkplaceFolder = null;

	if (!vscode.workspace.workspaceFolders?.length) {
		return firstWorkplaceFolder;
	}

	return vscode.workspace.getWorkspaceFolder(vscode.workspace.workspaceFolders[0].uri) || null;
}

export function transformGetBranchesOutput(input: string) {
	return input
		.split(EOL_REGEX)
		.filter(Boolean)
		.map((branch) => {
			return branch.trim().replace("* ", "");
		});
}
