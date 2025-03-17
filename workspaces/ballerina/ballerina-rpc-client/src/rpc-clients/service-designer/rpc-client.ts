
import {
    ExportOASRequest,
    ExportOASResponse,
    FunctionModelRequest,
    FunctionModelResponse,
    FunctionSourceCodeRequest,
    HttpResourceModelRequest,
    HttpResourceModelResponse,
    ListenerModelFromCodeRequest,
    ListenerModelFromCodeResponse,
    ListenerModelRequest,
    ListenerModelResponse,
    ListenerSourceCodeRequest,
    ListenersRequest,
    ListenersResponse,
    RecordSTRequest,
    RecordSTResponse,
    ServiceDesignerAPI,
    ServiceModelFromCodeRequest,
    ServiceModelFromCodeResponse,
    ServiceModelRequest,
    ServiceModelResponse,
    ServiceSourceCodeRequest,
    SourceUpdateResponse,
    TriggerModelsRequest,
    TriggerModelsResponse,
    addFunctionSourceCode,
    addListenerSourceCode,
    addResourceSourceCode,
    addServiceSourceCode,
    exportOASFile,
    getFunctionModel,
    getHttpResourceModel,
    getListenerModel,
    getListenerModelFromCode,
    getListeners,
    getRecordST,
    getServiceModel,
    getServiceModelFromCode,
    getTriggerModels,
    updateListenerSourceCode,
    updateResourceSourceCode,
    updateServiceSourceCode
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class ServiceDesignerRpcClient implements ServiceDesignerAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getRecordST(params: RecordSTRequest): Promise<RecordSTResponse> {
        return this._messenger.sendRequest(getRecordST, HOST_EXTENSION, params);
    }

    exportOASFile(params: ExportOASRequest): Promise<ExportOASResponse> {
        return this._messenger.sendRequest(exportOASFile, HOST_EXTENSION, params);
    }

    getTriggerModels(params: TriggerModelsRequest): Promise<TriggerModelsResponse> {
        return this._messenger.sendRequest(getTriggerModels, HOST_EXTENSION, params);
    }

    getListeners(params: ListenersRequest): Promise<ListenersResponse> {
        return this._messenger.sendRequest(getListeners, HOST_EXTENSION, params);
    }

    getListenerModel(params: ListenerModelRequest): Promise<ListenerModelResponse> {
        return this._messenger.sendRequest(getListenerModel, HOST_EXTENSION, params);
    }

    addListenerSourceCode(params: ListenerSourceCodeRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(addListenerSourceCode, HOST_EXTENSION, params);
    }

    updateListenerSourceCode(params: ListenerSourceCodeRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(updateListenerSourceCode, HOST_EXTENSION, params);
    }

    getListenerModelFromCode(params: ListenerModelFromCodeRequest): Promise<ListenerModelFromCodeResponse> {
        return this._messenger.sendRequest(getListenerModelFromCode, HOST_EXTENSION, params);
    }

    getServiceModel(params: ServiceModelRequest): Promise<ServiceModelResponse> {
        return this._messenger.sendRequest(getServiceModel, HOST_EXTENSION, params);
    }

    getFunctionModel(params: FunctionModelRequest): Promise<FunctionModelResponse> {
        return this._messenger.sendRequest(getFunctionModel, HOST_EXTENSION, params);
    }

    addServiceSourceCode(params: ServiceSourceCodeRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(addServiceSourceCode, HOST_EXTENSION, params);
    }

    updateServiceSourceCode(params: ServiceSourceCodeRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(updateServiceSourceCode, HOST_EXTENSION, params);
    }

    getServiceModelFromCode(params: ServiceModelFromCodeRequest): Promise<ServiceModelFromCodeResponse> {
        return this._messenger.sendRequest(getServiceModelFromCode, HOST_EXTENSION, params);
    }

    getHttpResourceModel(params: HttpResourceModelRequest): Promise<HttpResourceModelResponse> {
        return this._messenger.sendRequest(getHttpResourceModel, HOST_EXTENSION, params);
    }

    addResourceSourceCode(params: FunctionSourceCodeRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(addResourceSourceCode, HOST_EXTENSION, params);
    }

    addFunctionSourceCode(params: FunctionSourceCodeRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(addFunctionSourceCode, HOST_EXTENSION, params);
    }

    updateResourceSourceCode(params: FunctionSourceCodeRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(updateResourceSourceCode, HOST_EXTENSION, params);
    }
}
