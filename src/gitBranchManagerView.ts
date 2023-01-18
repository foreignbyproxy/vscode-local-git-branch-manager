import * as path from "path";
import * as vscode from "vscode";
import { Logger } from "./logger";
import { GitManager } from "./gitManager";

import { Disposable } from "./disposable";

import { transformGetBranchesOutput } from "./utils";

export class GitBranchManagerView extends Disposable {
	public static currentView: GitBranchManagerView | undefined;

	private readonly logger: Logger;
	private readonly gitManager: GitManager;
	private readonly context: vscode.ExtensionContext;

	private readonly panel: vscode.WebviewPanel;

	public static createOrShow(
		context: vscode.ExtensionContext,
		gitManager: GitManager,
		logger: Logger
	) {
		if (GitBranchManagerView.currentView) {
			logger.log("Show current view");
			GitBranchManagerView.currentView.reveal();
		} else {
			logger.log("Creating new view");
			GitBranchManagerView.currentView = new GitBranchManagerView(
				context,
				gitManager,
				logger
			);
		}
	}

	private constructor(context: vscode.ExtensionContext, gitManager: GitManager, logger: Logger) {
		super();

		this.logger = logger;
		this.gitManager = gitManager;
		this.context = context;

		this.panel = vscode.window.createWebviewPanel(
			"git-branch-manager",
			"Git Branch Manager",
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "media"))],
			}
		);

		this.update();
	}

	/**
	 * Update the HTML document loaded in the Webview.
	 */
	private update() {
		return this.gitManager
			.getBranches()
			.then((results) => {
				const branches = transformGetBranchesOutput(results);
				this.panel.webview.html = this.getHtmlForWebview(branches);
			})
			.catch((err: Error) => {
				this.logger.error(err.message);
				vscode.window.showErrorMessage(
					"Could not get branches. Make sure Git is accessible and the workspace contains a Git respository."
				);
				return;
			});
	}

	/**
	 * Update the HTML document loaded in the Webview.
	 */
	private reveal() {
		this.panel.reveal();
	}

	/**
	 * Get the HTML document to be loaded in the Webview.
	 * @returns The HTML.
	 */
	private getHtmlForWebview(branches: string[]) {
		const myStyle = this.panel.webview.asWebviewUri(
			vscode.Uri.joinPath(this.context.extensionUri, "media", "gitBranchManager.css")
		);

		return /*html*/ `<!DOCTYPE html>
		<html lang="en">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>Git Branch Manager</title>
				<link href="${myStyle}" rel="stylesheet" />
			</head>
			<body>
				<div id="view">
					<form id="git-branch-manager-form" action="">
						<div id="header">
							<button type="submit">Delete</button>
							<button type="reset">Clear</button>
						</div>
						<table id="branch-table">
							<thead>
								<tr>
									<td></td>
									<td>Branch Name</td>
									<td>Last Commit</td>
									<td>Last Commit (Date)</td>
									<td>Has Remote?</td>
								</tr>
							</thead>
							<tbody>
								${this.getBranchTableRows(branches)}
							</tbody>
						</table>
					</form>
				</div>
			</body>
			<script>
				const form = document.getElementById("git-branch-manager-form");
				form.addEventListener("submit", function (event) {
					event.preventDefault();
					const form = event.currentTarget;
					const formData = new FormData(form);
					const selectedBranches = formData.getAll('branch');
					console.log(selectedBranches);
				});
			</script>
		</html>`;
	}

	private getBranchTableRows(branches: string[]) {
		let output = "";

		branches.forEach((branch, index) => {
			const id = `branch-${index}`;

			output += /* html */ `
				<tr>
					<td>
						<label for="${id}">
							<input id="${id}" name="branch" type="checkbox" value="${branch}">
						</label>
					</td>
					<td>${branch}</td>
					<td></td>
					<td></td>
					<td></td>
				</tr>
			`;
		});

		return output;
	}
}
