export const enum DeleteStrategy {
	justDoIt = "just-do-it",
	doubleCheckEach = "double-check-each",
	doubleCheckOnce = "double-check-once",
	deleteIfHasRemote = "delete-if-has-remote",
}

export interface GitExecutable {
	readonly path: string;
	readonly version: string;
}
