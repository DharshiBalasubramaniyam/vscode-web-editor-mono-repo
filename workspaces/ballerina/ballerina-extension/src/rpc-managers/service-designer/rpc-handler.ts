import {
    ExportOASRequest,
    FunctionModelRequest,
    FunctionSourceCodeRequest,
    HttpResourceModelRequest,
    ListenerModelFromCodeRequest,
    ListenerModelRequest,
    ListenerSourceCodeRequest,
    ListenersRequest,
    RecordSTRequest,
    ServiceModelFromCodeRequest,
    ServiceModelRequest,
    ServiceSourceCodeRequest,
    TriggerModelsRequest,
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
import { Messenger } from "vscode-messenger";
import { ServiceDesignerRpcManager } from "./rpc-manager";

export function registerServiceDesignerRpcHandlers(messenger: Messenger) {
    const rpcManger = new ServiceDesignerRpcManager();
    messenger.onRequest(getRecordST, (args: RecordSTRequest) => rpcManger.getRecordST(args));
    messenger.onRequest(exportOASFile, (args: ExportOASRequest) => rpcManger.exportOASFile(args));
    messenger.onRequest(getTriggerModels, (args: TriggerModelsRequest) => rpcManger.getTriggerModels(args));
    messenger.onRequest(getListeners, (args: ListenersRequest) => rpcManger.getListeners(args));
    messenger.onRequest(getListenerModel, (args: ListenerModelRequest) => rpcManger.getListenerModel(args));
    messenger.onRequest(addListenerSourceCode, (args: ListenerSourceCodeRequest) => rpcManger.addListenerSourceCode(args));
    messenger.onRequest(updateListenerSourceCode, (args: ListenerSourceCodeRequest) => rpcManger.updateListenerSourceCode(args));
    messenger.onRequest(getListenerModelFromCode, (args: ListenerModelFromCodeRequest) => rpcManger.getListenerModelFromCode(args));
    messenger.onRequest(getServiceModel, (args: ServiceModelRequest) => rpcManger.getServiceModel(args));
    messenger.onRequest(getFunctionModel, (args: FunctionModelRequest) => rpcManger.getFunctionModel(args));
    messenger.onRequest(addServiceSourceCode, (args: ServiceSourceCodeRequest) => rpcManger.addServiceSourceCode(args));
    messenger.onRequest(updateServiceSourceCode, (args: ServiceSourceCodeRequest) => rpcManger.updateServiceSourceCode(args));
    messenger.onRequest(getServiceModelFromCode, (args: ServiceModelFromCodeRequest) => rpcManger.getServiceModelFromCode(args));
    messenger.onRequest(getHttpResourceModel, (args: HttpResourceModelRequest) => rpcManger.getHttpResourceModel(args));
    messenger.onRequest(addResourceSourceCode, (args: FunctionSourceCodeRequest) => rpcManger.addResourceSourceCode(args));
    messenger.onRequest(addFunctionSourceCode, (args: FunctionSourceCodeRequest) => rpcManger.addFunctionSourceCode(args));
    messenger.onRequest(updateResourceSourceCode, (args: FunctionSourceCodeRequest) => rpcManger.updateResourceSourceCode(args));
}
