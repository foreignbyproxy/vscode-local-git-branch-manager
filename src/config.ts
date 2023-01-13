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

	get gitPaths() {
		const configValue = vscode.workspace
			.getConfiguration("git")
			.get<string | string[] | null>("path", null);
		if (configValue === null) {
			return [];
		} else if (typeof configValue === "string") {
			return [configValue];
		} else if (Array.isArray(configValue)) {
			return configValue.filter((value) => typeof value === "string");
		} else {
			return [];
		}
	}
}
