import * as vscode from "vscode";
import * as cp from "child_process";

import { Config } from "./config";

import { GitExecutable } from "./types";

export function getGitExecutable(_: vscode.ExtensionContext, config: Config) {
	const [configGitPath] = config.gitPaths;

	return new Promise<GitExecutable>((resolve, reject) => {
		if (configGitPath) {
			cp.exec(`${configGitPath} --version`, (error, stdout, stderr) => {
				if (!error) {
					resolve({
						path: configGitPath,
						version: stdout
							.toString()
							.trim()
							.replace(/^git version /, ""),
					});
				} else {
					reject(stderr);
				}
			});
		}

		throw new Error("Could not locate Git Executable");
	});
}
