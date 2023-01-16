import * as vscode from "vscode";

import { Logger } from "./logger";
// import { Config } from "./config";
import { GitManager } from "./gitManager";
import { GitBranchManagerView } from "./gitBranchManagerView";

export async function activate(context: vscode.ExtensionContext) {
	const logger = new Logger();
	logger.log("Starting Git Branch Manager");

	// const config = new Config();
	const gitManager = new GitManager(logger);

	const gitCheck = await gitManager.canUseGit();
	if (!gitCheck) {
		vscode.window.showErrorMessage(
			"Could not access Git. Please make sure Git is accessible to VScode and try again."
		);
	}

	vscode.commands.registerCommand("git-branch-manager.view", (...args) => {
		logger.log("Command: git-branch-manager.view");
		GitBranchManagerView.createOrShow(context, gitManager, logger);
	});

	context.subscriptions.push(gitManager, logger);

	logger.log("Started Git Branch Manager");
}

export function deactivate() {}
