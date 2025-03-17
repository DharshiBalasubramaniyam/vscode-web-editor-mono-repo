
import {
    BallerinaDiagnosticsRequest,
    BallerinaDiagnosticsResponse,
    CommandsRequest,
    CommandsResponse,
    CommonRPCAPI,
    FileOrDirRequest,
    FileOrDirResponse,
    GoToSourceRequest,
    OpenExternalUrlRequest,
    RunExternalCommandRequest,
    RunExternalCommandResponse,
    TypeResponse,
    WorkspaceFileRequest,
    WorkspaceRootResponse,
    WorkspacesFileResponse,
    executeCommand,
    experimentalEnabled,
    getBallerinaDiagnostics,
    getTypeCompletions,
    getWorkspaceFiles,
    getWorkspaceRoot,
    goToSource,
    openExternalUrl,
    runBackgroundTerminalCommand,
    selectFileOrDirPath
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class CommonRpcClient implements CommonRPCAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getTypeCompletions(): Promise<TypeResponse> {
        return this._messenger.sendRequest(getTypeCompletions, HOST_EXTENSION);
    }

    goToSource(params: GoToSourceRequest): void {
        return this._messenger.sendNotification(goToSource, HOST_EXTENSION, params);
    }

    getWorkspaceFiles(params: WorkspaceFileRequest): Promise<WorkspacesFileResponse> {
        return this._messenger.sendRequest(getWorkspaceFiles, HOST_EXTENSION, params);
    }

    getBallerinaDiagnostics(params: BallerinaDiagnosticsRequest): Promise<BallerinaDiagnosticsResponse> {
        return this._messenger.sendRequest(getBallerinaDiagnostics, HOST_EXTENSION, params);
    }

    executeCommand(params: CommandsRequest): Promise<CommandsResponse> {
        return this._messenger.sendRequest(executeCommand, HOST_EXTENSION, params);
    }

    runBackgroundTerminalCommand(params: RunExternalCommandRequest): Promise<RunExternalCommandResponse> {
        return this._messenger.sendRequest(runBackgroundTerminalCommand, HOST_EXTENSION, params);
    }

    openExternalUrl(params: OpenExternalUrlRequest): void {
        return this._messenger.sendNotification(openExternalUrl, HOST_EXTENSION, params);
    }

    selectFileOrDirPath(params: FileOrDirRequest): Promise<FileOrDirResponse> {
        return this._messenger.sendRequest(selectFileOrDirPath, HOST_EXTENSION, params);
    }

    experimentalEnabled(): Promise<boolean> {
        return this._messenger.sendRequest(experimentalEnabled, HOST_EXTENSION);
    }

    getWorkspaceRoot(): Promise<WorkspaceRootResponse> {
        return this._messenger.sendRequest(getWorkspaceRoot, HOST_EXTENSION);
    }
}
