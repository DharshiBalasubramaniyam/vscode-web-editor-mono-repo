import { commands, Range, Selection, Uri, ViewColumn, window } from "vscode";
import { BallerinaExtension, LANGUAGE } from "../../extension";
import { openView, StateMachine } from "../../state-machine";
import { EVENT_TYPE, MACHINE_VIEW } from '@dharshi/ballerina-core';
import { PALETTE_COMMANDS } from "../../utils/constants";
import { checkIsPersistModelFile } from "../../utils/commonUtils";

export function activateVisualizer(ext: BallerinaExtension) {
	// Register command to open visualizer
	ext.context.subscriptions.push(
		commands.registerCommand(PALETTE_COMMANDS.SHOW_VISUALIZER, async (path: Uri, position, resetHistory = false) => {
			console.log("Opening visualizer for: ", {
				path, position, resetHistory
			});
			openView(EVENT_TYPE.OPEN_VIEW, { documentUri: path.toString(), position: position }, resetHistory);
		}
		));

	// Register command to show the source of the visual
	ext.context.subscriptions.push(
		commands.registerCommand(PALETTE_COMMANDS.SHOW_SOURCE, async () => {
			const path = StateMachine.context().documentUri;
			const position = StateMachine.context().position;
			if (!path || !position || !("startLine" in position)) {
				return;
			}
			const { startLine, startColumn, endColumn, endLine } = StateMachine.context().position;
			const editor = await window.showTextDocument(Uri.parse(path));
			const range = new Range(startLine, startColumn, endLine, endColumn);
			editor.selection = new Selection(range.start, range.end);
			editor.revealRange(range);
		}
		));

	ext.context.subscriptions.push(
		commands.registerCommand(PALETTE_COMMANDS.SHOW_ENTITY_DIAGRAM, (path, position = {}, selectedRecord = "") => {
			openView(EVENT_TYPE.OPEN_VIEW, { view: MACHINE_VIEW.ERDiagram, documentUri: path.toString(), identifier: selectedRecord });
		})
	);

	// Track active ballerina text file
	window.onDidChangeActiveTextEditor(editor => {
		if (editor && editor.document.languageId === LANGUAGE.BALLERINA && checkIsPersistModelFile(editor.document.uri)) {
			commands.executeCommand('setContext', 'isPersistModelActive', true);
		} else {
			commands.executeCommand('setContext', 'isPersistModelActive', false);
		}
	});

}
