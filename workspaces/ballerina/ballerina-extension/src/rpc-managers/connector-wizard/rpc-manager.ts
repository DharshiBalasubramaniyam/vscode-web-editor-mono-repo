import {
    Connector,
    ConnectorRequest,
    ConnectorResponse,
    ConnectorWizardAPI,
    ConnectorsRequest,
    ConnectorsResponse
} from "@dharshi/ballerina-core";
import { StateMachine } from "../../state-machine";


export class ConnectorWizardRpcManager implements ConnectorWizardAPI {
    async getConnector(params: ConnectorRequest): Promise<ConnectorResponse> {
        return new Promise((resolve) => {
            StateMachine.langClient()
                .getConnector(params)
                .then((connector) => {
                    console.log(">>> received connector", connector);
                    resolve(connector as Connector);
                })
                .catch((error) => {
                    console.log(">>> error fetching connector", error);
                    return new Promise((resolve) => {
                        resolve(undefined);
                    });
                });
        });
    }

    async getConnectors(params: ConnectorsRequest): Promise<ConnectorsResponse> {
        return new Promise((resolve) => {
            StateMachine.langClient()
                .getConnectors(params)
                .then((connectors) => {
                    console.log(">>> received connectors", connectors);
                    resolve(connectors as ConnectorsResponse);
                })
                .catch((error) => {
                    console.log(">>> error fetching connectors", error);
                    return new Promise((resolve) => {
                        resolve(undefined);
                    });
                });
        });
    }
}
