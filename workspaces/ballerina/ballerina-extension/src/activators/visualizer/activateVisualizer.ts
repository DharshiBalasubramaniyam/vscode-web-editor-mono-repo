import * as vscode from "vscode";
import { BallerinaExtension } from "../../extension";
import { VisualizerWebview } from "./webview";
import { History, MACHINE_VIEW, UndoRedoManager, VisualizerLocation } from "@dharshi/ballerina-core";

const visualizerLocation: VisualizerLocation = {
	view: MACHINE_VIEW.Overview
};

export let history: History;
export let undoRedoManager: UndoRedoManager;

export function activateVisualizer(ext: BallerinaExtension) {
    ext.context.subscriptions.push(vscode.commands.registerCommand('ballerina.showVisualizer', (path: vscode.Uri, position, resetHistory = false) => {

		visualizerLocation.documentUri = path?.fsPath || vscode.window.activeTextEditor?.document.uri.fsPath;
		visualizerLocation.position = position;

		if (resetHistory) {
			history.clear();
		}

		vscode.window.showInformationMessage('Showing visualizer from ballerina!');
		openView(visualizerLocation);
		findView(ext);

	}));

	
}

export function openView(location: VisualizerLocation) {
	if (!VisualizerWebview.currentPanel) {
		VisualizerWebview.currentPanel = new VisualizerWebview();
		history = new History();
		undoRedoManager = new UndoRedoManager();
	} else {
		VisualizerWebview.currentPanel!.getWebview()?.reveal();
	}
}

function findView(ext: BallerinaExtension) {
	if (!visualizerLocation.view && ext.langClient) {
		if (!visualizerLocation.position || ("groupId" in visualizerLocation.position)) {
			if (visualizerLocation.isBI) {
				// handle this
			} else {
				history.push({ location: { view: MACHINE_VIEW.Overview, documentUri: visualizerLocation.documentUri } });
			}
		} else {
			// const view = await getView(visualizerLocation.documentUri, visualizerLocation.position, visualizerLocation?.projectUri);
			// history.push(view);
		}
	} else {
		history.push({
			location: {
				view: visualizerLocation.view,
				documentUri: visualizerLocation.documentUri,
				position: visualizerLocation.position,
				identifier: visualizerLocation.identifier,
				type: visualizerLocation?.type,
				isGraphql: visualizerLocation?.isGraphql
			}
		});
	}
}

export function updateView() {
    const historyStack = history.get();
    const lastView = historyStack[historyStack.length - 1];
    // stateService.send({ type: "VIEW_UPDATE", viewLocation: lastView ? lastView.location : { view: "Overview" } });
    // if (StateMachine.context().isBI) {
    //     commands.executeCommand("BI.project-explorer.refresh");
    // }
    // notifyCurrentWebview();
}
