
import { NotificationType, RequestType } from "vscode-messenger-common";
import { NodePosition, STNode } from "@dharshi/syntax-tree";
import { LinePosition } from "./interfaces/common";
import { Type } from "./interfaces/extended-lang-client";

export type MachineStateValue =
    | 'initialize'
    | 'lsError'
    | 'lsReady'
    | 'viewActive'
    | 'disabled'
    | { viewActive: 'viewInit' } | { viewActive: 'webViewLoaded' } | { viewActive: 'viewReady' } | { viewActive: 'viewEditing' };

export type PopupMachineStateValue = 'initialize' | 'ready' | {
    open: 'active';
} | {
    ready: 'reopen';
} | {
    ready: 'notify';
} | 'disabled';

export enum EVENT_TYPE {
    OPEN_VIEW = "OPEN_VIEW",
    GET_STARTED = "GET_STARTED",
    CANCEL_CREATION = "CANCEL_CREATION",
    FILE_EDIT = "FILE_EDIT",
    EDIT_DONE = "EDIT_DONE",
    CLOSE_VIEW = "CLOSE_VIEW"
}

export type VoidCommands = "OPEN_LOW_CODE" | "OPEN_PROJECT" | "CREATE_PROJECT";

export enum MACHINE_VIEW {
    Overview = "Overview",
    SequenceDiagram = "Sequence Diagram",
    ServiceDesigner = "Service Designer",
    ERDiagram = "ER Diagram",
    DataMapper = "Data Mapper",
    GraphQLDiagram = "GraphQL Diagram",
    TypeDiagram = "Type Diagram",
    SetupView = "Setup View",
    BIDiagram = "BI Diagram",
    BIWelcome = "BI Welcome",
    BIProjectForm = "BI Project Form",
    BIComponentView = "BI Component View",
    AddConnectionWizard = "Add Connection Wizard",
    ViewConfigVariables = "View Config Variables",
    EditConfigVariables = "Edit Config Variables",
    EditConnectionWizard = "Edit Connection Wizard",
    MainFunctionForm = "Add Automation",
    FunctionForm = "Add Function",
    TestFunctionForm = "Add Test Function",
    ServiceWizard = "Service Wizard",
    ServiceConfigView = "Service Config View",
    ListenerConfigView = "Listener Config View",
    ServiceClassDesigner = "Service Class Designer",
    ServiceClassConfigView = "Service Class Config View",
    DataMapperForm = "Add Data Mapper",
}

export enum SCOPE {
    AUTOMATION = "automation",
    INTEGRATION_AS_API = "integration-as-api",
    EVENT_INTEGRATION = "event-integration",
    FILE_INTEGRATION = "file-integration",
    AI_AGENT = "ai-agent",
    ANY = "any"
}

export interface MachineEvent {
    type: EVENT_TYPE;
}

export interface CommandProps {
    command: VoidCommands;
    projectName?: string;
    isService?: boolean
}

// State Machine context values
export interface VisualizerLocation {
    view?: MACHINE_VIEW | null;
    documentUri?: string;
    projectUri?: string;
    identifier?: string;
    position?: NodePosition;
    syntaxTree?: STNode;
    isBI?: boolean;
    serviceType?: string;
    type?: Type;
    isGraphql?: boolean;
    metadata?: VisualizerMetadata;
    isNew?: boolean;
}

export interface VisualizerMetadata {
    haveLS?: boolean;
    recordFilePath?: string;
    enableSequenceDiagram?: boolean; // Enable sequence diagram view
    target?: LinePosition;
}

export interface PopupVisualizerLocation extends VisualizerLocation {
    recentIdentifier?: string;
}

export interface ParentPopupData {
    recentIdentifier: string;
}

export interface DownloadProgress {
    totalSize?: number;
    downloadedSize?: number;
    percentage?: number;
    success: boolean;
    message: string;
    step?: number;
}

export const stateChanged: NotificationType<MachineStateValue> = { method: 'stateChanged' };
export const onDownloadProgress: NotificationType<DownloadProgress> = { method: 'onDownloadProgress' };
export const projectContentUpdated: NotificationType<boolean> = { method: 'projectContentUpdated' };
export const getVisualizerLocation: RequestType<void, VisualizerLocation> = { method: 'getVisualizerLocation' };
export const webviewReady: NotificationType<void> = { method: `webviewReady` };

// Popup machine methods
export const onParentPopupSubmitted: NotificationType<ParentPopupData> = { method: `onParentPopupSubmitted` };
export const popupStateChanged: NotificationType<PopupMachineStateValue> = { method: 'popupStateChanged' };
export const getPopupVisualizerState: RequestType<void, PopupVisualizerLocation> = { method: 'getPopupVisualizerState' };

export const breakpointChanged: NotificationType<boolean> = { method: 'breakpointChanged' };

// ------------------> AI Related state types <----------------------- 
export type AIMachineStateValue = 'Initialize' | 'loggedOut' | 'Ready' | 'WaitingForLogin' | 'Executing' | 'disabled' | 'Settings';

export enum AI_EVENT_TYPE {
    LOGIN = "LOGIN",
    SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS",
    LOGOUT = "LOGOUT",
    EXECUTE = "EXECUTE",
    CLEAR = "CLEAR",
    CLEAR_PROMPT = "CLEAR_PROMPT",
    DISPOSE = "DISPOSE",
    CANCEL = "CANCEL",
    RETRY = "RETRY",
    SETUP = "SETUP",
    CHAT = "CHAT",
}

export enum AI_MACHINE_VIEW {
    AIOverview = "AI Overview",
    AIArtifact = "AI Artifact",
    AIChat = "AI Chat",
}

export interface AIVisualizerLocation {
    view?: AI_MACHINE_VIEW | null;
    initialPrompt?: string;
    state?: AIMachineStateValue;
    userTokens?: AIUserTokens;
}

export interface AIUserTokens {
    max_usage: number;
    remaining_tokens: number;
    time_to_reset: number;
}

export const aiStateChanged: NotificationType<AIMachineStateValue> = { method: 'aiStateChanged' };
export const getAIVisualizerState: RequestType<void, AIVisualizerLocation> = { method: 'getAIVisualizerState' };
export const sendAIStateEvent: RequestType<AI_EVENT_TYPE, void> = { method: 'sendAIStateEvent' };
