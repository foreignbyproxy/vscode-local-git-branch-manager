import * as vscode from "vscode";
import { Disposable } from "./disposable";

export class Logger extends Disposable {
	private readonly channel: vscode.OutputChannel;

	constructor() {
		super();
		this.channel = vscode.window.createOutputChannel("Git Branch Manager");
		this.registerDisposable(this.channel);
	}

	public log(message: string) {
		//TODO: Format date for logger
		const date = Date.now();
		this.channel.appendLine("[" + date + "] " + message);
	}

	public error(message: string) {
		this.log("ERROR: " + message);
	}
}
