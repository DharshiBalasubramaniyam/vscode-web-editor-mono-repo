
import { DisplayAnnotation } from "./ballerina";
import { LineRange } from "./common";


export type ListenerModel = {
    id: number;
    displayAnnotation?: DisplayAnnotation;
    name: string;
    type: string;
    displayName: string;
    documentation: string;
    moduleName: string;
    orgName: string;
    version: string;
    packageName: string;
    listenerProtocol: string;
    icon: string;
    properties?: ConfigProperties;
};


export interface ServiceModel {
    id: number;
    name: string;
    type: string;
    displayName?: string;
    documentation?: string;
    moduleName: string;
    orgName: string;
    version: string;
    packageName: string;
    listenerProtocol: string;
    icon: string;
    properties?: ConfigProperties;
    functions?: FunctionModel[];
    displayAnnotation?: DisplayAnnotation;
    codedata?: CodeData;
}

export interface ServiceClassModel { // for Ballerina Service Classes
    id: number;
    name: string;
    type: string;
    properties?: ConfigProperties;
    functions?: FunctionModel[];
    displayAnnotation?: DisplayAnnotation;
    codedata?: CodeData;
    fields?: FieldType[];
}


export interface FieldType extends ParameterModel {
    codedata: CodeData;
    isPrivate: boolean;
    isFinal: boolean;
}

export interface FunctionModel {
    metadata?: MetaData;
    kind: "REMOTE" | "RESOURCE" | "QUERY" | "MUTATION" | "SUBSCRIPTION" | "DEFAULT" | "INIT";
    enabled: boolean;
    optional: boolean;
    editable: boolean;
    codedata?: CodeData;

    // accessor will be used by resource functions
    accessor?: PropertyModel;

    name: PropertyModel;
    parameters: ParameterModel[];
    schema?: ConfigProperties;
    returnType: ReturnTypeModel;
    qualifiers?: string[];
}


export interface ReturnTypeModel extends PropertyModel {
    responses?: StatusCodeResponse[];
    schema?: ConfigProperties;
}
export interface StatusCodeResponse extends PropertyModel {
    statusCode: PropertyModel;
    body: PropertyModel;
    name: PropertyModel;
    type: PropertyModel;
    createStatusCodeResponse: PropertyModel;
}

interface MetaData {
    label: string;
    description: string;
    groupNo?: number;
    groupName?: string;
}

interface CodeData {
    label?: string;
    description?: string;
    groupNo?: number;
    groupName?: string;
    lineRange?: LineRange;
    inListenerInit: boolean;
    isBasePath: boolean;
    inDisplayAnnotation: boolean;
    type?: string;
}

export interface PropertyModel {
    metadata?: MetaData;
    codedata?: CodeData;
    enabled?: boolean;
    editable?: boolean;
    value?: string;
    values?: string[];
    valueType?: string;
    valueTypeConstraint?: string;
    isType?: boolean;
    placeholder?: string;
    optional?: boolean;
    advanced?: boolean;
    items?: string[];
    choices?: PropertyModel[];
    properties?: ConfigProperties;
    addNewButton?: boolean;
    httpParamType?: "QUERY" | "Header" | "PAYLOAD";
}

export interface ParameterModel extends PropertyModel {
    kind?: "REQUIRED" | "OPTIONAL",
    type?: PropertyModel;
    name?: PropertyModel;
    defaultValue?: PropertyModel;
}


export interface ConfigProperties {
    [key: string]: PropertyModel | ParameterModel;
}
