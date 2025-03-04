
import {
    LibrariesListRequest,
    LibrariesListResponse,
    LibraryBrowserAPI,
    LibraryDataRequest,
    LibraryDataResponse,
    LibrarySearchResponse,
    getLibrariesData,
    getLibrariesList,
    getLibraryData
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class LibraryBrowserRpcClient implements LibraryBrowserAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getLibrariesList(params: LibrariesListRequest): Promise<LibrariesListResponse> {
        return this._messenger.sendRequest(getLibrariesList, HOST_EXTENSION, params);
    }

    getLibrariesData(): Promise<LibrarySearchResponse> {
        return this._messenger.sendRequest(getLibrariesData, HOST_EXTENSION);
    }

    getLibraryData(params: LibraryDataRequest): Promise<LibraryDataResponse> {
        return this._messenger.sendRequest(getLibraryData, HOST_EXTENSION, params);
    }
}
