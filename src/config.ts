import * as vscode from "vscode";

import { DeleteStrategy } from "./types";

export class Config {
	private readonly config: vscode.WorkspaceConfiguration;

	constructor() {
		this.config = vscode.workspace.getConfiguration("git-branch-manager");
	}

	get deletionStrategy() {
		return this.config.get<DeleteStrategy>("delete-strategy");
	}
}
