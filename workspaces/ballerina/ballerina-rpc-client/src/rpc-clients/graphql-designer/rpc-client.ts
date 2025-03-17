
import {
    GetGraphqlTypeRequest,
    GetGraphqlTypeResponse,
    GraphqlDiagramAPI,
    GraphqlModelRequest,
    GraphqlModelResponse,
    getGraphqlModel,
    getGraphqlTypeModel
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class GraphqlDesignerRpcClient implements GraphqlDiagramAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getGraphqlModel(params: GraphqlModelRequest): Promise<GraphqlModelResponse> {
        return this._messenger.sendRequest(getGraphqlModel, HOST_EXTENSION, params);
    }

    getGraphqlTypeModel(params: GetGraphqlTypeRequest): Promise<GetGraphqlTypeResponse> {
        return this._messenger.sendRequest(getGraphqlTypeModel, HOST_EXTENSION, params);
    }
}
