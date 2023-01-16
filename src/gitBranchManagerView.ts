import * as path from "path";
import * as vscode from "vscode";
import { Logger } from "./logger";
import { GitManager } from "./gitManager";

import { Disposable } from "./disposable";

export class GitBranchManagerView extends Disposable {
	public static currentView: GitBranchManagerView | undefined;

	private readonly gitManager: GitManager;
	private readonly panel: vscode.WebviewPanel;
	private readonly logger: Logger;

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
			.then((branches) => {
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
		return branches.join(",");
	}
}
