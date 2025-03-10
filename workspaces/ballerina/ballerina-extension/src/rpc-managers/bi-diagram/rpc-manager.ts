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
                    const fileUri = key;
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
        const fileUri = params?.filePath;
        for (const [key, value] of Object.entries(params.textEdits)) {
            // const fileUri = Uri.parse(key);
            // const fileUriString = fileUri.toString();
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
