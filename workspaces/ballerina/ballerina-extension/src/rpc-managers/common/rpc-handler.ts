import {
    BallerinaDiagnosticsRequest,
    CommandsRequest,
    FileOrDirRequest,
    GoToSourceRequest,
    OpenExternalUrlRequest,
    RunExternalCommandRequest,
    WorkspaceFileRequest,
    executeCommand,
    experimentalEnabled,
    getBallerinaDiagnostics,
    getTypeCompletions,
    getWorkspaceFiles,
    getWorkspaceRoot,
    goToSource,
    openExternalUrl,
    runBackgroundTerminalCommand,
    selectFileOrDirPath,
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { CommonRpcManager } from "./rpc-manager";

export function registerCommonRpcHandlers(messenger: Messenger) {
    const rpcManger = new CommonRpcManager();
    messenger.onRequest(getTypeCompletions, () => rpcManger.getTypeCompletions());
    messenger.onNotification(goToSource, (args: GoToSourceRequest) => rpcManger.goToSource(args));
    messenger.onRequest(getWorkspaceFiles, (args: WorkspaceFileRequest) => rpcManger.getWorkspaceFiles(args));
    messenger.onRequest(getBallerinaDiagnostics, (args: BallerinaDiagnosticsRequest) => rpcManger.getBallerinaDiagnostics(args));
    messenger.onRequest(executeCommand, (args: CommandsRequest) => rpcManger.executeCommand(args));
    messenger.onRequest(runBackgroundTerminalCommand, (args: RunExternalCommandRequest) => rpcManger.runBackgroundTerminalCommand(args));
    messenger.onNotification(openExternalUrl, (args: OpenExternalUrlRequest) => rpcManger.openExternalUrl(args));
    messenger.onRequest(selectFileOrDirPath, (args: FileOrDirRequest) => rpcManger.selectFileOrDirPath(args));
    messenger.onRequest(experimentalEnabled, () => rpcManger.experimentalEnabled());
    messenger.onRequest(getWorkspaceRoot, () => rpcManger.getWorkspaceRoot());
}
