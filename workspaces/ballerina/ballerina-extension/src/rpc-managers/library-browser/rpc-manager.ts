import {
    LibrariesListRequest,
    LibrariesListResponse,
    LibraryBrowserAPI,
    LibraryDataRequest,
    LibraryDataResponse,
    LibrarySearchResponse
} from "@dharshi/ballerina-core";
import { getAllResources, getLibrariesList, getLibraryData } from "../../activators/library-browser";

export class LibraryBrowserRpcManager implements LibraryBrowserAPI {
    async getLibrariesList(params: LibrariesListRequest): Promise<LibrariesListResponse> {
        return getLibrariesList(params.kind);
    }

    async getLibrariesData(): Promise<LibrarySearchResponse> {
        return getAllResources();
    }

    async getLibraryData(params: LibraryDataRequest): Promise<LibraryDataResponse> {
        console.log("getting libaray data..");
        return getLibraryData(params.orgName, params.moduleName, params.version);
    }
}
