
import { BallerinaConnectorInfo, BallerinaConnectorsRequest, BallerinaConnector } from "../../interfaces/ballerina";

export interface ConnectorRequest {
    id?: string
    orgName?: string
    packageName?: string
    moduleName?: string
    version?: string
    name?: string
    targetFile?: string
}

export interface ConnectorResponse extends BallerinaConnectorInfo {
    error?: string;
}

export interface ConnectorsRequest extends BallerinaConnectorsRequest {
    error?: string;
}

export interface ConnectorsResponse {
    central: BallerinaConnector[];
    local?: BallerinaConnector[];
    error?: string;
}
