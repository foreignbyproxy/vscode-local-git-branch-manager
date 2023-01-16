import * as cp from "child_process";
import * as vscode from "vscode";

import { Logger } from "./logger";
import { Disposable } from "./disposable";

export class GitManager extends Disposable {
	private readonly logger: Logger;
	private workspaceFolder: vscode.WorkspaceFolder | null;

	constructor(workspaceFolder: vscode.WorkspaceFolder | null, logger: Logger) {
		super();
		this.logger = logger;
		this.workspaceFolder = workspaceFolder;
	}

	public canUseGit() {
		return this.runGitCommand(`git --version`)
			.then(() => {
				return true;
			})
			.catch((_) => {
				return false;
			});
	}

	public getBranches() {
		this.logger.log("Getting branches");
		return this.runGitCommand(`git branch`).then((results) => {
			return [results];
		});
	}

	public setWorkspace(workspaceFolder: vscode.WorkspaceFolder) {
		this.workspaceFolder = workspaceFolder;
	}

	private runGitCommand(command: string) {
		return new Promise<string>((resolve, reject) => {
			if (!this.workspaceFolder) {
				reject(new Error("Workspace is not set."));
				return;
			}

			cp.exec(
				command,
				{
					cwd: this.workspaceFolder.uri.fsPath,
				},
				(error, stdout, stderr) => {
					if (!error) {
						resolve(stdout);
					}

					reject(new Error(stderr));
				}
			);
		});
	}
}
