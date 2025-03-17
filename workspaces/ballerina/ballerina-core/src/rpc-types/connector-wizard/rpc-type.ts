
import { ConnectorRequest, ConnectorResponse, ConnectorsRequest, ConnectorsResponse } from "./interfaces";
import { RequestType } from "vscode-messenger-common";

const _preFix = "connector-wizard";
export const getConnector: RequestType<ConnectorRequest, ConnectorResponse> = { method: `${_preFix}/getConnector` };
export const getConnectors: RequestType<ConnectorsRequest, ConnectorsResponse> = { method: `${_preFix}/getConnectors` };
