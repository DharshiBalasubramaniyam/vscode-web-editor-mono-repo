import * as vscode from "vscode";
import { ExtendedLanguageClient } from "../../extended-language-client";
import { LanguageClientOptions } from "vscode-languageclient";
import { BallerinaExtension, WEB_IDE_SCHEME } from "../../extension";

export function activateLanguageServer(ext: BallerinaExtension) {
    const langClient = createExtendedLanguageClient(ext.context);
	langClient.start().then(async () => {
        console.log('Language client started successfully. Registering extended capabilities...');
		await langClient?.registerExtendedAPICapabilities();
    }).catch((error: any) => {
        console.error('Failed to start language client:', error);
    });
    ext.langClient = langClient;
	ext.context?.subscriptions.push(langClient);
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
