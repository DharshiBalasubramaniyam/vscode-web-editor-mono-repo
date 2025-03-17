
import { LineRange } from "./common";

// Component Diagram Model
export type CDModel = {
    automation?: CDAutomation;
    connections: CDConnection[];
    listeners: CDListener[];
    services: CDService[];
};

export type CDAutomation = {
    name: string;
    displayName: string;
    location: CDLocation;
    connections: string[];
    uuid: string;
};

export type CDLocation = LineRange & {
    filePath: string;
};

export type CDConnection = {
    symbol: string;
    location: CDLocation;
    scope: string;
    uuid: string;
    enableFlowModel: boolean;
    sortText: string;
};

export type CDListener = {
    symbol: string;
    location: CDLocation;
    attachedServices: string[];
    kind: string;
    type: string;
    args: CDArg[];
    uuid: string;
    icon: string;
    enableFlowModel: boolean;
    sortText: string;
};

export type CDArg = {
    key: string;
    value: string;
};

export type CDService = {
    location: CDLocation;
    attachedListeners: string[];
    connections: string[];
    functions: CDFunction[];
    remoteFunctions: CDFunction[];
    resourceFunctions: CDResourceFunction[];
    absolutePath: string;
    type: string;
    icon: string;
    uuid: string;
    enableFlowModel: boolean;
    sortText: string;
    displayName?: string;
};

export type CDFunction = {
    name: string;
    location: CDLocation;
    connections?: string[];
};

export type CDResourceFunction = {
    accessor: string;
    path: string;
    location: CDLocation;
    connections?: string[];
};
