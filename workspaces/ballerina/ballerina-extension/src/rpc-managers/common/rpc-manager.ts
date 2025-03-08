/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 * 
 * THIS FILE INCLUDES AUTO GENERATED CODE
 */
import {
    BallerinaDiagnosticsRequest,
    BallerinaDiagnosticsResponse,
    CommandResponse,
    CommandsRequest,
    CommandsResponse,
    CommonRPCAPI,
    Completion,
    CompletionParams,
    DiagnosticData,
    FileOrDirRequest,
    FileOrDirResponse,
    GoToSourceRequest,
    OpenExternalUrlRequest,
    RunExternalCommandRequest,
    RunExternalCommandResponse,
    SyntaxTree,
    TypeResponse,
    vscode,
    WorkspaceFileRequest,
    WorkspaceRootResponse,
    WorkspacesFileResponse,
} from "@dharshi/ballerina-core";
// import child_process from 'child_process';
import { FileType, Uri, commands, env, window, workspace } from "vscode";
// import { URI } from "vscode-uri";
// import { ballerinaExtInstance } from "../../core";
import { StateMachine } from "../../state-machine";
// import { goToSource } from "../../utils";
import { askFilePath, askProjectPath, getUpdatedSource } from "./utils";
import { balExtInstance } from "../../extension";

export class CommonRpcManager implements CommonRPCAPI {
    async getTypeCompletions(): Promise<TypeResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            const completionParams: CompletionParams = {
                textDocument: {
                    uri: Uri.file(context.documentUri!).toString()
                },
                context: {
                    triggerKind: 25,
                },
                position: {
                    character: 0,
                    line: 0
                }
            };

            // const completions: Completion[] = await StateMachine.langClient().getCompletion(completionParams);
            // const filteredCompletions: Completion[] = completions.filter(value => value.kind === 25 || value.kind === 23 || value.kind === 22);
            resolve({ data: [] });
        });
    }

    async goToSource(params: GoToSourceRequest): Promise<void> {
        const context = StateMachine.context();
        const filePath = params?.filePath || context.documentUri!;
        // goToSource(params.position, filePath);
    }

    async getWorkspaceFiles(params: WorkspaceFileRequest): Promise<WorkspacesFileResponse> {
        const files = [];
        console.log(workspace.workspaceFolders);
        const workspaceRoot = workspace.workspaceFolders![0].uri;
        console.log("workspace root: ", workspaceRoot);
        const workspaceFiles = await balExtInstance.fsProvider.readWorkspaceFiles(workspaceRoot);
        console.log("workspaceFiles: ", workspaceFiles);
        return { files: workspaceFiles, workspaceRoot: `${workspaceRoot.scheme}:${workspaceRoot.path}` };
    }

    async getBallerinaDiagnostics(params: BallerinaDiagnosticsRequest): Promise<BallerinaDiagnosticsResponse> {
        return new Promise(async (resolve) => {
            // Get the current working document Uri
            const documentUri = Uri.parse(StateMachine.context().documentUri).toString();

            const fullST = await StateMachine.langClient().getSyntaxTree({
                documentIdentifier: { uri: documentUri }
            }) as SyntaxTree;

            const currentSource = fullST.syntaxTree.source;

            // Get the updated source when applied to the current source
            const updatedSource = getUpdatedSource(params.ballerinaSource, currentSource, params.targetPosition, params.skipSemiColon);
            if (updatedSource) {
                // Send the didChange event with new changes
                // StateMachine.langClient().didChange({
                //     contentChanges: [
                //         {
                //             text: updatedSource
                //         }
                //     ],
                //     textDocument: {
                //         uri: documentUri,
                //         version: 1
                //     }
                // });

                // Get any diagnostics
                const diagResp = await StateMachine.langClient().getDiagnostics({
                    documentIdentifier: {
                        uri: documentUri,
                    }
                }) as DiagnosticData[];

                // Revert the changes back to the original
                // StateMachine.langClient().didChange({
                //     contentChanges: [
                //         {
                //             text: currentSource
                //         }
                //     ],
                //     textDocument: {
                //         uri: documentUri,
                //         version: 1
                //     }
                // });

                const response = {
                    diagnostics: params.checkSeverity ?
                        diagResp[0]?.diagnostics.filter(diag => diag.severity === params.checkSeverity) || [] :
                        diagResp[0]?.diagnostics || []
                } as BallerinaDiagnosticsResponse;
                resolve(response);

            }
        });
    }

    async executeCommand(params: CommandsRequest): Promise<CommandsResponse> {
        return new Promise(async (resolve) => {
            if (params.commands.length >= 1) {
                const cmdArgs = params.commands.length > 1 ? params.commands.slice(1) : [];
                await commands.executeCommand(params.commands[0], ...cmdArgs);
                resolve({ data: "SUCCESS" });
            }
        });
    }

    async selectFileOrDirPath(params: FileOrDirRequest): Promise<FileOrDirResponse> {
        return new Promise(async (resolve) => {
            if (params.isFile) {
                const selectedFile = await askFilePath();
                if (!selectedFile || selectedFile.length === 0) {
                    window.showErrorMessage('A file must be selected');
                    resolve({ path: "" });
                } else {
                    const filePath = selectedFile[0].fsPath;
                    resolve({ path: filePath });
                }
            } else {
                const selectedDir = await askProjectPath();
                if (!selectedDir || selectedDir.length === 0) {
                    window.showErrorMessage('A folder must be selected');
                    resolve({ path: "" });
                } else {
                    const dirPath = selectedDir[0].fsPath;
                    resolve({ path: dirPath });
                }
            }
        });
    }

    async experimentalEnabled(): Promise<boolean> {
        // return ballerinaExtInstance.enabledExperimentalFeatures();
        return false;
    }

    async runBackgroundTerminalCommand(params: RunExternalCommandRequest): Promise<RunExternalCommandResponse> {
        return new Promise<CommandResponse>(async function (resolve) {
            const response = await fetch(`http://localhost:9091/bala/pull`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    command: params.command   
                })
            });
            const stdout = await response.text();
            console.log("pull response: ", stdout);
            if (!response.ok) {
                resolve({
                    error: true,
                    message: stdout
                });
            } else {
                resolve({
                    error: false,
                    message: stdout
                });
            }
            // child_process.exec(`${params.command}`, async (err, stdout, stderr) => {
            //     if (err) {
            //         resolve({
            //             error: true,
            //             message: stderr
            //         });
            //     } else {
            //         resolve({
            //             error: false,
            //             message: stdout
            //         });
            //     }
            // });



            resolve({error: false, message: "pull success"});
        });
    }

    async openExternalUrl(params: OpenExternalUrlRequest): Promise<void> {
        env.openExternal(Uri.parse(params.url));
    }

    async getWorkspaceRoot(): Promise<WorkspaceRootResponse> {
        return new Promise(async (resolve) => {
            const workspaceFolders = workspace.workspaceFolders;
            resolve(workspaceFolders ? { path: workspaceFolders[0].uri.fsPath } : { path: "" });
        });
    }
}
