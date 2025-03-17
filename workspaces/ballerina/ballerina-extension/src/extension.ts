import * as vscode from 'vscode';
import { ExtendedLanguageClient } from './extended-language-client';
import { BalFileSystemProvider } from './activators/fs/BalFileSystemProvider';
import { activateVisualizer } from './activators/visualizer/activateVisualizer';
import { RPCLayer } from './RPCLayer';
import { StateMachine } from './state-machine';

export const WEB_IDE_SCHEME = 'web-bala';
export const STD_LIB_SCHEME = 'bala';
export const ENABLE_EXPERIMENTAL_FEATURES = "kolab.experimental";
export const ENABLE_SEQUENCE_DIAGRAM_VIEW = "kolab.enableSequenceDiagramView";
export const ENABLE_AI_SUGGESTIONS = "kolab.enableAiSuggestions";

export class BallerinaExtension {
	public context!: vscode.ExtensionContext;
	public langClient?: ExtendedLanguageClient;
	public fsProvider?: BalFileSystemProvider;
	public balServerUrl: string;
	public activeBalFileUri?: string | undefined;
	public statusBar: vscode.StatusBarItem;

	init() {
		this.balServerUrl = "http://localhost:9091";
	}

	public enabledExperimentalFeatures(): boolean {
        return <boolean>vscode.workspace.getConfiguration().get(ENABLE_EXPERIMENTAL_FEATURES);
    }

	public enableSequenceDiagramView(): boolean {
        return <boolean>vscode.workspace.getConfiguration().get(ENABLE_SEQUENCE_DIAGRAM_VIEW);
    }

    public enableAiSuggestions(): boolean {
        return <boolean>vscode.workspace.getConfiguration().get(ENABLE_AI_SUGGESTIONS);
    }
}

export const balExtInstance: BallerinaExtension = new BallerinaExtension();

export async function activate(context: vscode.ExtensionContext) {
	balExtInstance.context = context;

	// Init RPC Layer methods
    RPCLayer.init();
    // Wait for the ballerina extension to be ready
    await StateMachine.initialize();

	// activate visualizer
	activateVisualizer(balExtInstance);

}

export async function deactivate(): Promise<void> {
	const workspaceFolders = vscode.workspace.workspaceFolders;
	if (workspaceFolders) {
		for (const folder of workspaceFolders) {
			if (folder.uri.scheme === WEB_IDE_SCHEME) {
				balExtInstance.fsProvider?.delete(folder.uri);
			}
		}
	}
	if (balExtInstance.langClient) {
		await balExtInstance.langClient.stop();
		balExtInstance.langClient = undefined;
	}
}
