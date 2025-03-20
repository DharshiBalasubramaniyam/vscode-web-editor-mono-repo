import {
    ConnectorRequest,
    ConnectorsRequest,
    getConnector,
    getConnectors
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { ConnectorWizardRpcManager } from "./rpc-manager";

export function registerConnectorWizardRpcHandlers(messenger: Messenger) {
    const rpcManger = new ConnectorWizardRpcManager();
    messenger.onRequest(getConnector, (args: ConnectorRequest) => rpcManger.getConnector(args));
    messenger.onRequest(getConnectors, (args: ConnectorsRequest) => rpcManger.getConnectors(args));
}
