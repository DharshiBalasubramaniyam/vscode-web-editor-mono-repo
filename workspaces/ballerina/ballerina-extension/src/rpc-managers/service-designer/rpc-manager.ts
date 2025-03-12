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
    DIRECTORY_MAP,
    ExportOASRequest,
    ExportOASResponse,
    FunctionModelRequest,
    FunctionModelResponse,
    FunctionSourceCodeRequest,
    HttpResourceModelRequest,
    HttpResourceModelResponse,
    ListenerModelFromCodeRequest,
    ListenerModelFromCodeResponse,
    ListenerModelRequest,
    ListenerModelResponse,
    ListenerSourceCodeRequest,
    ListenerSourceCodeResponse,
    ListenersRequest,
    ListenersResponse,
    OpenAPISpec,
    ProjectStructureResponse,
    RecordSTRequest,
    RecordSTResponse,
    ResourceSourceCodeResponse,
    STModification,
    ServiceDesignerAPI,
    ServiceModelFromCodeRequest,
    ServiceModelFromCodeResponse,
    ServiceModelRequest,
    ServiceModelResponse,
    ServiceSourceCodeRequest,
    SourceUpdateResponse,
    SyntaxTree,
    TriggerModelsRequest,
    TriggerModelsResponse,
    buildProjectStructure
} from "@dharshi/ballerina-core";
import { ModulePart, NodePosition, STKindChecker, TypeDefinition } from "@dharshi/syntax-tree";
// import * as fs from 'fs';
// import { existsSync, writeFileSync } from "fs";
// import * as yaml from 'js-yaml';
// import * as path from 'path';
import { Uri, commands, window, workspace } from "vscode";
import { StateMachine } from "../../state-machine";
import { balExtInstance, WEB_IDE_SCHEME } from "../../extension";

export class ServiceDesignerRpcManager 
// implements ServiceDesignerAPI 
{

    // async getRecordST(params: RecordSTRequest): Promise<RecordSTResponse> {
    //     return new Promise(async (resolve) => {
    //         const context = StateMachine.context();
    //         const res: ProjectStructureResponse = await buildProjectStructure(context.projectUri, context.langClient);
    //         res.directoryMap[DIRECTORY_MAP.TYPES].forEach(type => {
    //             if (type.name === params.recordName) {
    //                 resolve({ recordST: type.st as TypeDefinition });
    //             }
    //         });
    //         resolve(null);
    //     });
    // }

    // async exportOASFile(params: ExportOASRequest): Promise<ExportOASResponse> {
    //     return new Promise(async (resolve) => {
    //         const res: ExportOASResponse = { openSpecFile: null };
    //         const documentFilePath = params.documentFilePath ? params.documentFilePath : StateMachine.context().documentUri;
    //         const spec = await StateMachine.langClient().convertToOpenAPI({ documentFilePath }) as OpenAPISpec;
    //         if (spec.content) {
    //             // Convert the OpenAPI spec to a YAML string
    //             const yamlStr = yaml.dump(spec.content[0].spec);
    //             window.showOpenDialog({ canSelectFolders: true, canSelectFiles: false, openLabel: 'Select OAS Save Location' })
    //                 .then(uri => {
    //                     if (uri && uri[0]) {
    //                         const projectLocation = uri[0].fsPath;
    //                         // Construct the correct path for the output file
    //                         const filePath = path.join(projectLocation, `${spec.content[0]?.serviceName}_openapi.yaml`);

    //                         // Save the YAML string to the file
    //                         fs.writeFileSync(filePath, yamlStr, 'utf8');
    //                         // Set the response
    //                         res.openSpecFile = filePath;
    //                         // Open the file in a new VSCode document
    //                         workspace.openTextDocument(filePath).then(document => {
    //                             window.showTextDocument(document);
    //                         });
    //                     }
    //                 });
    //         } else {
    //             window.showErrorMessage(spec.error);
    //         }
    //         resolve(res);
    //     });
    // }

    // async getListeners(params: ListenersRequest): Promise<ListenersResponse> {
    //     return new Promise(async (resolve) => {
    //         const context = StateMachine.context();
    //         try {
    //             const projectDir = path.join(StateMachine.context().projectUri);
    //             const targetFile = path.join(projectDir, `main.bal`);
    //             params.filePath = targetFile;
    //             const res: ListenersResponse = await context.langClient.getListeners(params);
    //             resolve(res);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // }

    // async getListenerModel(params: ListenerModelRequest): Promise<ListenerModelResponse> {
    //     return new Promise(async (resolve) => {
    //         const context = StateMachine.context();
    //         try {
    //             const res: ListenerModelResponse = await context.langClient.getListenerModel(params);
    //             resolve(res);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // }

    // async addListenerSourceCode(params: ListenerSourceCodeRequest): Promise<SourceUpdateResponse> {
    //     return new Promise(async (resolve) => {
    //         const context = StateMachine.context();
    //         try {
    //             const projectDir = path.join(StateMachine.context().projectUri);
    //             const targetFile = path.join(projectDir, `main.bal`);
    //             params.filePath = targetFile;
    //             const res: ListenerSourceCodeResponse = await context.langClient.addListenerSourceCode(params);
    //             const position = await this.updateSource(res);
    //             const result: SourceUpdateResponse = {
    //                 filePath: targetFile,
    //                 position: position
    //             };
    //             if (StateMachine.context().isBI) {
    //                 commands.executeCommand("BI.project-explorer.refresh");
    //             }
    //             resolve(result);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // }

    async updateListenerSourceCode(params: ListenerSourceCodeRequest): Promise<SourceUpdateResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                // const projectDir = path.join(StateMachine.context().projectUri);
                // const targetFile = path.join(projectDir, `main.bal`);
                // params.filePath = targetFile;
                const res: ListenerSourceCodeResponse = await context.langClient.updateListenerSourceCode(params);
                const position = await this.updateSource(res);
                const result: SourceUpdateResponse = {
                    filePath: params.filePath,
                    position: position
                };
                if (StateMachine.context().isBI) {
                    commands.executeCommand("BI.project-explorer.refresh");
                }
                resolve(result);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async getServiceModel(params: ServiceModelRequest): Promise<ServiceModelResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                const res: ServiceModelResponse = await context.langClient.getServiceModel(params);
                resolve(res);
            } catch (error) {
                console.log(error);
            }
        });
    }


    // async addServiceSourceCode(params: ServiceSourceCodeRequest): Promise<SourceUpdateResponse> {
    //     return new Promise(async (resolve) => {
    //         const context = StateMachine.context();
    //         try {
    //             const projectDir = path.join(StateMachine.context().projectUri);
    //             const targetFile = path.join(projectDir, `main.bal`);
    //             params.filePath = targetFile;
    //             const identifiers = [];
    //             for (let property in params.service.properties) {
    //                 const value = params.service.properties[property].value || params.service.properties[property].values?.at(0);
    //                 if (value) {
    //                     identifiers.push(value);
    //                 }
    //                 if (params.service.properties[property].choices) {
    //                     params.service.properties[property].choices.forEach(choice => {
    //                         if (choice.properties) {
    //                             Object.keys(choice.properties).forEach(subProperty => {
    //                                 const subPropertyValue = choice.properties[subProperty].value;
    //                                 if (subPropertyValue) {
    //                                     identifiers.push(subPropertyValue);
    //                                 }
    //                             });
    //                         }
    //                     });
    //                 }
    //             }
    //             const res: ListenerSourceCodeResponse = await context.langClient.addServiceSourceCode(params);
    //             const position = await this.updateSource(res, identifiers);
    //             const result: SourceUpdateResponse = {
    //                 filePath: targetFile,
    //                 position: position
    //             };
    //             if (StateMachine.context().isBI) {
    //                 commands.executeCommand("BI.project-explorer.refresh");
    //             }
    //             resolve(result);
    //         } catch (error) {
    //             console.log(error);
    //         }
    //     });
    // }

    async updateServiceSourceCode(params: ServiceSourceCodeRequest): Promise<SourceUpdateResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                // const projectDir = path.join(StateMachine.context().projectUri);
                // const targetFile = path.join(projectDir, `main.bal`);
                // params.filePath = targetFile;
                const identifiers = [];
                for (let property in params.service.properties) {
                    const value = params.service.properties[property].value || params.service.properties[property].values[0];
                    if (value) {
                        identifiers.push(value);
                    }
                }
                const res: ListenerSourceCodeResponse = await context.langClient.updateServiceSourceCode(params);
                const position = await this.updateSource(res, identifiers);
                const result: SourceUpdateResponse = {
                    filePath: params.filePath,
                    position: position
                };
                if (StateMachine.context().isBI) {
                    commands.executeCommand("BI.project-explorer.refresh");
                }
                resolve(result);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async getServiceModelFromCode(params: ServiceModelFromCodeRequest): Promise<ServiceModelFromCodeResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                const res: ServiceModelFromCodeResponse = await context.langClient.getServiceModelFromCode(params);
                resolve(res);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async getHttpResourceModel(params: HttpResourceModelRequest): Promise<HttpResourceModelResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                const res: HttpResourceModelResponse = await context.langClient.getHttpResourceModel(params);
                resolve(res);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async addResourceSourceCode(params: FunctionSourceCodeRequest): Promise<SourceUpdateResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                // const projectDir = path.join(StateMachine.context().projectUri);
                // const targetFile = path.join(projectDir, `main.bal`);
                // params.filePath = targetFile;
                const targetPosition: NodePosition = {
                    startLine: params.codedata.lineRange.startLine.line,
                    startColumn: params.codedata.lineRange.startLine.offset
                };
                const res: ResourceSourceCodeResponse = await context.langClient.addResourceSourceCode(params);
                const position = await this.updateSource(res, undefined, targetPosition);
                const result: SourceUpdateResponse = {
                    filePath: params.filePath,
                    position: position
                };
                resolve(result);
            } catch (error) {
                console.log(error);
            }
        });
    }

    async updateResourceSourceCode(params: FunctionSourceCodeRequest): Promise<SourceUpdateResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                const targetPosition: NodePosition = {
                    startLine: params.codedata.lineRange.startLine.line,
                    startColumn: params.codedata.lineRange.startLine.offset
                };
                const res: ResourceSourceCodeResponse = await context.langClient.updateResourceSourceCode(params);
                const position = await this.updateSource(res, undefined, targetPosition);
                const result: SourceUpdateResponse = {
                    filePath: params.filePath,
                    position: position
                };
                resolve(result);
            } catch (error) {
                console.log(error);
            }
        });
    }

    private async updateSource(params: ListenerSourceCodeResponse, identifiers?: string[], targetPosition?: NodePosition): Promise<NodePosition> {
        console.log("update service source: ", params);
        const modificationRequests: Record<string, { filePath: string; modifications: STModification[] }> = {};
        let position: NodePosition;
        // const fileUri = params.filePath;
        for (const [key, value] of Object.entries(params.textEdits)) {
            // const fileUri = Uri.parse(`${WEB_IDE_SCHEME}:${Uri.parse(key).path}`).toString();
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
                    (identifiers || targetPosition) && (syntaxTree as ModulePart).members.forEach(member => {
                        if (STKindChecker.isServiceDeclaration(member)) {
                            if (identifiers && identifiers.filter(id => id && member.source.includes(id)).length >= identifiers.length * 0.5) {
                                position = member.position;
                            }
                            if (targetPosition && member.position.startLine === targetPosition.startLine && member.position.startColumn === targetPosition.startColumn) {
                                position = member.position;
                            }
                        }
                    });
                    balExtInstance.fsProvider.writeFile(Uri.parse(fileUriString), new TextEncoder().encode(source), {create: true, overwrite: true})
                    // fs.writeFileSync(request.filePath, source);
                    // await StateMachine.langClient().didChange({
                    //     textDocument: { uri: fileUriString, version: 1 },
                    //     contentChanges: [
                    //         {
                    //             text: source,
                    //         },
                    //     ],
                    // });

                    if (!targetPosition) {
                        await StateMachine.langClient().resolveMissingDependencies({
                            documentIdentifier: { uri: fileUriString },
                        });
                    }
                    // await StateMachine.langClient().didOpen({
                    //     textDocument: { uri: fileUriString, languageId: "ballerina", version: 1, text: source },
                    // });
                }
            }
        } catch (error) {
            console.log(">>> error updating source", error);
        }
        return position;
    }

    async getListenerModelFromCode(params: ListenerModelFromCodeRequest): Promise<ListenerModelFromCodeResponse> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            try {
                const res: ListenerModelFromCodeResponse = await context.langClient.getListenerFromSourceCode(params);
                resolve(res);
            } catch (error) {
                console.log(error);
            }
        });
    }

//     async addFunctionSourceCode(params: FunctionSourceCodeRequest): Promise<SourceUpdateResponse> {
//         return new Promise(async (resolve) => {
//             const context = StateMachine.context();
//             try {
//                 const targetPosition: NodePosition = {
//                     startLine: params.codedata.lineRange.startLine.line,
//                     startColumn: params.codedata.lineRange.startLine.offset
//                 };
//                 const res: ResourceSourceCodeResponse = await context.langClient.addFunctionSourceCode(params);
//                 const position = await this.updateSource(res, undefined, targetPosition);
//                 const result: SourceUpdateResponse = {
//                     filePath: params.filePath,
//                     position: position
//                 };
//                 resolve(result);
//             } catch (error) {
//                 console.log(error);
//             }
//         });
//     }

//     async getTriggerModels(params: TriggerModelsRequest): Promise<TriggerModelsResponse> {
//         return new Promise(async (resolve) => {
//             const context = StateMachine.context();
//             try {
//                 const res: TriggerModelsResponse = await context.langClient.getTriggerModels(params);
//                 resolve(res);
//             } catch (error) {
//                 console.log(error);
//             }
//         });
//     }

//     async getFunctionModel(params: FunctionModelRequest): Promise<FunctionModelResponse> {
//         return new Promise(async (resolve) => {
//             const context = StateMachine.context();
//             try {
//                 const res: FunctionModelResponse = await context.langClient.getFunctionModel(params);
//                 resolve(res);
//             } catch (error) {
//                 console.log(">>> error fetching function model", error);
//             }
//         });
//     }
}
