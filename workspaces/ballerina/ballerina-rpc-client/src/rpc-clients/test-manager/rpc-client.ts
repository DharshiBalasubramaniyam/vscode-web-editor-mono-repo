
import { TestManagerServiceAPI, GetTestFunctionRequest, AddOrUpdateTestFunctionRequest, 
    TestSourceEditResponse, GetTestFunctionResponse, 
    getTestFunction, addTestFunction, updateTestFunction,  
    SourceUpdateResponse} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class TestManagerServiceRpcClient implements TestManagerServiceAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getTestFunction(params: GetTestFunctionRequest): Promise<GetTestFunctionResponse> {
        return this._messenger.sendRequest(getTestFunction, HOST_EXTENSION, params);
    }

    addTestFunction(params: AddOrUpdateTestFunctionRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(addTestFunction, HOST_EXTENSION, params);
    }

    updateTestFunction(params: AddOrUpdateTestFunctionRequest): Promise<SourceUpdateResponse> {
        return this._messenger.sendRequest(updateTestFunction, HOST_EXTENSION, params);
    }
}
