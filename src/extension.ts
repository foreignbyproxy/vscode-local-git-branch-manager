import * as vscode from "vscode";

import { Config } from "./config";
import { DataSource } from "./dataSource";
import { Logger } from "./logger";
import { CommandManager } from "./commands";

import { getGitExecutable } from "./utils";

export async function activate(context: vscode.ExtensionContext) {
	const logger = new Logger();
	logger.log("Starting Git Branch Manager");

	const config = new Config();
	const gitExecutable = await getGitExecutable(context, config);

	const dataSource = new DataSource(gitExecutable, logger);
	const commandManager = new CommandManager(context, dataSource, logger);

	context.subscriptions.push(dataSource, commandManager, logger);

	logger.log("Started Git Branch Manager");
}

export function deactivate() {}
