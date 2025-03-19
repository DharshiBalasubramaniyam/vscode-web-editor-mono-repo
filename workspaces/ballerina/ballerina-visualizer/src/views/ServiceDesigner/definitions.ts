
import { NodePosition, Diagnostic } from "@dharshi/syntax-tree";
import { Item } from "@dharshi/ui-toolkit";

export interface ResponseConfig {
    id: number;
    code?: number;
    type?: string;
    isTypeArray?: boolean;
    source?: string;
    isNew?: boolean;
    defaultCode?: number;
    namedRecord?: string;
}

export enum PARAM_TYPES {
    DEFAULT = 'QUERY',
    PARAM = 'Param',
    PAYLOAD = 'Payload',
    REQUEST = 'Request',
    CALLER = 'Caller',
    HEADER = 'Header',
}

export interface ParameterConfig {
    id: number;
    name: string;
    type?: string;
    option?: PARAM_TYPES;
    defaultValue?: string;
    isRequired?: boolean;
    isNew?: boolean;
}

export interface ServiceData {
    path: string;
    port: number;
    listener?: string;
}

export interface Resource {
    methods: string[];
    errors?: Diagnostic[];
    path: string;
    pathSegments?: ParameterConfig[];
    params?: ParameterConfig[];
    advancedParams?: Map<string, ParameterConfig>;
    payloadConfig?: ParameterConfig;
    responses?: ResponseConfig[];
    expandable?: boolean;
    updatePosition?: NodePosition; // Insert or Edit position of the resource
    position?: NodePosition; // Actual position of the resource which is used to render the resource
    addtionalInfo?: JSX.Element; // Addtional information to be displayed in the resource expanded view
    additionalActions?: Item[]; // Additional actions for the resource
}

export interface PathConfig {
    path: string;
    resources: ParameterConfig[];
}

export interface Service {
    path: string;
    port?: number;
    listener?: string;
    serviceType?: string;
    resources: Resource[];
    position?: NodePosition;
    triggerModel?: any;
}
