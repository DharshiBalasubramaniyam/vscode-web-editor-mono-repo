
import {
    BallerinaDiagnosticsRequest,
    BallerinaDiagnosticsResponse,
    CommandsRequest,
    CommandsResponse,
    GoToSourceRequest,
    OpenExternalUrlRequest,
    FileOrDirResponse,
    RunExternalCommandRequest,
    RunExternalCommandResponse,
    TypeResponse,
    WorkspaceFileRequest,
    WorkspacesFileResponse,
    FileOrDirRequest,
    WorkspaceRootResponse
} from "./interfaces";
import { RequestType, NotificationType } from "vscode-messenger-common";

const _preFix = "common";
export const getTypeCompletions: RequestType<void, TypeResponse> = { method: `${_preFix}/getTypeCompletions` };
export const goToSource: NotificationType<GoToSourceRequest> = { method: `${_preFix}/goToSource` };
export const getWorkspaceFiles: RequestType<WorkspaceFileRequest, WorkspacesFileResponse> = { method: `${_preFix}/getWorkspaceFiles` };
export const getBallerinaDiagnostics: RequestType<BallerinaDiagnosticsRequest, BallerinaDiagnosticsResponse> = { method: `${_preFix}/getBallerinaDiagnostics` };
export const executeCommand: RequestType<CommandsRequest, CommandsResponse> = { method: `${_preFix}/executeCommand` };
export const runBackgroundTerminalCommand: RequestType<RunExternalCommandRequest, RunExternalCommandResponse> = { method: `${_preFix}/runBackgroundTerminalCommand` };
export const openExternalUrl: NotificationType<OpenExternalUrlRequest> = { method: `${_preFix}/openExternalUrl` };
export const selectFileOrDirPath: RequestType<FileOrDirRequest, FileOrDirResponse> = { method: `${_preFix}/selectFileOrDirPath` };
export const experimentalEnabled: RequestType<void, boolean> = { method: `${_preFix}/experimentalEnabled` };
export const getWorkspaceRoot: RequestType<void, WorkspaceRootResponse> = { method: `${_preFix}/getWorkspaceRoot` };
