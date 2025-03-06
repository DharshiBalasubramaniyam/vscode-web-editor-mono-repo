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
        // const ballerinaFiles = await getBallerinaFiles(Uri.file(projectUri).fsPath);

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
