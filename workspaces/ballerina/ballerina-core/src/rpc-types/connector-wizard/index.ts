
import { ConnectorRequest, ConnectorResponse, ConnectorsRequest, ConnectorsResponse } from "./interfaces";
export interface ConnectorWizardAPI {
    getConnector: (params: ConnectorRequest) => Promise<ConnectorResponse>;
    getConnectors: (params: ConnectorsRequest) => Promise<ConnectorsResponse>;
}
