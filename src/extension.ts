import * as vscode from "vscode";

import { Config } from "./config";
import { Logger } from "./logger";

import { getGitExecutable } from "./utils";

export async function activate(context: vscode.ExtensionContext) {
	const logger = new Logger();

	const config = new Config();

	const gitExecutable = await getGitExecutable(context, config);

	logger.log("Starting Git Branch Manager");
	logger.log("Started Git Branch Manager");
}

export function deactivate() {}
