import * as vscode from "vscode";
import { Logger } from "./logger";

export async function activate(context: vscode.ExtensionContext) {
	const logger = new Logger();
	logger.log("Starting Git Branch Manager");
	logger.log("Started Git Branch Manager");
}

export function deactivate() {}
