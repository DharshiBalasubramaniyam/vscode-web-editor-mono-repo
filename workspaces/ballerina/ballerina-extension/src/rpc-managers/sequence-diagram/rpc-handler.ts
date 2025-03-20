import { getSequenceModel } from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { SequenceDiagramRpcManager } from "./rpc-manager";

export function registerSequenceDiagramRpcHandlers(messenger: Messenger) {
    const rpcManger = new SequenceDiagramRpcManager();
    messenger.onRequest(getSequenceModel, () => rpcManger.getSequenceModel());
}
