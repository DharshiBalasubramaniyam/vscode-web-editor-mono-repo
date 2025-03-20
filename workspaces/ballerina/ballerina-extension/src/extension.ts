import * as vscode from 'vscode';
import { ExtendedLanguageClient } from './extended-language-client';
import { BalFileSystemProvider } from './activators/fs/BalFileSystemProvider';
import { activateVisualizer } from './activators/visualizer/activateVisualizer';
import { RPCLayer } from './RPCLayer';
import { StateMachine } from './state-machine';
import { activateEditorSupport } from './activators/editer-support/activator';

export const WEB_IDE_SCHEME = 'web-bala';
export const STD_LIB_SCHEME = 'bala';

export class BallerinaExtension {
	public context!: vscode.ExtensionContext;
	public langClient?: ExtendedLanguageClient;
	public fsProvider?: BalFileSystemProvider;
	public activeBalFileUri?: string | undefined;
	public statusBar: vscode.StatusBarItem;
	public ballerinaVersion: string;
	public ballerinaVersionText: string;
}

export const balExtInstance: BallerinaExtension = new BallerinaExtension();

export enum LANGUAGE {
	BALLERINA = 'ballerina',
	BAL_TOML = 'Ballerina.toml',
	TOML = 'toml'
}

export async function activate(context: vscode.ExtensionContext) {
	balExtInstance.context = context;

    RPCLayer.init();
    await StateMachine.initialize();
	activateVisualizer(balExtInstance);
	activateEditorSupport(balExtInstance);

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
