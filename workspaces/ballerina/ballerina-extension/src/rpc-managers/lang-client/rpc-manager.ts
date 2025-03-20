import {
    BallerinaPackagesParams,
    BallerinaProjectComponents,
    BallerinaSTParams,
    BallerinaVersionResponse,
    CodeActionRequest,
    CodeActionResponse,
    CompletionRequest,
    CompletionResponse,
    ComponentModels,
    ComponentModelsParams,
    DefinitionPositionRequest,
    DefinitionResponse,
    Diagnostics,
    DiagnosticsResponse,
    DidChangeRequest,
    DidCloseRequest,
    DidOpenRequest,
    ExecutorPositions,
    ExecutorPositionsRequest,
    InsertorDelete,
    LangClientAPI,
    PartialST,
    PartialSTParams,
    RenameRequest,
    RenameResponse,
    STModifyParams,
    SymbolInfo,
    SymbolInfoParams,
    SyntaxTree,
    SyntaxTreeParams,
    TypeFromExpressionParams,
    TypeFromSymbolParams,
    TypesFromExpressionResponse,
    TypesFromFnDefinitionParams,
    TypesFromSymbolResponse,
    UpdateFileContentRequest,
    UpdateFileContentResponse
} from "@dharshi/ballerina-core";
import { workspace, Uri } from "vscode";
import { StateMachine } from "../../state-machine";
import { modifyFileContent } from "../../utils/modification";
import { balExtInstance } from "../../extension";
export class LangClientRpcManager implements LangClientAPI {
    
    async getSyntaxTree(): Promise<SyntaxTree> {
        return new Promise(async (resolve) => {
            const context = StateMachine.context();
            const req: BallerinaSTParams = {
                documentIdentifier: { uri:  Uri.parse(context.documentUri ? context.documentUri : "").toString() },
                lineRange: {
                    start: {
                        line: context?.position?.startLine ? context?.position?.startLine : 0,
                        character: context?.position?.startColumn ? context.position.startColumn : 0
                    },
                    end: {
                        line: context?.position?.endLine ? context.position.endLine : 0,
                        character: context?.position?.endColumn ? context.position.endColumn : 0
                    }
                }
            };
            const node = await StateMachine.langClient()?.getSTByRange(req) as SyntaxTree;
            if (node.parseSuccess) {
                resolve(node);
            } else {
                resolve(node);
            }
        });
    }

    async getBallerinaProjectComponents(params: BallerinaPackagesParams): Promise<BallerinaProjectComponents> {
        return new Promise(async (resolve) => {
            // Check if there is at least one workspace folder
            if (workspace.workspaceFolders?.length) {
                const workspaceUri: {uri: string}[] = [];
                workspace.workspaceFolders.forEach(folder => {
                    console.log("folder: ", folder);
                    workspaceUri.push(
                        {
                            uri: folder.uri.toString(),
                        }
                    );
                });

                const components = await StateMachine.langClient()?.getBallerinaProjectComponents({
                    documentIdentifiers: params?.documentIdentifiers || workspaceUri
                });
                resolve(components as BallerinaProjectComponents);
            } else {
                // Handle the case where there are no workspace folders
                throw new Error("No workspace folders are open");
            }
        });
    }

    async getCompletion(params: CompletionRequest): Promise<CompletionResponse> {
        return new Promise(async (resolve) => {
            const completions = await StateMachine.langClient()?.getCompletion(params);
            resolve({completions: completions});
        });
    }

    async getDiagnostics(params: SyntaxTreeParams): Promise<DiagnosticsResponse> {
        return new Promise(async (resolve) => {
            const diagnostics = await StateMachine.langClient()?.getDiagnostics(params) as Diagnostics[];
            resolve({ diagnostics: diagnostics });
        });
    }

    async codeAction(params: CodeActionRequest): Promise<CodeActionResponse> {
        return new Promise(async (resolve) => {
            const codeActions = await StateMachine.langClient()?.codeAction(params);
            resolve({ codeActions: codeActions });
        });
    }

    async rename(params: RenameRequest): Promise<RenameResponse> {
        return new Promise(async (resolve) => {
            const workspaceEdit = await StateMachine.langClient()?.rename(params);
            resolve({ workspaceEdit: workspaceEdit });
        });
    }

    async getDefinitionPosition(params: DefinitionPositionRequest): Promise<SyntaxTree> {
        return new Promise(async (resolve) => {
            const definition = await StateMachine.langClient()?.getDefinitionPosition(params) as SyntaxTree;
            resolve(definition);
        });
    }

    async getST(params: SyntaxTreeParams): Promise<SyntaxTree> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSyntaxTree(params) as SyntaxTree;
            resolve(st);
        });
    }

    async getSTByRange(params: BallerinaSTParams): Promise<SyntaxTree> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSTByRange(params) as SyntaxTree;
            resolve(st);
        });
    }

    async stModify(params: STModifyParams): Promise<SyntaxTree> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.stModify({
                astModifications: await InsertorDelete(params.astModifications),
                documentIdentifier: params.documentIdentifier,
            }) as SyntaxTree;
            resolve(st);
        });
    }

    async updateFileContent(params: UpdateFileContentRequest): Promise<UpdateFileContentResponse> {
        return new Promise(async (resolve) => {
            const status = await modifyFileContent(params);
            resolve({ status: status });
        });
    }

    async getTypeFromExpression(params: TypeFromExpressionParams): Promise<TypesFromExpressionResponse> {
        return new Promise(async (resolve) => {
            const type = await StateMachine.langClient()?.getTypeFromExpression(params) as TypesFromExpressionResponse;
            resolve(type);
        });
    }

    async getTypeFromSymbol(params: TypeFromSymbolParams): Promise<TypesFromSymbolResponse> {
        return new Promise(async (resolve) => {
            const type = await StateMachine.langClient()?.getTypeFromSymbol(params) as TypesFromSymbolResponse;
            resolve(type);
        });
    }

    async getTypesFromFnDefinition(params: TypesFromFnDefinitionParams): Promise<TypesFromSymbolResponse> {
        return new Promise(async (resolve) => {
            const type = await StateMachine.langClient()?.getTypesFromFnDefinition(params) as TypesFromSymbolResponse;
            resolve(type);
        });
    }

    async definition(params: DefinitionPositionRequest): Promise<DefinitionResponse> {
        return new Promise(async (resolve) => {
            const location = await StateMachine.langClient()?.definition(params);
            resolve({ location: location });
        });
    }

    async getSTForFunction(params: STModifyParams): Promise<SyntaxTree> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSTForFunction(params) as SyntaxTree;
            resolve(st);
        });
    }

    async getExecutorPositions(params: ExecutorPositionsRequest): Promise<ExecutorPositions> {
        return new Promise(async (resolve) => {
            const position = await StateMachine.langClient()?.getExecutorPositions(params) as ExecutorPositions;
            resolve(position);
        });
    }

    async getSTForExpression(params: PartialSTParams): Promise<PartialST> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSTForExpression(params) as PartialST;
            resolve(st);
        });
    }

    async getSTForSingleStatement(params: PartialSTParams): Promise<PartialST> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSTForSingleStatement(params) as PartialST;
            resolve(st);
        });
    }

    async getSTForResource(params: PartialSTParams): Promise<PartialST> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSTForResource(params) as PartialST;
            resolve(st);
        });
    }

    async getSTForModuleMembers(params: PartialSTParams): Promise<PartialST> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSTForModuleMembers(params) as PartialST;
            resolve(st);
        });
    }

    async getSTForModulePart(params: PartialSTParams): Promise<PartialST> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSTForModulePart(params) as PartialST;
            resolve(st);
        });
    }

    async getSymbolDocumentation(params: SymbolInfoParams): Promise<SymbolInfo> {
        return new Promise(async (resolve) => {
            const st = await StateMachine.langClient()?.getSymbolDocumentation(params) as SymbolInfo;
            resolve(st);
        });
    }

    didOpen(params: DidOpenRequest): void {
        return StateMachine.langClient()?.didOpen(params);
    }

    didChange(params: DidChangeRequest): void {
        return StateMachine.langClient()?.didChange(params);
    }

    didClose(params: DidCloseRequest): void {
        return StateMachine.langClient()?.didClose(params);
    }

    async getBallerinaVersion(): Promise<BallerinaVersionResponse> {
        console.log("balExtInstance version: ", balExtInstance.ballerinaVersion);
        return new Promise(async (resolve) => {
            resolve({ version: balExtInstance.ballerinaVersion || "" });
        });
    }

    async getPackageComponentModels(params: ComponentModelsParams): Promise<ComponentModels> {
        return new Promise(async (resolve) => {
            const components = await StateMachine.langClient()?.getPackageComponentModels(params) as ComponentModels;
            resolve(components);
        });
    }

}
