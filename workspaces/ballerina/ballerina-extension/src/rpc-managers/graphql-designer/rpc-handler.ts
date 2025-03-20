import {
    GetGraphqlTypeRequest,
    GraphqlModelRequest,
    getGraphqlModel,
    getGraphqlTypeModel
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { GraphqlDesignerRpcManager } from "./rpc-manager";

export function registerGraphqlDesignerRpcHandlers(messenger: Messenger) {
    const rpcManger = new GraphqlDesignerRpcManager();
    messenger.onRequest(getGraphqlModel, (args: GraphqlModelRequest) => rpcManger.getGraphqlModel(args));
    messenger.onRequest(getGraphqlTypeModel, (args: GetGraphqlTypeRequest) => rpcManger.getGraphqlTypeModel(args));
}
