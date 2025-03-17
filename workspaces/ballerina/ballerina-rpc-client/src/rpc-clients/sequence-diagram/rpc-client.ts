
import {
    SequenceDiagramAPI,
    SequenceModelResponse,
    getSequenceModel
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class SequenceDiagramRpcClient implements SequenceDiagramAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getSequenceModel(): Promise<SequenceModelResponse> {
        return this._messenger.sendRequest(getSequenceModel, HOST_EXTENSION);
    }

    
}
