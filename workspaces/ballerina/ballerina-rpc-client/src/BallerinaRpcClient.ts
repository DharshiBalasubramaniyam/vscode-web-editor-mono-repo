/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Messenger } from "vscode-messenger-webview";
import { VisualizerRpcClient } from "./rpc-clients/visualizer/rpc-client";
import {
    AIMachineStateValue,
    AI_EVENT_TYPE,
    MachineStateValue,
    VisualizerLocation,
    aiStateChanged,
    getVisualizerLocation,
    sendAIStateEvent,
    stateChanged,
    vscode,
    webviewReady,
    projectContentUpdated,
    ParentPopupData,
    onParentPopupSubmitted,
    PopupMachineStateValue,
    popupStateChanged,
    PopupVisualizerLocation,
    getPopupVisualizerState,
    onDownloadProgress,
    DownloadProgress,
    breakpointChanged
} from "@dharshi/ballerina-core";
import { LangClientRpcClient } from "./rpc-clients/lang-client/rpc-client";
import { LibraryBrowserRpcClient } from "./rpc-clients/library-browser/rpc-client";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { CommonRpcClient, GraphqlDesignerRpcClient, PersistDiagramRpcClient, RecordCreatorRpcClient, ServiceDesignerRpcClient, AiPanelRpcClient } from "./rpc-clients";
import { BiDiagramRpcClient } from "./rpc-clients/bi-diagram/rpc-client";
import { ConnectorWizardRpcClient } from "./rpc-clients/connector-wizard/rpc-client";
import { SequenceDiagramRpcClient } from "./rpc-clients/sequence-diagram/rpc-client";
import { InlineDataMapperRpcClient } from "./rpc-clients/inline-data-mapper/rpc-client";
import { TestManagerServiceRpcClient } from "./rpc-clients";
import { ICPServiceRpcClient } from "./rpc-clients/icp-service/rpc-client";

export class BallerinaRpcClient {

    private messenger: Messenger;
    private _visualizer: VisualizerRpcClient;
    private _langClient: LangClientRpcClient;
    private _libraryBrowser: LibraryBrowserRpcClient;
    private _serviceDesigner: ServiceDesignerRpcClient;
    private _common: CommonRpcClient;
    private _persistDiagram: PersistDiagramRpcClient;
    private _GraphqlDesigner: GraphqlDesignerRpcClient;
    private _RecordCreator: RecordCreatorRpcClient;
    private _biDiagram: BiDiagramRpcClient;
    private _SequenceDiagram: SequenceDiagramRpcClient;
    private _aiPanel: AiPanelRpcClient;
    private _connectorWizard: ConnectorWizardRpcClient;
    private _inlineDataMapper: InlineDataMapperRpcClient;
    private _testManager: TestManagerServiceRpcClient;
    private _icpManager: ICPServiceRpcClient;

    constructor() {
        this.messenger = new Messenger(vscode);
        this.messenger.start();
        this._visualizer = new VisualizerRpcClient(this.messenger);
        this._langClient = new LangClientRpcClient(this.messenger);
        this._libraryBrowser = new LibraryBrowserRpcClient(this.messenger);
        this._serviceDesigner = new ServiceDesignerRpcClient(this.messenger);
        this._common = new CommonRpcClient(this.messenger);
        this._persistDiagram = new PersistDiagramRpcClient(this.messenger);
        this._GraphqlDesigner = new GraphqlDesignerRpcClient(this.messenger);
        this._RecordCreator = new RecordCreatorRpcClient(this.messenger);
        this._biDiagram = new BiDiagramRpcClient(this.messenger);
        this._SequenceDiagram = new SequenceDiagramRpcClient(this.messenger);
        this._aiPanel = new AiPanelRpcClient(this.messenger);
        this._connectorWizard = new ConnectorWizardRpcClient(this.messenger);
        this._inlineDataMapper = new InlineDataMapperRpcClient(this.messenger);
        this._testManager = new TestManagerServiceRpcClient(this.messenger);
        this._icpManager = new ICPServiceRpcClient(this.messenger);
    }

    getICPRpcClient(): ICPServiceRpcClient {
        return this._icpManager;
    }

    getConnectorWizardRpcClient(): ConnectorWizardRpcClient {
        return this._connectorWizard;
    }

    getVisualizerRpcClient(): VisualizerRpcClient {
        return this._visualizer;
    }

    getServiceDesignerRpcClient(): ServiceDesignerRpcClient {
        return this._serviceDesigner;
    }

    getTestManagerRpcClient(): TestManagerServiceRpcClient {
        return this._testManager;
    }

    getBIDiagramRpcClient(): BiDiagramRpcClient {
        return this._biDiagram;
    }

    getSequenceDiagramRpcClient(): SequenceDiagramRpcClient {
        return this._SequenceDiagram;
    }

    getPersistDiagramRpcClient(): PersistDiagramRpcClient {
        return this._persistDiagram;
    }

    getGraphqlDesignerRpcClient(): GraphqlDesignerRpcClient {
        return this._GraphqlDesigner;
    }

    getLangClientRpcClient(): LangClientRpcClient {
        return this._langClient;
    }

    getLibraryBrowserRPCClient(): LibraryBrowserRpcClient {
        return this._libraryBrowser;
    }

    getCommonRpcClient(): CommonRpcClient {
        return this._common;
    }

    getRecordCreatorRpcClient(): RecordCreatorRpcClient {
        return this._RecordCreator;
    }

    getAiPanelRpcClient(): AiPanelRpcClient {
        return this._aiPanel;
    }

    getInlineDataMapperRpcClient(): InlineDataMapperRpcClient {
        return this._inlineDataMapper;
    }

    getVisualizerLocation(): Promise<VisualizerLocation> {
        return this.messenger.sendRequest(getVisualizerLocation, HOST_EXTENSION);
    }

    onStateChanged(callback: (state: MachineStateValue) => void) {
        this.messenger.onNotification(stateChanged, callback);
    }

    onAIPanelStateChanged(callback: (state: AIMachineStateValue) => void) {
        this.messenger.onNotification(aiStateChanged, callback);
    }

    sendAIStateEvent(event: AI_EVENT_TYPE) {
        this.messenger.sendRequest(sendAIStateEvent, HOST_EXTENSION, event);
    }

    onProjectContentUpdated(callback: (state: boolean) => void) {
        this.messenger.onNotification(projectContentUpdated, callback);
    }

    webviewReady(): void {
        this.messenger.sendNotification(webviewReady, HOST_EXTENSION);
    }

    onParentPopupSubmitted(callback: (parent: ParentPopupData) => void) {
        this.messenger.onNotification(onParentPopupSubmitted, callback);
    }

    onPopupStateChanged(callback: (state: PopupMachineStateValue) => void) {
        this.messenger.onNotification(popupStateChanged, callback);
    }

    onBreakpointChanges(callback: (state: boolean) => void) {
        this.messenger.onNotification(breakpointChanged, callback);
    }

    onDownloadProgress(callback: (state: DownloadProgress) => void) {
        this.messenger.onNotification(onDownloadProgress, callback);
    }

    getPopupVisualizerState(): Promise<PopupVisualizerLocation> {
        return this.messenger.sendRequest(getPopupVisualizerState, HOST_EXTENSION);
    }

}
