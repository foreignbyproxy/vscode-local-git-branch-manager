import { Logger } from "./logger";
import { Disposable } from "./disposable";

import { GitExecutable } from "./types";

export class DataSource extends Disposable {
	private gitExecutable!: GitExecutable;
	private readonly logger: Logger;

	constructor(gitExecutable: GitExecutable, logger: Logger) {
		super();
		this.logger = logger;
		this.gitExecutable = gitExecutable;
	}

	public getBranches() {
		this.logger.log("Getting branches");
		return ['fake-branch'];
	}
}
