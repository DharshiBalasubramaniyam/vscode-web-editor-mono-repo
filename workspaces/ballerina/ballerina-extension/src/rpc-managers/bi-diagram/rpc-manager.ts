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
    BISearchRequest,
    BISearchResponse,
    UpdateTypesRequest,
    UpdateTypesResponse,
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
    BallerinaProjectComponents,
    NodePosition,
} from "@dharshi/ballerina-core";
import * as vscode from "vscode";

import {
    ShellExecution,
    Task,
    TaskDefinition,
    Uri, ViewColumn, commands,
    tasks,
    window, workspace
} from "vscode";
import { StateMachine, openView, updateView } from "../../state-machine";
import { balExtInstance, WEB_IDE_SCHEME } from "../../extension";
import { getFunctionNodePosition } from "./utils";

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

    async createGraphqlClassType(params: UpdateTypeRequest): Promise<UpdateTypeResponse> {
        const filePath = StateMachine.context().documentUri;
        return new Promise((resolve, reject) => {
            StateMachine.langClient()
                .createGraphqlClassType({ filePath, type: params.type, description: "" })
                .then((updateTypeResponse: UpdateTypeResponse) => {
                    console.log(">>> create graphql class type response", updateTypeResponse);
                    this.updateSource(updateTypeResponse);
                    resolve(updateTypeResponse);
                }).catch((error) => {
                    console.log(">>> error fetching class type from ls", error);
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
                    const edits = value as any[];

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

    async deleteFlowNode(params: BISourceCodeRequest): Promise<BISourceCodeResponse> {
        console.log(">>> requesting bi delete node from ls", params);
        return new Promise((resolve) => {
            StateMachine.langClient()
                .deleteFlowNode(params)
                .then((model) => {
                    console.log(">>> bi delete node from ls", model);
                    this.updateSource(model, params.flowNode);
                    resolve(model);
                })
                .catch((error) => {
                    console.log(">>> error fetching delete node from ls", error);
                    return new Promise((resolve) => {
                        resolve(undefined);
                    });
                });
        });
    }

    async updateTypes(params: UpdateTypesRequest): Promise<UpdateTypesResponse> {
        return new Promise((resolve, reject) => {
            const projectUri = StateMachine.context().projectUri;
            if (StateMachine.context().isBI) {
                params.filePath = Uri.joinPath(Uri.parse(projectUri), params.filePath).toString();
            }
            StateMachine.langClient().updateTypes(
                params
            ).then((updateTypesresponse: UpdateTypesResponse) => {
                console.log(">>> update type response", updateTypesresponse);
                if (updateTypesresponse.textEdits) {
                    this.updateSource({ textEdits: updateTypesresponse.textEdits });
                    resolve(updateTypesresponse);
                } else {
                    console.log(">>> error updating types", updateTypesresponse?.errorMsg);
                    resolve(undefined);
                }
            }).catch((error) => {
                console.log(">>> error updating types", error);
                reject(error);
            });
        });
    }

    async getFunctionNode(params: FunctionNodeRequest): Promise<FunctionNodeResponse> {
        return new Promise((resolve) => {
            StateMachine.langClient().getFunctionNode(params)
                .then((response) => {
                    resolve(response);
                })
                .catch((error) => {
                    console.log(">>> Error getting function node", error);
                    resolve(undefined);
                });
        });
    }

    async getServiceClassModel(params: ModelFromCodeRequest): Promise<ServiceClassModelResponse> {
        return new Promise(async (resolve) => {
            try {
                const res: ServiceClassModelResponse = await StateMachine.langClient().getServiceClassModel(params);
                resolve(res);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async createMainFunctionComponent(params: ComponentRequest): Promise<CreateComponentResponse> {
        if (params.type !== DIRECTORY_MAP.AUTOMATION) {
            return;
        }
        return new Promise(async (resolve) => {
            const paramLength = params.functionType?.parameters.length;
            let paramList = '';
            if (paramLength > 0) {
                params.functionType.parameters.forEach((param, index) => {
                    let paramValue = param.defaultValue ? `${param.type} ${param.name} = ${param.defaultValue}, ` : `${param.type} ${param.name}, `;
                    if (paramLength === index + 1) {
                        paramValue = param.defaultValue ? `${param.type} ${param.name} = ${param.defaultValue}` : `${param.type} ${param.name}`;
                    }
                    paramList += paramValue;
                });
            }
            let funcSignature = `public function main(${paramList}) returns error? {`;
            const balContent = `${funcSignature}\n\tdo {\n\n\t} on fail error e {\n\t\treturn e;\n\t}\n}`;
            const mainFile = Uri.joinPath(Uri.parse(StateMachine.context().projectUri), "main.bal").toString();
            console.log(balContent);
            this.getEndOfFile({ filePath: mainFile })
                .then(async (endofFile) => {
                    console.log(endofFile);
                    const workspaceEdit = new vscode.WorkspaceEdit();
                    workspaceEdit.replace(
                        Uri.parse(mainFile),
                        new vscode.Range(
                            new vscode.Position(endofFile.line, endofFile.offset),
                            new vscode.Position(Number.MAX_SAFE_INTEGER, Number.MAX_SAFE_INTEGER)
                        ),
                        endofFile.line === 0 ? balContent : `\n\n${balContent}`
                    );
                    await workspace.applyEdit(workspaceEdit);
                    const components = await StateMachine.langClient().getBallerinaProjectComponents({
                        documentIdentifiers: [{ uri: StateMachine.context().projectUri }]
                    }) as BallerinaProjectComponents;
                    const position: NodePosition = {};
                    for (const pkg of components.packages) {
                        for (const module of pkg.modules) {
                            module.automations.forEach(func => {
                                position.startColumn = func.startColumn;
                                position.startLine = func.startLine;
                                position.endLine = func.endLine;
                                position.endColumn = func.endColumn;
                            });
                        }
                    }
                    openView(EVENT_TYPE.OPEN_VIEW, { documentUri: mainFile, position });
                });
            resolve({ response: true, error: "" });
        });
    }

    async getSourceCode(params: BISourceCodeRequest): Promise<BISourceCodeResponse> {
        console.log(">>> requesting bi source code from ls", params);
        const { flowNode, isFunctionNodeUpdate } = params;
        return new Promise((resolve) => {
            StateMachine.langClient()
                .getSourceCode(params)
                .then(async (model) => {
                    if (params?.isConnector) {
                        await this.updateSource(model, flowNode, true, isFunctionNodeUpdate);
                        resolve(model);
                        commands.executeCommand("BI.project-explorer.refresh");
                    } else {
                        this.updateSource(model, flowNode, false, isFunctionNodeUpdate, !!!params.flowNode.codedata.lineRange);
                        resolve(model);
                    }
                })
                .catch((error) => {
                    console.log(">>> error fetching source code from ls", error);
                    return new Promise((resolve) => {
                        resolve(undefined);
                    });
                });
        });
    }

    async getNodeTemplate(params: BINodeTemplateRequest): Promise<BINodeTemplateResponse> {

        return new Promise((resolve) => {
            StateMachine.langClient()
                .getNodeTemplate(params)
                .then((model) => {
                    resolve(model);
                })
                .catch((error) => {
                    return new Promise((resolve) => {
                        resolve(undefined);
                    });
                });
        });
    }

    async updateSource(
        params: BISourceCodeResponse,
        flowNode?: FlowNode | FunctionNode,
        isConnector?: boolean,
        isFunctionNodeUpdate?: boolean,
        isNewFunction?: boolean
    ): Promise<void> {
        const modificationRequests: Record<string, { filePath: string; modifications: STModification[] }> = {};
        for (const [key, value] of Object.entries(params.textEdits)) {
            let fileUri = key.replace(/\\/g, "/");
            if (!isFunctionNodeUpdate) {
                const projectRootPath = Uri.parse(StateMachine.context().projectUri).path;
                const startIndex = fileUri.indexOf(projectRootPath);
                if (startIndex !== -1) {
                    fileUri = Uri.file(fileUri.substring(startIndex)).with({ scheme: WEB_IDE_SCHEME }).toString();
                }
                console.log({
                    "actual key": key,
                    "projecturi": projectRootPath,
                    "new key": fileUri
                });
            } else {
                fileUri = StateMachine.context().documentUri;
            }
            const edits = value;

            if (edits && edits.length > 0) {
                const modificationList: STModification[] = [];

                if (isNewFunction) {
                    await this.getEndOfFile({ filePath: fileUri })
                        .then((endofFile) => {
                            edits[0].range = {
                                start: { line: endofFile.line, character: endofFile.offset },
                                end: { line: endofFile.line, character: endofFile.offset }
                            };
                        });
                }

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

                    if (isFunctionNodeUpdate) {
                        const functionPosition = getFunctionNodePosition(flowNode.properties, syntaxTree);
                        openView(EVENT_TYPE.OPEN_VIEW, {
                            documentUri: request.filePath,
                            position: functionPosition,
                        });
                    }
                }
            }
        } catch (error) {
            console.log(">>> error updating source", error);
        }
        if (!isConnector) {
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
                console.log("get end of file content: ", lines);
                const lastLine = lines[lines.length - 1];
                const lastLineLength = lastLine.length;
                resolve({ line: lines.length - 1, offset: lastLineLength });
            } catch (error) {
                console.log(error);
                resolve({ line: 0, offset: 0 });
            }
        });
    }

    async search(params: BISearchRequest): Promise<BISearchResponse> {
        return new Promise((resolve, reject) => {
            StateMachine.langClient().search(params).then((res) => {
                resolve(res);
            }).catch((error) => {
                console.log(">>> error searching", error);
                reject(error);
            });
        });
    }

    async getModuleNodes(): Promise<BIModuleNodesResponse> {
        console.log(">>> requesting bi module nodes from ls");
        return new Promise((resolve) => {
            const context = StateMachine.context();
            if (!context.projectUri) {
                console.log(">>> projectUri not found in the context");
                return new Promise((resolve) => {
                    resolve(undefined);
                });
            }

            const params: BIModuleNodesRequest = {
                filePath: context.projectUri,
            };

            StateMachine.langClient()
                .getModuleNodes(params)
                .then((model) => {
                    console.log(">>> bi module nodes from ls", model);
                    resolve(model);
                })
                .catch((error) => {
                    console.log(">>> error fetching bi module nodes from ls", error);
                    return new Promise((resolve) => {
                        resolve(undefined);
                    });
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
