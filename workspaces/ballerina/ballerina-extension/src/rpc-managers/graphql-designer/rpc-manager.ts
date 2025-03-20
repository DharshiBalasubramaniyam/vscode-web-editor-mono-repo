import {
    GetGraphqlTypeRequest,
    GetGraphqlTypeResponse,
    GraphqlDiagramAPI,
    GraphqlModelRequest,
    GraphqlModelResponse
} from "@dharshi/ballerina-core";
import { StateMachine } from "../../state-machine";

export class GraphqlDesignerRpcManager implements GraphqlDiagramAPI {
    async getGraphqlModel(params: GraphqlModelRequest): Promise<GraphqlModelResponse> {
        return new Promise(async (resolve) => {
            const res = await StateMachine.langClient().getGraphqlModel({
                filePath: params.filePath,
                startLine: params.startLine,
                endLine: params.endLine
            }) as GraphqlModelResponse;
            resolve(res);
        });
    }

    async getGraphqlTypeModel(params: GetGraphqlTypeRequest): Promise<GetGraphqlTypeResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                console.log(">>> Fetching GraphqlTypeModel", params);
                const res: GetGraphqlTypeResponse = await context.langClient.getGraphqlTypeModel(params);
                resolve(res);
            } catch (error) {
                console.log(">>> Error obtaining GraphqlTypeModel", error);
                resolve(undefined);
            }
        });
    }
}
