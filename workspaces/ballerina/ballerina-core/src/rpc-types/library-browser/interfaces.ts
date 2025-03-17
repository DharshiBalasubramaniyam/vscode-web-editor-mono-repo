/* eslint-disable @typescript-eslint/no-explicit-any */

export enum LibraryKind {
    langLib = 'langLibs',
    stdLib = 'modules',
}

export interface LibrariesListRequest {
    kind?: LibraryKind;
}

export interface LibrariesListResponse {
    librariesList: LibraryInfo[];
}


export interface LibraryDataRequest {
    orgName: string;
    moduleName: string;
    version: string;
}

export interface LibraryDataResponse {
    docsData: LibraryDocsData;
    searchData: LibrarySearchResponse;
}

export interface LibrarySearchResponse {
    modules: LibraryInfo[];
    classes: ModuleProperty[];
    functions: ModuleProperty[];
    records: ModuleProperty[];
    constants: ModuleProperty[];
    errors: ModuleProperty[];
    types: ModuleProperty[];
    clients: ModuleProperty[];
    listeners: ModuleProperty[];
    annotations: ModuleProperty[];
    objectTypes: ModuleProperty[];
    enums: ModuleProperty[];
}

export interface LibraryDocsData {
    releaseVersion: string;
    langLibs: any;
    modules: LibraryModule[];
}

export interface LibraryInfo {
    id: string;
    summary?: string;
    description?: string;
    orgName: string;
    version: string;
    isDefaultModule: boolean;
}

export interface ModuleProperty {
    id: string;
    description: string;
    moduleId: string;
    moduleOrgName: string;
    moduleVersion: string;
}

export interface LibraryModule {
    relatedModules: any;
    records: any;
    classes: any;
    objectTypes: any;
    clients: any;
    listeners: any;
    functions: LibraryFunction[];
    constants: any;
    annotations: any;
    errors: any;
    types: any;
    enums: any;
    variables: any;
    id: string;
    summary: string;
    description: string;
    orgName: string;
    version: string;
    isDefaultModule: boolean;
}

export interface LibraryFunction {
    isIsolated: boolean;
    isRemote: boolean;
    isExtern: boolean;
    parameters: FunctionParams[];
    returnParameters: any;
    name: string;
    description: string;
    isDeprecated: boolean;
    isReadOnly: boolean;
}

export interface FunctionParams {
    defaultValue: string;
    type: any;
    name: string;
    description: string;
    isDeprecated: boolean;
    isReadOnly: boolean;
}
