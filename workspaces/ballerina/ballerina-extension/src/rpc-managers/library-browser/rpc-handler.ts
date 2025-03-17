import {
    LibrariesListRequest,
    LibraryDataRequest,
    getLibrariesData,
    getLibrariesList,
    getLibraryData
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { LibraryBrowserRpcManager } from "./rpc-manager";

export function registerLibraryBrowserRpcHandlers(messenger: Messenger) {
    const rpcManger = new LibraryBrowserRpcManager();
    messenger.onRequest(getLibrariesList, (args: LibrariesListRequest) => rpcManger.getLibrariesList(args));
    messenger.onRequest(getLibrariesData, () => rpcManger.getLibrariesData());
    messenger.onRequest(getLibraryData, (args: LibraryDataRequest) => rpcManger.getLibraryData(args));
}
