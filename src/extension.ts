import * as vscode from "vscode";

import { Logger } from "./logger";
// import { Config } from "./config";
import { GitManager } from "./gitManager";
import { GitBranchManagerView } from "./gitBranchManagerView";

import { getWorkspaceUri } from "./utils";

export async function activate(context: vscode.ExtensionContext) {
	const logger = new Logger();
	logger.log("Starting Git Branch Manager");

	// const config = new Config();
	const workspaceFolder = getWorkspaceUri();
	const gitManager = new GitManager(workspaceFolder, logger);
	const gitCheck = await gitManager.canUseGit();

	vscode.commands.registerCommand("git-branch-manager.view", () => {
		if (workspaceFolder && gitCheck) {
			logger.log("Command: git-branch-manager.view");
			GitBranchManagerView.createOrShow(context, gitManager, logger);
		} else {
			vscode.window.showErrorMessage("Could not access Git and/or workspace.");
		}
	});

	context.subscriptions.push(gitManager, logger);

	logger.log("Started Git Branch Manager");
}

export function deactivate() {}
