import * as vscode from "vscode";
import { debounce } from "lodash";
import { balExtInstance } from "../../extension";
import { getComposerWebViewOptions, getLibraryWebViewContent, WebViewOptions } from "../../utils/webview-utils";
import { RPCLayer } from "../../RPCLayer";
import { StateMachine, updateView } from "../../state-machine";

export class VisualizerWebview {
    public static currentPanel: VisualizerWebview | undefined;
    public static readonly viewType = "ballerina.visualizer";
    public static readonly panelTitle = "Ballerina Visualizer";
    private _panel: vscode.WebviewPanel | undefined;
    private _disposables: vscode.Disposable[] = [];

    constructor() {
        this._panel = VisualizerWebview.createWebview();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.html = this.getWebviewContent(this._panel.webview);
        RPCLayer.create(this._panel);

        // Handle the text change and diagram update with rpc notification
        const sendUpdateNotificationToWebview = debounce(() => {
            if (this._panel) {
                console.log("Sending update notification to webview");
                updateView();
            }
        }, 500);

        vscode.workspace.onDidChangeTextDocument(async function (document) {
            if (document && document.document.languageId === "ballerina") {
                await document.document.save();
                sendUpdateNotificationToWebview();
            }
        }, balExtInstance.context);

        vscode.workspace.onDidDeleteFiles(() => {
            sendUpdateNotificationToWebview();
        });

        this._panel.onDidChangeViewState(() => {
            vscode.commands.executeCommand('setContext', 'isBalVisualizerActive', this._panel?.active);
            // Refresh the webview when becomes active
            if (this._panel?.active) {
                sendUpdateNotificationToWebview();
            }
        });
    }

    private static createWebview(): vscode.WebviewPanel {
        const panel = vscode.window.createWebviewPanel(
            VisualizerWebview.viewType,
            VisualizerWebview.panelTitle,
            vscode.ViewColumn.Beside,
            {
                enableScripts: true,
                localResourceRoots: [vscode.Uri.file(vscode.Uri.joinPath(balExtInstance.context.extensionUri, "resources").toString())],
                retainContextWhenHidden: true,
            }
        );
        panel.iconPath = {
            light: vscode.Uri.parse(vscode.Uri.joinPath(balExtInstance.context.extensionUri, 'resources', 'icons', 'dark-preview.svg').toString()),
            dark: vscode.Uri.parse(vscode.Uri.joinPath(balExtInstance.context.extensionUri, 'resources', 'icons', 'light-preview.svg').toString())
        };
        return panel;
    }

    public getWebview(): vscode.WebviewPanel | undefined {
        return this._panel;
    }

    private getWebviewContent(webView: vscode.Webview) {
        const body = `<div class="container" id="webview-container">
                <div class="loader-wrapper">
                    <div class="loader" /></div>
                </div>
            </div>`;
        const bodyCss = ``;
        const styles = `
            .container {
                background-color: var(--vscode-editor-background);
                height: 100vh;
                width: 100%;
                display: flex;
            }
            .loader-wrapper {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100%;
                width: 100%;
            }
            .loader {
                width: 32px;
                aspect-ratio: 1;
                border-radius: 50%;
                border: 4px solid var(--vscode-button-background);
                animation:
                    l20-1 0.8s infinite linear alternate,
                    l20-2 1.6s infinite linear;
            }
            @keyframes l20-1{
                0%    {clip-path: polygon(50% 50%,0       0,  50%   0%,  50%    0%, 50%    0%, 50%    0%, 50%    0% )}
                12.5% {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100%   0%, 100%   0%, 100%   0% )}
                25%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 100% 100%, 100% 100% )}
                50%   {clip-path: polygon(50% 50%,0       0,  50%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
                62.5% {clip-path: polygon(50% 50%,100%    0, 100%   0%,  100%   0%, 100% 100%, 50%  100%, 0%   100% )}
                75%   {clip-path: polygon(50% 50%,100% 100%, 100% 100%,  100% 100%, 100% 100%, 50%  100%, 0%   100% )}
                100%  {clip-path: polygon(50% 50%,50%  100%,  50% 100%,   50% 100%,  50% 100%, 50%  100%, 0%   100% )}
            }
            @keyframes l20-2{ 
                0%    {transform:scaleY(1)  rotate(0deg)}
                49.99%{transform:scaleY(1)  rotate(135deg)}
                50%   {transform:scaleY(-1) rotate(0deg)}
                100%  {transform:scaleY(-1) rotate(-135deg)}
            }
        `;
        const scripts = `
            function loadedScript() {
                function renderDiagrams() {
                    visualizerWebview.renderWebview("visualizer", document.getElementById("webview-container"));
                }
                renderDiagrams();
            }
        `;

        const webViewOptions: WebViewOptions = {
            ...getComposerWebViewOptions("Visualizer", webView),
            body,
            scripts,
            styles,
            bodyCss,
        };

        return getLibraryWebViewContent(webViewOptions, webView);
    }

    public dispose() {
        VisualizerWebview.currentPanel = undefined;
        this._panel?.dispose();
        vscode.commands.executeCommand('setContext', 'showGoToSource', false);
        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }

        this._panel = undefined;
        StateMachine.resetToExtensionReady();
    }
}
