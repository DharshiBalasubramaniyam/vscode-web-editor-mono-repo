
import { LibraryDataRequest, LibraryDataResponse, LibrariesListResponse, LibrarySearchResponse, LibrariesListRequest } from "./interfaces";

export interface LibraryBrowserAPI {
    getLibrariesList: (params: LibrariesListRequest) => Promise<LibrariesListResponse>;
    getLibrariesData: () => Promise<LibrarySearchResponse>;
    getLibraryData: (params: LibraryDataRequest) => Promise<LibraryDataResponse>;
}
