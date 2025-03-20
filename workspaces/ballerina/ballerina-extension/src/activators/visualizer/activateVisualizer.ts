import * as vscode from "vscode";
import { BallerinaExtension } from "../../extension";
import { openView } from "../../state-machine";
import { EVENT_TYPE } from '@dharshi/ballerina-core';
import { PALETTE_COMMANDS } from "../../utils/constants";

export function activateVisualizer(ext: BallerinaExtension) {
	// Register command to open visualizer
	ext.context.subscriptions.push(
		vscode.commands.registerCommand(PALETTE_COMMANDS.SHOW_VISUALIZER, async (path: vscode.Uri, position, resetHistory = false) => {
			openView(EVENT_TYPE.OPEN_VIEW, { documentUri: path.toString(), position: position }, resetHistory);
		}
	));

}
