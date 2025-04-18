import {
    AIChatRequest,
    AddFunctionRequest,
    BIAiSuggestionsRequest,
    BIAvailableNodesRequest,
    BIConnectorsRequest,
    BIDeleteByComponentInfoRequest,
    BIGetEnclosedFunctionRequest,
    BIGetFunctionsRequest,
    BIGetVisibleVariableTypesRequest,
    BINodeTemplateRequest,
    BISourceCodeRequest,
    BreakpointRequest,
    ClassFieldModifierRequest,
    ComponentRequest,
    EndOfFileRequest,
    ExpressionCompletionsRequest,
    ExpressionDiagnosticsRequest,
    FormDidCloseParams,
    FormDidOpenParams,
    FunctionNodeRequest,
    GetTypeRequest,
    GetTypesRequest,
    BISearchRequest,
    ModelFromCodeRequest,
    ProjectRequest,
    ReadmeContentRequest,
    ServiceClassSourceRequest,
    SignatureHelpRequest,
    UpdateConfigVariableRequest,
    UpdateTypeRequest,
    UpdateImportsRequest,
    VisibleTypesRequest,
    addBreakpointToSource,
    addClassField,
    addFunction,
    buildProject,
    createComponent,
    createGraphqlClassType,
    createProject,
    deleteByComponentInfo,
    deleteFlowNode,
    deployProject,
    formDidClose,
    formDidOpen,
    getAiSuggestions,
    getAllImports,
    getAvailableNodes,
    getBIConnectors,
    getBreakpointInfo,
    getConfigVariables,
    getDesignModel,
    getEnclosedFunction,
    getEndOfFile,
    getExpressionCompletions,
    getExpressionDiagnostics,
    getFlowModel,
    getFunctionNode,
    getFunctions,
    getModuleNodes,
    getNodeTemplate,
    getProjectComponents,
    getProjectStructure,
    getReadmeContent,
    getServiceClassModel,
    getSignatureHelp,
    getSourceCode,
    getType,
    getTypes,
    getVisibleTypes,
    getVisibleVariableTypes,
    getWorkspaces,
    handleReadmeContent,
    openAIChat,
    openReadme,
    removeBreakpointFromSource,
    runProject,
    updateConfigVariables,
    updateType,
    updateImports,
    search,
    updateClassField,
    updateServiceClass,
    AddFieldRequest,
    renameIdentifier,
    RenameIdentifierRequest,
    updateTypes,
    UpdateTypesRequest
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { BiDiagramRpcManager } from "./rpc-manager";

export function registerBiDiagramRpcHandlers(messenger: Messenger) {
    const rpcManger = new BiDiagramRpcManager();
    // messenger.onRequest(getFlowModel, () => rpcManger.getFlowModel());
    messenger.onRequest(getSourceCode, (args: BISourceCodeRequest) => rpcManger.getSourceCode(args));
    messenger.onRequest(deleteFlowNode, (args: BISourceCodeRequest) => rpcManger.deleteFlowNode(args));
    // messenger.onRequest(deleteByComponentInfo, (args: BIDeleteByComponentInfoRequest) => rpcManger.deleteByComponentInfo(args));
    // messenger.onRequest(getAvailableNodes, (args: BIAvailableNodesRequest) => rpcManger.getAvailableNodes(args));
    // messenger.onRequest(getFunctions, (args: BIGetFunctionsRequest) => rpcManger.getFunctions(args));
    // messenger.onRequest(getEnclosedFunction, (args: BIGetEnclosedFunctionRequest) => rpcManger.getEnclosedFunction(args));
    messenger.onRequest(getNodeTemplate, (args: BINodeTemplateRequest) => rpcManger.getNodeTemplate(args));
    // messenger.onRequest(getAiSuggestions, (args: BIAiSuggestionsRequest) => rpcManger.getAiSuggestions(args));
    // messenger.onNotification(createProject, (args: ProjectRequest) => rpcManger.createProject(args));
    // messenger.onRequest(getWorkspaces, () => rpcManger.getWorkspaces());
    messenger.onRequest(getProjectStructure, () => rpcManger.getProjectStructure());
    // messenger.onRequest(getProjectComponents, () => rpcManger.getProjectComponents());
    messenger.onRequest(createComponent, (args: ComponentRequest) => rpcManger.createMainFunctionComponent(args));
    // messenger.onRequest(getBIConnectors, (args: BIConnectorsRequest) => rpcManger.getBIConnectors(args));
    // messenger.onRequest(handleReadmeContent, (args: ReadmeContentRequest) => rpcManger.handleReadmeContent(args));
    messenger.onRequest(getVisibleVariableTypes, (args: BIGetVisibleVariableTypesRequest) => rpcManger.getVisibleVariableTypes(args));
    messenger.onRequest(getExpressionCompletions, (args: ExpressionCompletionsRequest) => rpcManger.getExpressionCompletions(args));
    messenger.onRequest(getConfigVariables, () => rpcManger.getConfigVariables());
    messenger.onRequest(updateConfigVariables, (args: UpdateConfigVariableRequest) => rpcManger.updateConfigVariables(args));
    // messenger.onRequest(getModuleNodes, () => rpcManger.getModuleNodes());
    // messenger.onRequest(getReadmeContent, () => rpcManger.getReadmeContent());
    // messenger.onNotification(openReadme, () => rpcManger.openReadme());
    messenger.onRequest(renameIdentifier, (args: RenameIdentifierRequest) => rpcManger.renameIdentifier(args));
    // messenger.onNotification(deployProject, () => rpcManger.deployProject());
    // messenger.onNotification(openAIChat, (args: AIChatRequest) => rpcManger.openAIChat(args));
    // messenger.onRequest(getSignatureHelp, (args: SignatureHelpRequest) => rpcManger.getSignatureHelp(args));
    // messenger.onNotification(buildProject, () => rpcManger.buildProject());
    // messenger.onNotification(runProject, () => rpcManger.runProject());
    messenger.onRequest(getVisibleTypes, (args: VisibleTypesRequest) => rpcManger.getVisibleTypes(args));
    // messenger.onNotification(addBreakpointToSource, (args: BreakpointRequest) => rpcManger.addBreakpointToSource(args));
    // messenger.onNotification(removeBreakpointFromSource, (args: BreakpointRequest) => rpcManger.removeBreakpointFromSource(args));
    // messenger.onRequest(getBreakpointInfo, () => rpcManger.getBreakpointInfo());
    // messenger.onRequest(getExpressionDiagnostics, (args: ExpressionDiagnosticsRequest) => rpcManger.getExpressionDiagnostics(args));
    // messenger.onRequest(getAllImports, () => rpcManger.getAllImports());
    // messenger.onNotification(formDidOpen, (args: FormDidOpenParams) => rpcManger.formDidOpen(args));
    // messenger.onNotification(formDidClose, (args: FormDidCloseParams) => rpcManger.formDidClose(args));
    // messenger.onRequest(getDesignModel, () => rpcManger.getDesignModel());
    messenger.onRequest(getTypes, (args: GetTypesRequest) => rpcManger.getTypes(args));
    messenger.onRequest(getType, (args: GetTypeRequest) => rpcManger.getType(args));
    messenger.onRequest(updateType, (args: UpdateTypeRequest) => rpcManger.updateType(args));
    messenger.onRequest(updateTypes, (args: UpdateTypesRequest) => rpcManger.updateTypes(args));
    messenger.onRequest(getServiceClassModel, (args: ModelFromCodeRequest) => rpcManger.getServiceClassModel(args));
    messenger.onRequest(updateClassField, (args: ClassFieldModifierRequest) => rpcManger.updateClassField(args));
    messenger.onRequest(addClassField, (args: AddFieldRequest) => rpcManger.addClassField(args));
    messenger.onRequest(updateServiceClass, (args: ServiceClassSourceRequest) => rpcManger.updateServiceClass(args));
    messenger.onRequest(createGraphqlClassType, (args: UpdateTypeRequest) => rpcManger.createGraphqlClassType(args));
    // messenger.onRequest(updateImports, (args: UpdateImportsRequest) => rpcManger.updateImports(args));
    // messenger.onRequest(addFunction, (args: AddFunctionRequest) => rpcManger.addFunction(args));
    messenger.onRequest(getFunctionNode, (args: FunctionNodeRequest) => rpcManger.getFunctionNode(args));
    messenger.onRequest(getEndOfFile, (args: EndOfFileRequest) => rpcManger.getEndOfFile(args));
    messenger.onRequest(search, (args: BISearchRequest) => rpcManger.search(args));
}
