import * as vscode from "vscode";

import { GitBranchManagerView } from "./gitBranchManagerView";
import { Logger } from "./logger";
import { GitManager } from "./gitManager";

import { Disposable } from "./disposable";

export class CommandManager extends Disposable {
	private readonly gitManager: GitManager;
	private readonly context: vscode.ExtensionContext;
	private readonly logger: Logger;

	constructor(context: vscode.ExtensionContext, gitManager: GitManager, logger: Logger) {
		super();
		this.context = context;
		this.gitManager = gitManager;
		this.logger = logger;

		// Register Command
		vscode.commands.registerCommand("git-branch-manager.view", (...args) => {
			this.logger.log("Command: git-branch-manager.view");
			this.view(args);
		});
	}

	/* Commands */
	private async view(arg: any) {
		GitBranchManagerView.createOrShow(this.context, this.gitManager, this.logger);
	}
}
