
import {
    ICPEnabledResponse, ICPEnabledRequest,
    addICP, disableICP, isIcpEnabled, ICPServiceAPI
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class ICPServiceRpcClient implements ICPServiceAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }
    isIcpEnabled(params: ICPEnabledRequest): Promise<ICPEnabledResponse> {
        return this._messenger.sendRequest(isIcpEnabled, HOST_EXTENSION, params);
    }

    addICP(params: ICPEnabledRequest): Promise<ICPEnabledResponse> {
        return this._messenger.sendRequest(addICP, HOST_EXTENSION, params);
    }

    disableICP(params: ICPEnabledRequest): Promise<ICPEnabledResponse> {
        return this._messenger.sendRequest(disableICP, HOST_EXTENSION, params);
    }
}
