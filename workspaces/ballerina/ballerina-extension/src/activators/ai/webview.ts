import * as vscode from 'vscode';
import { Uri, ViewColumn } from 'vscode';
import { WebViewOptions, getComposerWebViewOptions, getLibraryWebViewContent } from "../../utils/webview-utils";
import { RPCLayer } from '../../RPCLayer';
import { StateMachineAI } from '../../state-machine-ai';
import { AI_EVENT_TYPE } from '@dharshi/ballerina-core';
import { balExtInstance } from '../../extension';

export class AiPanelWebview {
    public static currentPanel: AiPanelWebview | undefined;
    public static readonly viewType = 'ballerina.ai-panel';
    private _panel: vscode.WebviewPanel | undefined;
    private _disposables: vscode.Disposable[] = [];

    constructor() {
        this._panel = AiPanelWebview.createWebview();
        this._panel.onDidDispose(() => this.dispose(), null, this._disposables);
        this._panel.webview.html = this.getWebviewContent(this._panel.webview);
        RPCLayer.create(this._panel);
    }

    private static createWebview(): vscode.WebviewPanel {
        const panel = vscode.window.createWebviewPanel(
            AiPanelWebview.viewType,
            "WSO2 Copilot",
            ViewColumn.Beside,
            {
                enableScripts: true,
                localResourceRoots: [Uri.joinPath(Uri.parse(balExtInstance.context.extensionPath), 'resources')],
                retainContextWhenHidden: true,
            }
        );
        panel.iconPath = {
            light: Uri.joinPath(Uri.parse(balExtInstance.context.extensionPath), 'resources', 'icons', 'dark-ai-chat.svg'),
            dark: Uri.joinPath(Uri.parse(balExtInstance.context.extensionPath), 'resources', 'icons', 'light-ai-chat.svg')
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
                    visualizerWebview.renderWebview("ai", document.getElementById("webview-container"));
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
        AiPanelWebview.currentPanel = undefined;
        StateMachineAI.sendEvent(AI_EVENT_TYPE.DISPOSE);
        this._panel?.dispose();

        while (this._disposables.length) {
            const disposable = this._disposables.pop();
            if (disposable) {
                disposable.dispose();
            }
        }

        this._panel = undefined;
    }
}
