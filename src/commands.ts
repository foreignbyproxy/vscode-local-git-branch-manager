import * as vscode from "vscode";

import { GitBranchManagerView } from "./gitBranchManagerView";
import { Logger } from "./logger";
import { DataSource } from "./dataSource";

import { Disposable } from "./disposable";

export class CommandManager extends Disposable {
	private readonly dataSource: DataSource;
	private readonly context: vscode.ExtensionContext;
	private readonly logger: Logger;

	constructor(context: vscode.ExtensionContext, dataSource: DataSource, logger: Logger) {
		super();
		this.context = context;
		this.logger = logger;
		this.dataSource = dataSource;

		// Register Command
		vscode.commands.registerCommand("git-branch-manager.view", (...args) => {
			this.logger.log("Command Invoked: git-branch-manager.view");
			this.view(args);
		});
	}

	/* Commands */
	private async view(arg: any) {
		GitBranchManagerView.createOrShow(this.context, this.dataSource, this.logger);
	}
}
