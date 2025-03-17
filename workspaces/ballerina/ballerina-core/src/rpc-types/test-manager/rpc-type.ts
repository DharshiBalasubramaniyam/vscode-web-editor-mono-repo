
import { GetTestFunctionRequest, GetTestFunctionResponse, AddOrUpdateTestFunctionRequest } from "../../interfaces/extended-lang-client";
import { RequestType } from "vscode-messenger-common";
import { SourceUpdateResponse } from "../service-designer/interfaces";

const _preFix = "test-manager";
export const getTestFunction: RequestType<GetTestFunctionRequest, GetTestFunctionResponse> = 
{ method: `${_preFix}/getTestFunction` };
export const addTestFunction: RequestType<AddOrUpdateTestFunctionRequest, SourceUpdateResponse> = 
{ method: `${_preFix}/addTestFunction` };
export const updateTestFunction: RequestType<AddOrUpdateTestFunctionRequest, SourceUpdateResponse> = 
{ method: `${_preFix}/updateTestFunction` };
