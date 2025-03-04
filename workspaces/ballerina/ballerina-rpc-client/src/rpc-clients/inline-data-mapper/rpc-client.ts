
import {
    AddArrayElementRequest,
    InlineDataMapperAPI,
    InlineDataMapperModelRequest,
    InlineDataMapperModelResponse,
    InlineDataMapperSourceRequest,
    InlineDataMapperSourceResponse,
    VisualizableFieldsRequest,
    VisualizableFieldsResponse,
    addNewArrayElement,
    getDataMapperModel,
    getDataMapperSource,
    getVisualizableFields
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class InlineDataMapperRpcClient implements InlineDataMapperAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getDataMapperModel(params: InlineDataMapperModelRequest): Promise<InlineDataMapperModelResponse> {
        return this._messenger.sendRequest(getDataMapperModel, HOST_EXTENSION, params);
    }

    getDataMapperSource(params: InlineDataMapperSourceRequest): Promise<InlineDataMapperSourceResponse> {
        return this._messenger.sendRequest(getDataMapperSource, HOST_EXTENSION, params);
    }

    getVisualizableFields(params: VisualizableFieldsRequest): Promise<VisualizableFieldsResponse> {
        return this._messenger.sendRequest(getVisualizableFields, HOST_EXTENSION, params);
    }

    addNewArrayElement(params: AddArrayElementRequest): Promise<InlineDataMapperSourceResponse> {
        return this._messenger.sendRequest(addNewArrayElement, HOST_EXTENSION, params);
    }
}
