import * as vscode from "vscode";
import { ExtendedLanguageClient } from "../../extended-language-client";
import { LanguageClientOptions } from "vscode-languageclient";
import { balExtInstance, WEB_IDE_SCHEME } from "../../extension";

export function activateLanguageServer(): ExtendedLanguageClient {
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    statusBar.text = "Ballerina detecting";
    statusBar.show();
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor.document.uri.scheme === WEB_IDE_SCHEME && editor.document.languageId === 'ballerina') {
            statusBar.show();
        } else {
            statusBar.hide();
        }
    });
    const langClient = createExtendedLanguageClient(balExtInstance.context);
	langClient.start().then(async () => {
        console.log('Language client started successfully. Registering extended capabilities...');
		await langClient?.registerExtendedAPICapabilities();
    }).catch((error: any) => {
	balExtInstance.context?.subscriptions.push(langClient);
        console.error('Failed to start language client:', error);
    });
    balExtInstance.langClient = langClient;
	balExtInstance.context?.subscriptions.push(langClient);
    return langClient;
}

function createExtendedLanguageClient(context: vscode.ExtensionContext): ExtendedLanguageClient {
    const serverMain = vscode.Uri.joinPath(context.extensionUri, '/dist/browserServerMain.js');
    console.log(context.extensionUri, '/dist/browserServerMain.js');
    const worker = new Worker(serverMain.toString(true));
    console.log('Worker created with script:', serverMain.toString(true));
    return new ExtendedLanguageClient('ballerinalangClient', 'Ballerina Language Client', getClientOptions(), worker, context);
}

function getClientOptions(): LanguageClientOptions {
    return {
        documentSelector: [
            { scheme: 'file', language: "ballerina" },
            { scheme: 'file', language: "toml"},
            { scheme: WEB_IDE_SCHEME, language: "ballerina" },
            { scheme: WEB_IDE_SCHEME, language: "toml"}
        ],
        synchronize: { configurationSection: "ballerina" },
        initializationOptions: {
            "enableSemanticHighlighting": <string>vscode.workspace.getConfiguration().get("kolab.enableSemanticHighlighting"),
            "enableInlayHints": <string>vscode.workspace.getConfiguration().get("kolab.enableInlayHints"),
            "supportBalaScheme": "true",
            "supportQuickPick": "true",
            "supportPositionalRenamePopup": "true"
        },
        outputChannel: vscode.window.createOutputChannel('Ballerina'),
        traceOutputChannel: vscode.window.createOutputChannel('Trace'),
    };
}
