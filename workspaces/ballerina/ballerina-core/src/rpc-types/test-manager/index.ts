
import { GetTestFunctionRequest, GetTestFunctionResponse, AddOrUpdateTestFunctionRequest } from "../../interfaces/extended-lang-client";
import { SourceUpdateResponse } from "../service-designer/interfaces";

export interface TestManagerServiceAPI {    
    updateTestFunction: (params: AddOrUpdateTestFunctionRequest) => Promise<SourceUpdateResponse>;
    addTestFunction: (params: AddOrUpdateTestFunctionRequest) => Promise<SourceUpdateResponse>;
    getTestFunction: (params: GetTestFunctionRequest) => Promise<GetTestFunctionResponse>;
}
