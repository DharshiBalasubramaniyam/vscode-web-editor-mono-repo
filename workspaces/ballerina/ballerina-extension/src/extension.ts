import * as vscode from 'vscode';
import { LanguageClientOptions } from 'vscode-languageclient/browser';
import { ExtendedLanguageClient } from './extended-language-client';
import { activateLanguageServer } from './activators/ls/activateLS';
import { BalFileSystemProvider } from './activators/fs/BalFileSystemProvider';
import { activateFileSystemProvider } from './activators/fs/activateFS';
import { activateVisualizer } from './activators/visualizer/activateVisualizer';

export const WEB_IDE_SCHEME = 'web-bala';
export const STD_LIB_SCHEME = 'bala';

export class BallerinaExtension {
	public context!: vscode.ExtensionContext;
	public langClient?: ExtendedLanguageClient;
	public fsProvider?: BalFileSystemProvider;
}

export const balExtInstance: BallerinaExtension = new BallerinaExtension();

export async function activate(context: vscode.ExtensionContext) {
	balExtInstance.context = context;

	// Start language client
	activateLanguageServer(balExtInstance);

	// register file system provider
	activateFileSystemProvider(balExtInstance);

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
