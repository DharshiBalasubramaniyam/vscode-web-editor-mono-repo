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
    AIChatRequest,
    AddFunctionRequest,
    AddFunctionResponse,
    BIAiSuggestionsRequest,
    BIAiSuggestionsResponse,
    BIAvailableNodesRequest,
    BIAvailableNodesResponse,
    BIConnectorsRequest,
    BIConnectorsResponse,
    BICopilotContextRequest,
    BIDeleteByComponentInfoRequest,
    BIDeleteByComponentInfoResponse,
    BIDesignModelResponse,
    BIDiagramAPI,
    BIFlowModelRequest,
    BIFlowModelResponse,
    BIGetEnclosedFunctionRequest,
    BIGetEnclosedFunctionResponse,
    BIGetFunctionsRequest,
    BIGetFunctionsResponse,
    BIGetVisibleVariableTypesRequest,
    BIGetVisibleVariableTypesResponse,
    BIModuleNodesRequest,
    BIModuleNodesResponse,
    BINodeTemplateRequest,
    BINodeTemplateResponse,
    BISourceCodeRequest,
    BISourceCodeResponse,
    BISuggestedFlowModelRequest,
    BI_COMMANDS,
    BreakpointRequest,
    ClassFieldModifierRequest,
    ComponentRequest,
    ConfigVariableResponse,
    CreateComponentResponse,
    CurrentBreakpointsResponse,
    DIRECTORY_MAP,
    EVENT_TYPE,
    EndOfFileRequest,
    ExpressionCompletionsRequest,
    ExpressionCompletionsResponse,
    ExpressionDiagnosticsRequest,
    ExpressionDiagnosticsResponse,
    FlowNode,
    FormDidCloseParams,
    FormDidOpenParams,
    FunctionNode,
    FunctionNodeRequest,
    FunctionNodeResponse,
    GetTypeRequest,
    GetTypeResponse,
    GetTypesRequest,
    GetTypesResponse,
    ImportStatement,
    ImportStatements,
    LinePosition,
    ModelFromCodeRequest,
    ProjectComponentsResponse,
    ProjectImports,
    ProjectRequest,
    ProjectStructureResponse,
    ReadmeContentRequest,
    ReadmeContentResponse,
    STModification,
    ServiceClassModelResponse,
    ServiceClassSourceRequest,
    SignatureHelpRequest,
    SignatureHelpResponse,
    SyntaxTree,
    UpdateConfigVariableRequest,
    UpdateConfigVariableResponse,
    UpdateTypeRequest,
    UpdateTypeResponse,
    UpdateImportsRequest,
    UpdateImportsResponse,
    VisibleTypesRequest,
    VisibleTypesResponse,
    WorkspaceFolder,
    WorkspacesResponse,
    buildProjectStructure,
    TextEdit,
    SourceEditResponse,
    AddFieldRequest,
    RenameRequest,
    RenameIdentifierRequest,
} from "@dharshi/ballerina-core";
// import * as fs from "fs";
// import { writeFileSync } from "fs";
// import * as path from 'path';
import * as vscode from "vscode";

import {
    ShellExecution,
    Task,
    TaskDefinition,
    Uri, ViewColumn, commands,
    tasks,
    window, workspace
} from "vscode";
// import { DebugProtocol } from "vscode-debugprotocol";
// import { extension } from "../../BalExtensionContext";
import { notifyBreakpointChange } from "../../RPCLayer";
// import { ballerinaExtInstance } from "../../core";
// import { BreakpointManager } from "../../features/debugger/breakpoint-manager";
import { StateMachine, openView, updateView } from "../../state-machine";
import { balExtInstance, WEB_IDE_SCHEME } from "../../extension";
// import { getCompleteSuggestions } from '../../utils/ai/completions';
// import { README_FILE, createBIAutomation, createBIFunction, createBIProjectPure } from "../../utils/bi";
// import { writeBallerinaFileDidOpen } from "../../utils/modification";
// import { BACKEND_API_URL_V2, refreshAccessToken } from "../ai-panel/utils";
// import { DATA_MAPPING_FILE_NAME, getFunctionNodePosition } from "./utils";

export class BiDiagramRpcManager 
// implements BIDiagramAPI 
{

    async getTypes(params: GetTypesRequest): Promise<GetTypesResponse> {
        const projectUri = StateMachine.context().projectUri;

        return new Promise((resolve, reject) => {
            StateMachine.langClient()
                .getTypes({ filePath: params.filePath })
                .then((types) => {
                    resolve(types);
                }).catch((error) => {
                    console.log(">>> error fetching types from ls", error);
                    reject(error);
                });
        });
    }

    async getType(params: GetTypeRequest): Promise<GetTypeResponse> {
        return new Promise((resolve, reject) => {
            StateMachine.langClient()
                .getType(params)
                .then((type) => {
                    console.log(">>> type from ls", type);
                    resolve(type);
                })
                .catch((error) => {
                    console.log(">>> error fetching type from ls", error);
                    reject(error);
                });
        });
    }

    async getVisibleVariableTypes(params: BIGetVisibleVariableTypesRequest): Promise<BIGetVisibleVariableTypesResponse> {
        return new Promise((resolve, reject) => {
            StateMachine.langClient()
                .getVisibleVariableTypes(params)
                .then((types) => {
                    resolve(types as BIGetVisibleVariableTypesResponse);
                })
                .catch((error) => {
                    reject("Error fetching visible variable types from ls");
                });
        });
    }

    async getExpressionCompletions(params: ExpressionCompletionsRequest): Promise<ExpressionCompletionsResponse> {
        return new Promise((resolve, reject) => {
            if (!params.filePath) {
                params.filePath = StateMachine.context().documentUri;
            }
            StateMachine.langClient()
                .getExpressionCompletions(params)
                .then((completions) => {
                    resolve(completions);
                })
                .catch((error) => {
                    reject("Error fetching expression completions from ls");
                });
        });
    }

    async getConfigVariables(): Promise<ConfigVariableResponse> {
        return new Promise(async (resolve) => {
            const projectPath = StateMachine.context().projectUri;
            const variables = await StateMachine.langClient().getConfigVariables({ projectPath: projectPath }) as ConfigVariableResponse;
            resolve(variables);
        });
    }

    async updateConfigVariables(params: UpdateConfigVariableRequest): Promise<UpdateConfigVariableResponse> {
        return new Promise(async (resolve) => {
            const req: UpdateConfigVariableRequest = params;

            // if (!fs.existsSync(params.configFilePath)) {

            //     // Create config.bal if it doesn't exist
            //     writeBallerinaFileDidOpen(params.configFilePath, "\n");
            // }

            const response = await StateMachine.langClient().updateConfigVariables(req) as BISourceCodeResponse;
            this.updateSource(response, undefined, false);
            resolve(response);
        });
    }

    async renameIdentifier(params: RenameIdentifierRequest): Promise<void> {
        console.log("rename identifier params: ", params);
        // const projectUri = StateMachine.context().projectUri;
        // const filePath = path.join(projectUri, params.fileName);

        const fileUri = Uri.parse(params.fileName).toString();
        const request: RenameRequest = {
            textDocument: {
                uri: fileUri
            },
            position: params.position,
            newName: params.newName
        };

        console.log("rename request: ", request);

        try {
            const workspaceEdit = await StateMachine.langClient().rename(request);
            console.log("workspace edit response: ", workspaceEdit);

            if (workspaceEdit && 'changes' in workspaceEdit && workspaceEdit.changes) {
                const modificationRequests: Record<string, { filePath: string; modifications: STModification[] }> = {};

                for (const [key, value] of Object.entries(workspaceEdit.changes)) {
                    const fileUri = Uri.parse(`${WEB_IDE_SCHEME}:${Uri.parse(key).path}`).toString();
                    const edits = value;

                    if (edits && edits.length > 0) {
                        const modificationList: STModification[] = [];

                        for (const edit of edits) {
                            const stModification: STModification = {
                                startLine: edit.range.start.line,
                                startColumn: edit.range.start.character,
                                endLine: edit.range.end.line,
                                endColumn: edit.range.end.character,
                                type: "INSERT",
                                isImport: false,
                                config: {
                                    STATEMENT: edit.newText,
                                },
                            };
                            modificationList.push(stModification);
                        }

                        modificationList.sort((a, b) => a.startLine - b.startLine);

                        if (modificationRequests[fileUri]) {
                            modificationRequests[fileUri].modifications.push(...modificationList);
                        } else {
                            modificationRequests[fileUri] = { filePath: Uri.parse(fileUri).toString(), modifications: modificationList };
                        }
                    }
                }

                try {
                    for (const [fileUriString, request] of Object.entries(modificationRequests)) {
                        console.log(fileUriString);
                        const { parseSuccess, source, syntaxTree } = (await StateMachine.langClient().stModify({
                            documentIdentifier: { uri: fileUriString },
                            astModifications: request.modifications,
                        })) as SyntaxTree;

                        if (parseSuccess) {
                            console.log("doing workspace edit");
                            const fileUri = Uri.parse(request.filePath);
                            const workspaceEdit = new vscode.WorkspaceEdit();
                            workspaceEdit.replace(
                                fileUri,
                                new vscode.Range(
                                    new vscode.Position(0, 0),
                                    new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
                                ),
                                source
                            );
                            
                            await workspace.applyEdit(workspaceEdit);
                        }
                    }
                } catch (error) {
                    console.log(">>> error updating source", error);
                }
                updateView();
            }
        } catch (error) {
            console.error('Error in renameIdentifier:', error);
            throw error;
        }
    }

    async updateType(params: UpdateTypeRequest): Promise<UpdateTypeResponse> {
        // const projectUri = StateMachine.context().projectUri;
        // const filePath = path.join(projectUri, params.filePath);
        return new Promise((resolve, reject) => {
            StateMachine.langClient()
                .updateType({ filePath: params.filePath, type: params.type, description: "" })
                .then((updateTypeResponse: UpdateTypeResponse) => {
                    updateTypeResponse.filePath = params.filePath;
                    console.log(">>> update type response", updateTypeResponse);
                    this.updateSource(updateTypeResponse);
                    resolve(updateTypeResponse);
                    updateView();
                }).catch((error) => {
                    console.log(">>> error fetching types from ls", error);
                    reject(error);
                });
        });
    }

    async updateSource(
        params: BISourceCodeResponse,
        flowNode?: FlowNode | FunctionNode,
        isConnector?: boolean,
        isFunctionNodeUpdate?: boolean
    ): Promise<void> {
        const modificationRequests: Record<string, { filePath: string; modifications: STModification[] }> = {};
        for (const [key, value] of Object.entries(params.textEdits)) {
            let fileUri = key.replace(/\\/g, "/");
            const projectRootPath = Uri.parse(StateMachine.context().projectUri).path
            const startIndex = fileUri.indexOf(projectRootPath);
            if (startIndex !== -1) {
                fileUri = Uri.file(fileUri.substring(startIndex)).with({scheme: WEB_IDE_SCHEME}).toString();
            }

            console.log({
                "actual key": key,
                "projecturi": projectRootPath,
                "new key": fileUri
            });

            const edits = value;

            if (edits && edits.length > 0) {
                const modificationList: STModification[] = [];

                for (const edit of edits) {
                    const stModification: STModification = {
                        startLine: edit.range.start.line,
                        startColumn: edit.range.start.character,
                        endLine: edit.range.end.line,
                        endColumn: edit.range.end.character,
                        type: "INSERT",
                        isImport: false,
                        config: {
                            STATEMENT: edit.newText,
                        },
                    };
                    modificationList.push(stModification);
                }

                if (modificationRequests[fileUri]) {
                    modificationRequests[fileUri].modifications.push(...modificationList);
                } else {
                    modificationRequests[fileUri] = { filePath: fileUri, modifications: modificationList };
                }
            }
        }

        // Iterate through modificationRequests and apply modifications
        try {
            for (const [fileUriString, request] of Object.entries(modificationRequests)) {
                const { parseSuccess, source, syntaxTree } = (await StateMachine.langClient().stModify({
                    documentIdentifier: { uri: fileUriString },
                    astModifications: request.modifications,
                })) as SyntaxTree;

                if (parseSuccess) {
                    const fileUri = Uri.parse(request.filePath);
                    const workspaceEdit = new vscode.WorkspaceEdit();
                    workspaceEdit.replace(
                        fileUri,
                        new vscode.Range(
                            new vscode.Position(0, 0),
                            new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
                        ),
                        source
                    );
                    await workspace.applyEdit(workspaceEdit);

                    if (isConnector) {
                        // Temp fix: ResolveMissingDependencies does not work unless we call didOpen, This needs to be fixed in the LS
                        await StateMachine.langClient().didOpen({
                            textDocument: { uri: fileUriString, languageId: "ballerina", version: 1, text: source },
                        });
                    } else if (isFunctionNodeUpdate) {
                        // const functionPosition = getFunctionNodePosition(flowNode.properties, syntaxTree);
                        // openView(EVENT_TYPE.OPEN_VIEW, {
                        //     documentUri: request.filePath,
                        //     position: functionPosition,
                        // });
                    }
                }
            }
        } catch (error) {
            console.log(">>> error updating source", error);
        }
        if (!isConnector && !isFunctionNodeUpdate) {
            updateView();
        }
    }

    async getProjectStructure(): Promise<ProjectStructureResponse> {
        return new Promise(async (resolve) => {
            const projectPath = StateMachine.context().projectUri;
            const res: ProjectStructureResponse = await buildProjectStructure(
                projectPath,
                StateMachine.context().langClient
            );
            resolve(res);
        });
    }

    async getVisibleTypes(params: VisibleTypesRequest): Promise<VisibleTypesResponse> {
        return new Promise((resolve, reject) => {
            StateMachine.langClient()
                .getVisibleTypes(params)
                .then((visibleTypes) => {
                    resolve(visibleTypes);
                })
                .catch((error) => {
                    reject("Error fetching visible types from ls");
                });
        });
    }

    async getEndOfFile(params: EndOfFileRequest): Promise<LinePosition> {
        return new Promise(async (resolve, reject) => {
            const { filePath } = params;
            try {
                const fileContent = await balExtInstance.fsProvider.readFile(Uri.parse(filePath));
                const lines = (new TextDecoder().decode(fileContent)).split('\n');
                const lastLine = lines[lines.length - 1];
                const lastLineLength = lastLine.length;
                resolve({ line: lines.length - 1, offset: lastLineLength });
            } catch (error) {
                console.log(error);
                resolve({ line: 0, offset: 0 });
            }
        });
    }

    // async formDidOpen(params: FormDidOpenParams): Promise<void> {
    //     return new Promise(async (resolve, reject) => {
    //         const { filePath } = params;
    //         const fileUri = Uri.file(filePath);
    //         const exprFileSchema = fileUri.with({ scheme: 'expr' });
    
    //         let languageId: string;
    //         let version: number;
    //         let text: string;
            
    //         try {
    //             const textDocument = await workspace.openTextDocument(fileUri);
    //             languageId = textDocument.languageId;
    //             version = textDocument.version;
    //             text = textDocument.getText();
    //         } catch (error) {
    //             languageId = "ballerina";
    //             version = 1;
    //             text = "";
    //         }

    //         StateMachine.langClient().didOpen({
    //             textDocument: {
    //                 uri: exprFileSchema.toString(),
    //                 languageId,
    //                 version,
    //                 text
    //             }
    //         });
    //     });
    // }

    // async formDidClose(params: FormDidCloseParams): Promise<void> {
    //     return new Promise(async (resolve, reject) => {
    //         try {
    //             const { filePath } = params;
    //             const fileUri = Uri.file(filePath);
    //             const exprFileSchema = fileUri.with({ scheme: 'expr' });
    //             StateMachine.langClient().didClose({
    //                 textDocument: {
    //                     uri: exprFileSchema.toString()
    //                 }
    //             });
    //             resolve();
    //         } catch (error) {
    //             console.error("Error closing file in didClose", error);
    //             reject(error);
    //         }
    //     });
    // }




}

// export async function fetchWithToken(url: string, options: RequestInit) {
//     let response = await fetch(url, options);
//     console.log("Response status: ", response.status);
//     if (response.status === 401) {
//         console.log("Token expired. Refreshing token...");
//         const newToken = await refreshAccessToken();
//         console.log("refreshed token : " + newToken);
//         if (newToken) {
//             options.headers = {
//                 ...options.headers,
//                 'Authorization': `Bearer ${newToken}`,
//             };
//             response = await fetch(url, options);
//         }
//     }
//     return response;
// }

// export async function getBallerinaFiles(dir: string): Promise<string[]> {
//     let files: string[] = [];
//     const entries = fs.readdirSync(dir, { withFileTypes: true });

//     for (const entry of entries) {
//         const entryPath = path.join(dir, entry.name);
//         if (entry.isDirectory()) {
//             files = files.concat(await getBallerinaFiles(entryPath));
//         } else if (entry.isFile() && entry.name.endsWith(".bal")) {
//             files.push(entryPath);
//         }
//     }
//     return files;
// }

// export async function extractImports(content: string, filePath: string): Promise<ImportStatements> {
//     const withoutSingleLineComments = content.replace(/\/\/.*$/gm, "");
//     const withoutComments = withoutSingleLineComments.replace(/\/\*[\s\S]*?\*\//g, "");

//     const importRegex = /import\s+([\w\.\/]+)(?:\s+as\s+([\w]+))?;/g;
//     const imports: ImportStatement[] = [];
//     let match;

//     while ((match = importRegex.exec(withoutComments)) !== null) {
//         const importStatement: ImportStatement = { moduleName: match[1] };
//         if (match[2]) {
//             importStatement.alias = match[2];
//         }
//         imports.push(importStatement);
//     }

//     return { filePath, statements: imports };
// }
