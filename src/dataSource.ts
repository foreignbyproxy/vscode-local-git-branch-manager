import { Logger } from "./logger";
import { Disposable } from "./disposable";

import { GitExecutable } from "./types";

export class DataSource extends Disposable {
	private readonly logger: Logger;
	private gitExecutable!: GitExecutable | null;

	constructor(gitExecutable: GitExecutable | null, logger: Logger) {
		super();
		this.logger = logger;
		this.gitExecutable = gitExecutable;
	}

	public getBranches() {
		this.logger.log("Getting branches");
		return [];
	}
}
