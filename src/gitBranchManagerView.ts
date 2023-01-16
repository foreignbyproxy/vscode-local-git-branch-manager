import * as path from "path";
import * as vscode from "vscode";
import { Logger } from "./logger";
import { GitManager } from "./gitManager";

import { Disposable } from "./disposable";

export class GitBranchManagerView extends Disposable {
	public static currentView: GitBranchManagerView | undefined;

	private readonly gitManager: GitManager;
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
			GitBranchManagerView.currentView = new GitBranchManagerView(context, gitManager);
		}
	}

	private constructor(context: vscode.ExtensionContext, gitManager: GitManager) {
		super();

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
		const branches = this.gitManager.getBranches();
		this.panel.webview.html = this.getHtmlForWebview(branches);
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
