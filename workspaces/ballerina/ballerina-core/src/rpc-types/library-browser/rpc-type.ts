
import { LibraryDataRequest, LibraryDataResponse, LibrariesListResponse, LibrarySearchResponse, LibrariesListRequest } from "./interfaces";
import { RequestType } from "vscode-messenger-common";

const _preFix = "library-browser";
export const getLibrariesList: RequestType<LibrariesListRequest, LibrariesListResponse> = { method: `${_preFix}/getLibrariesList` };
export const getLibrariesData: RequestType<void, LibrarySearchResponse> = { method: `${_preFix}/getLibrariesData` };
export const getLibraryData: RequestType<LibraryDataRequest, LibraryDataResponse> = { method: `${_preFix}/getLibraryData` };
