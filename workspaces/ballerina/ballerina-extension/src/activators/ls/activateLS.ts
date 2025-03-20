import * as vscode from "vscode";
import { ExtendedLanguageClient } from "../../extended-language-client";
import { LanguageClientOptions } from "vscode-languageclient";
import { balExtInstance, LANGUAGE, WEB_IDE_SCHEME } from "../../extension";
import { SERVER_BASE_URL } from "../../utils/constants";

export function activateLanguageServer(): ExtendedLanguageClient {

    // activate status bar
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    balExtInstance.statusBar = statusBar;
    statusBar.text = "Ballerina detecting";
    statusBar.show();
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor.document.uri.scheme === WEB_IDE_SCHEME && editor.document.languageId === 'ballerina') {
            statusBar.show();
        } else {
            statusBar.hide();
        }
    });

    // activate language server
    const langClient = createExtendedLanguageClient(balExtInstance.context);
    langClient.start().then(async () => {
        console.log('Language client started successfully. Registering extended capabilities...');
        await langClient?.registerExtendedAPICapabilities();
        await getBallerinaVersion(statusBar);
    }).catch((error: any) => {
        balExtInstance.context?.subscriptions.push(langClient);
        statusBar.text = "Ballerina Not found";
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
            { scheme: 'file', language: LANGUAGE.BALLERINA },
            { scheme: 'file', language: LANGUAGE.TOML },
            { scheme: WEB_IDE_SCHEME, language: LANGUAGE.BALLERINA },
            { scheme: WEB_IDE_SCHEME, language: LANGUAGE.TOML }
        ],
        synchronize: { configurationSection: LANGUAGE.BALLERINA },
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

async function getBallerinaVersion(statusBar: vscode.StatusBarItem) {
    const balInfo = await fetch(`${SERVER_BASE_URL}/bala/info`);
    console.log("sending request to: ", `${SERVER_BASE_URL}/bala/info`);
    if (!balInfo.ok) {
        statusBar.text = "Ballerina not found";
    }
    const data = await balInfo.json();
    statusBar.text = `Ballerina ${data.ballerinaVersionText}`;
    balExtInstance.ballerinaVersion = data.ballerinaVersion;
    balExtInstance.ballerinaVersionText = data.ballerinaVersionText;
}
