import * as cp from "child_process";

import { Logger } from "./logger";
import { Disposable } from "./disposable";

export class GitManager extends Disposable {
	private readonly logger: Logger;

	constructor(logger: Logger) {
		super();
		this.logger = logger;
	}

	public canUseGit() {
		this.runGitCommand(`git --version`).catch((_) => {
			return false;
		});

		return true;
	}

	public getBranches() {
		this.logger.log("Getting branches");
		return ["fake-branch"];
	}

	private runGitCommand(command: string) {
		return new Promise<string>((resolve, reject) => {
			cp.exec(command, (error, stdout, stderr) => {
				if (!error) {
					resolve(stdout);
				}

				reject(stderr);
			});
		});
	}
}
