
import {
    ConnectorRequest,
    ConnectorResponse,
    ConnectorWizardAPI,
    ConnectorsRequest,
    ConnectorsResponse,
    getConnector,
    getConnectors
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class ConnectorWizardRpcClient implements ConnectorWizardAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getConnector(params: ConnectorRequest): Promise<ConnectorResponse> {
        return this._messenger.sendRequest(getConnector, HOST_EXTENSION, params);
    }

    getConnectors(params: ConnectorsRequest): Promise<ConnectorsResponse> {
        return this._messenger.sendRequest(getConnectors, HOST_EXTENSION, params);
    }
}
