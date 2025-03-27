import { WebviewView, WebviewPanel, Uri } from 'vscode';
import { Messenger } from 'vscode-messenger';
import { StateMachine } from './state-machine';
import { stateChanged, getVisualizerLocation, VisualizerLocation, projectContentUpdated, aiStateChanged, sendAIStateEvent, AI_EVENT_TYPE, popupStateChanged, getPopupVisualizerState, PopupVisualizerLocation, breakpointChanged } from '@dharshi/ballerina-core';
import { registerVisualizerRpcHandlers } from './rpc-managers/visualizer/rpc-handler';
import { registerLangClientRpcHandlers } from './rpc-managers/lang-client/rpc-handler';
import { registerLibraryBrowserRpcHandlers } from './rpc-managers/library-browser/rpc-handler';
import { registerServiceDesignerRpcHandlers } from './rpc-managers/service-designer/rpc-handler';
import { registerCommonRpcHandlers } from './rpc-managers/common/rpc-handler';
import { registerPersistDiagramRpcHandlers } from './rpc-managers/persist-diagram/rpc-handler';
import { registerGraphqlDesignerRpcHandlers } from './rpc-managers/graphql-designer/rpc-handler';
import { registerRecordCreatorRpcHandlers } from './rpc-managers/record-creator/rpc-handler';
import { registerBiDiagramRpcHandlers } from './rpc-managers/bi-diagram/rpc-handler';
import { StateMachinePopup } from './state-machine-popup';
import { VisualizerWebview } from './activators/visualizer/webview';
import { registerConnectorWizardRpcHandlers } from './rpc-managers/connector-wizard/rpc-handler';
import { registerSequenceDiagramRpcHandlers } from './rpc-managers/sequence-diagram/rpc-handler';

export class RPCLayer {
    static _messenger: Messenger = new Messenger();

    constructor(webViewPanel: WebviewPanel | WebviewView) {
        if (isWebviewPanel(webViewPanel)) {
            RPCLayer._messenger.registerWebviewPanel(webViewPanel as WebviewPanel);
            StateMachine.service().onTransition((state: any) => {
                RPCLayer._messenger.sendNotification(stateChanged, { type: 'webview', webviewType: VisualizerWebview.viewType }, state.value);
            });
            // Popup machine transition
            StateMachinePopup.service().onTransition((state: any) => {
                RPCLayer._messenger.sendNotification(popupStateChanged, { type: 'webview', webviewType: VisualizerWebview.viewType }, state.value);
            });
        } else {
            RPCLayer._messenger.registerWebviewView(webViewPanel as WebviewView);
            // StateMachineAI.service().onTransition((state) => {
            //     RPCLayer._messenger.sendNotification(aiStateChanged, { type: 'webview', webviewType: AiPanelWebview.viewType }, state.value);
            // });
        }
    }

    static create(webViewPanel: WebviewPanel | WebviewView) {
        return new RPCLayer(webViewPanel);
    }

    static init() {
        RPCLayer._messenger.onRequest(getVisualizerLocation, () => getContext());
        registerVisualizerRpcHandlers(RPCLayer._messenger);
        registerLangClientRpcHandlers(RPCLayer._messenger);
        registerLibraryBrowserRpcHandlers(RPCLayer._messenger);
        registerServiceDesignerRpcHandlers(RPCLayer._messenger);
        registerCommonRpcHandlers(RPCLayer._messenger);
        registerPersistDiagramRpcHandlers(RPCLayer._messenger);
        registerGraphqlDesignerRpcHandlers(RPCLayer._messenger);
        registerRecordCreatorRpcHandlers(RPCLayer._messenger);
        registerBiDiagramRpcHandlers(RPCLayer._messenger);
        registerSequenceDiagramRpcHandlers(RPCLayer._messenger);
        registerConnectorWizardRpcHandlers(RPCLayer._messenger);
    }

}

async function getContext(): Promise<VisualizerLocation> {
    const context = StateMachine.context();
    return new Promise((resolve) => {
        resolve({
            documentUri: context.documentUri,
            view: context.view,
            identifier: context.identifier,
            position: context.position,
            syntaxTree: context.syntaxTree,
            isBI: context.isBI,
            projectUri: context.projectUri,
            serviceType: context.serviceType,
            type: context.type,
            isGraphql: context.isGraphql,
            metadata: {
                haveLS: StateMachine.langClient() !== null,
            },
        });
    });
}

async function getPopupContext(): Promise<PopupVisualizerLocation> {
    const context = StateMachinePopup.context();
    return new Promise((resolve) => {
        resolve({
            documentUri: context.documentUri,
            view: context.view,
            recentIdentifier: context.recentIdentifier,
            identifier: context.identifier,
            metadata: context.metadata,
        });
    });
}

function isWebviewPanel(webview: WebviewPanel | WebviewView): boolean {
    const title = webview.title;
    return title === VisualizerWebview.panelTitle;
}

export function notifyCurrentWebview() {
    RPCLayer._messenger.sendNotification(projectContentUpdated, { type: 'webview', webviewType: VisualizerWebview.viewType }, true);
}

export function notifyBreakpointChange() {
    RPCLayer._messenger.sendNotification(breakpointChanged, { type: 'webview', webviewType: VisualizerWebview.viewType }, true);
}
