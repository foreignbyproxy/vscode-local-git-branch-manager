import * as path from "path";
import * as vscode from "vscode";
import { Logger } from "./logger";
import { DataSource } from "./dataSource";

import { Disposable } from "./disposable";

export class GitBranchManagerView extends Disposable {
	public static currentPanel: GitBranchManagerView | undefined;

	private readonly dataSource: DataSource;
	private readonly panel: vscode.WebviewPanel;

	public static createOrShow(
		context: vscode.ExtensionContext,
		dataSource: DataSource,
		logger: Logger
	) {
		if (GitBranchManagerView.currentPanel) {
			logger.log("Show current view");
		} else {
			logger.log("Creating new view");
			GitBranchManagerView.currentPanel = new GitBranchManagerView(context, dataSource);
		}
	}

	private constructor(context: vscode.ExtensionContext, dataSource: DataSource) {
		super();

		this.dataSource = dataSource;

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
		const branches = this.dataSource.getBranches();
		this.panel.webview.html = this.getHtmlForWebview(branches);
	}

	/**
	 * Get the HTML document to be loaded in the Webview.
	 * @returns The HTML.
	 */
	private getHtmlForWebview(branches: string[]) {
		return branches.join(",");
	}
}
