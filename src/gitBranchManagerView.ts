import * as path from "path";
import * as vscode from "vscode";
import { Logger } from "./logger";

import { Disposable } from "./disposable";

export class GitBranchManagerView extends Disposable {
	public static currentPanel: GitBranchManagerView | undefined;

	private readonly panel: vscode.WebviewPanel;

	public static createOrShow(context: vscode.ExtensionContext, logger: Logger) {
		if (GitBranchManagerView.currentPanel) {
			logger.log("Show current view");
		} else {
			logger.log("Creating new view");
			GitBranchManagerView.currentPanel = new GitBranchManagerView(context);
		}
	}

	private constructor(context: vscode.ExtensionContext) {
		super();

		this.panel = vscode.window.createWebviewPanel(
			"git-branch-manager",
			"Git Branch Manager",
			vscode.ViewColumn.One,
			{
				enableScripts: true,
				localResourceRoots: [vscode.Uri.file(path.join(context.extensionPath, "media"))],
			}
		);
	}

	/**
	 * Update the HTML document loaded in the Webview.
	 */
	private update() {
		this.panel.webview.html = this.getHtmlForWebview();
	}

	/**
	 * Get the HTML document to be loaded in the Webview.
	 * @returns The HTML.
	 */
	private getHtmlForWebview() {
		return "New HTML";
	}
}
