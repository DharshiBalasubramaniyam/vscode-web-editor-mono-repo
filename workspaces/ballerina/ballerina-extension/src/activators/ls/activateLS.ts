import * as vscode from "vscode";
import { ExtendedLanguageClient } from "../../extended-language-client";
import { LanguageClientOptions, State as LS_STATE } from "vscode-languageclient";
import { balExtInstance, LANGUAGE, WEB_IDE_SCHEME } from "../../extension";
import { EXTENSION_ID, LANGUAGE_CLIENT_ID, LANGUAGE_CLIENT_NAME, MESSAGES, PALETTE_COMMANDS, SERVER_BASE_URL } from "../../utils/constants";
import { log, outputChannel } from "../editer-support/output-channel";

export async function activateLanguageServer(): Promise<ExtendedLanguageClient> {

    // Register show logs command.
    balExtInstance.context.subscriptions.push(
        vscode.commands.registerCommand(PALETTE_COMMANDS.SHOW_LOGS, () => {
            outputChannel.show();
        })
    );

    // activate status bar
    const statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    balExtInstance.statusBar = statusBar;
    updateStatusBarText(statusBar, MESSAGES.BALLERINA_DETECTING);
    statusBar.command = PALETTE_COMMANDS.SHOW_LOGS;
    statusBar.show();
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor.document.uri.scheme === WEB_IDE_SCHEME && editor.document.languageId === LANGUAGE.BALLERINA) {
            statusBar.show();
        } else {
            statusBar.hide();
        }
    });

    // activate language server
    const langClient = createExtendedLanguageClient(balExtInstance.context);
    await langClient.start();
    if (langClient.state === LS_STATE.Stopped) {
        // If the language server is not running, show an error message in the status bar
        // and log the message to output channel.
        updateStatusBarText(statusBar, MESSAGES.BALLERINA_NOT_FOUND, "statusBarItem.errorBackground");
        log(MESSAGES.LS_CONNECTION_ERROR);
        
    } else if (langClient.state === LS_STATE.Running) {
        // If the language server is running, register extended capabilities.
        await langClient?.registerExtendedAPICapabilities();
        // Get the ballerina version details from the server and update the status bar text
        // and output channel.
        const balInfo = await getBallerinaInfo(statusBar);
        balExtInstance.ballerinaVersion = balInfo.ballerinaVersion;
        balExtInstance.ballerinaVersionText = balInfo.ballerinaVersionText;
        updateStatusBarText(statusBar, `Ballerina ${balInfo.ballerinaVersionText}`);
        const extension = vscode.extensions.getExtension(EXTENSION_ID);
        const pluginVersion = extension.packageJSON.version.split('-')[0];
        log(`Plugin version: ${pluginVersion}\nBallerina version: ${balInfo.ballerinaVersionText}`);
        balExtInstance.langClient = langClient;
        balExtInstance.context?.subscriptions.push(langClient);
    }

    // langClient.start().then(async () => {
    //     console.log('Language client started successfully. Registering extended capabilities...');
    //     await langClient?.registerExtendedAPICapabilities();

    // }).catch((error: any) => {
    //     balExtInstance.context?.subscriptions.push(langClient);
    //     statusBar.text = "Ballerina Not found";
    //     console.error('Failed to start language client:', error);
    // });
    
    return langClient;
}

function createExtendedLanguageClient(context: vscode.ExtensionContext): ExtendedLanguageClient {
    const serverMain = vscode.Uri.joinPath(context.extensionUri, '/dist/browserServerMain.js');
    const worker = new Worker(serverMain.toString(true));
    return new ExtendedLanguageClient(LANGUAGE_CLIENT_ID, LANGUAGE_CLIENT_NAME, getClientOptions(), worker, context);
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
            "supportBalaScheme": "true",
            "supportQuickPick": "true",
            "supportPositionalRenamePopup": "true"
        },
        outputChannel: outputChannel,
    };
}

async function getBallerinaInfo(statusBar: vscode.StatusBarItem) {
    const balInfo = await fetch(`${SERVER_BASE_URL}/bala/info`);
    console.log("sending request to: ", `${SERVER_BASE_URL}/bala/info`);
    if (!balInfo.ok) {
        statusBar.text = MESSAGES.BALLERINA_NOT_FOUND;
    }
    const data = await balInfo.json();

    return data;
}

async function updateStatusBarText(statusBar: vscode.StatusBarItem, text: string, backgroundColor?: string) {
    statusBar.text = text;
    if (backgroundColor) {
        statusBar.backgroundColor = new vscode.ThemeColor(backgroundColor);
    }
}
