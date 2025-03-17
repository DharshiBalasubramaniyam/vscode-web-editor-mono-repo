
import { GetGraphqlTypeRequest, GetGraphqlTypeResponse } from "../../interfaces/extended-lang-client";
import { GraphqlModelRequest, GraphqlModelResponse } from "./interfaces";
import { RequestType } from "vscode-messenger-common";

const _preFix = "graphql-designer";
export const getGraphqlModel: RequestType<GraphqlModelRequest, GraphqlModelResponse> = { method: `${_preFix}/getGraphqlModel` };
export const getGraphqlTypeModel: RequestType<GetGraphqlTypeRequest, GetGraphqlTypeResponse> = { method: `${_preFix}/getGraphqlTypeModel` };
