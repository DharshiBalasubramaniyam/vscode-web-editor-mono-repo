import * as vscode from "vscode";
import { BallerinaExtension } from "../../extension";
import { openView } from "../../state-machine";
import { BI_COMMANDS, EVENT_TYPE, MACHINE_VIEW, SHARED_COMMANDS } from '@dharshi/ballerina-core';

export function activateVisualizer(ext: BallerinaExtension) {
	ext.context.subscriptions.push(
		vscode.commands.registerCommand('ballerina.showVisualizer', (path: vscode.Uri, position, resetHistory = false) => {
			openView(EVENT_TYPE.OPEN_VIEW, { documentUri: path?.path || vscode.window.activeTextEditor?.document.uri.path, position: position }, resetHistory);
		}
	));

}
