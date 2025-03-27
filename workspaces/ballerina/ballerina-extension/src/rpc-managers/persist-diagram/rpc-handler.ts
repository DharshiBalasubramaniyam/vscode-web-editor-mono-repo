import {
    getPersistERModel,
    showProblemPanel,
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { PersistDiagramRpcManager } from "./rpc-manager";

export function registerPersistDiagramRpcHandlers(messenger: Messenger) {
    const rpcManger = new PersistDiagramRpcManager();
    messenger.onRequest(getPersistERModel, () => rpcManger.getPersistERModel());
    messenger.onNotification(showProblemPanel, () => rpcManger.showProblemPanel());
}
