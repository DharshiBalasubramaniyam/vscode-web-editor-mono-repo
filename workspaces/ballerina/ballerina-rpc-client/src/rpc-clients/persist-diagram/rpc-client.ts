
import {
    PersistDiagramAPI,
    PersistERModel,
    getPersistERModel,
    showProblemPanel
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class PersistDiagramRpcClient implements PersistDiagramAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getPersistERModel(): Promise<PersistERModel> {
        return this._messenger.sendRequest(getPersistERModel, HOST_EXTENSION);
    }

    showProblemPanel(): void {
        return this._messenger.sendNotification(showProblemPanel, HOST_EXTENSION);
    }
}
