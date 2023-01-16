import * as vscode from "vscode";

import { Config } from "./config";
import { GitManager } from "./gitManager";
import { Logger } from "./logger";
import { CommandManager } from "./commands";

export async function activate(context: vscode.ExtensionContext) {
	const logger = new Logger();
	logger.log("Starting Git Branch Manager");

	// const config = new Config();
	const gitManager = new GitManager(logger);

	const gitCheck = await gitManager.canUseGit();
	if (!gitCheck) {
		vscode.window.showErrorMessage(
			"Could access Git. Please make sure Git is accessible to VScode and try again."
		);
	}

	const commandManager = new CommandManager(context, gitManager, logger);

	context.subscriptions.push(gitManager, commandManager, logger);

	logger.log("Started Git Branch Manager");
}

export function deactivate() {}
