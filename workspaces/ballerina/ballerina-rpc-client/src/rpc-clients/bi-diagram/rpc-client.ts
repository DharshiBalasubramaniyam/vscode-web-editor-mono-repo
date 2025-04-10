
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
    BIDeleteByComponentInfoRequest,
    BIDeleteByComponentInfoResponse,
    BIDesignModelResponse,
    BIDiagramAPI,
    BIFlowModelResponse,
    BIGetEnclosedFunctionRequest,
    BIGetEnclosedFunctionResponse,
    BIGetFunctionsRequest,
    BIGetFunctionsResponse,
    BIGetVisibleVariableTypesRequest,
    BIGetVisibleVariableTypesResponse,
    BIModuleNodesResponse,
    BINodeTemplateRequest,
    BINodeTemplateResponse,
    BISearchRequest,
    BISearchResponse,
    BISourceCodeRequest,
    BISourceCodeResponse,
    BreakpointRequest,
    ClassFieldModifierRequest,
    ComponentRequest,
    ConfigVariableResponse,
    CreateComponentResponse,
    CurrentBreakpointsResponse,
    EndOfFileRequest,
    ExpressionCompletionsRequest,
    ExpressionCompletionsResponse,
    ExpressionDiagnosticsRequest,
    ExpressionDiagnosticsResponse,
    FormDidCloseParams,
    FormDidOpenParams,
    FunctionNodeRequest,
    FunctionNodeResponse,
    GetTypeRequest,
    GetTypeResponse,
    GetTypesRequest,
    GetTypesResponse,
    LinePosition,
    ModelFromCodeRequest,
    ProjectComponentsResponse,
    ProjectImports,
    ProjectRequest,
    ProjectStructureResponse,
    ReadmeContentRequest,
    ReadmeContentResponse,
    ServiceClassModelResponse,
    SignatureHelpRequest,
    SignatureHelpResponse,
    SourceEditResponse,
    UpdateConfigVariableRequest,
    UpdateConfigVariableResponse,
    UpdateTypeRequest,
    UpdateTypesRequest,
    UpdateTypeResponse,
    UpdateTypesResponse,
    UpdateImportsRequest,
    UpdateImportsResponse,
    VisibleTypesRequest,
    VisibleTypesResponse,
    WorkspacesResponse,
    addBreakpointToSource,
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
    updateClassField,
    addClassField,
    updateConfigVariables,
    updateImports,
    updateServiceClass,
    updateType,
    updateTypes,
    ServiceClassSourceRequest,
    AddFieldRequest,
    RenameIdentifierRequest,
    renameIdentifier,
    search
} from "@dharshi/ballerina-core";
import { HOST_EXTENSION } from "vscode-messenger-common";
import { Messenger } from "vscode-messenger-webview";

export class BiDiagramRpcClient implements BIDiagramAPI {
    private _messenger: Messenger;

    constructor(messenger: Messenger) {
        this._messenger = messenger;
    }

    getFlowModel(): Promise<BIFlowModelResponse> {
        return this._messenger.sendRequest(getFlowModel, HOST_EXTENSION);
    }

    getSourceCode(params: BISourceCodeRequest): Promise<BISourceCodeResponse> {
        return this._messenger.sendRequest(getSourceCode, HOST_EXTENSION, params);
    }

    deleteFlowNode(params: BISourceCodeRequest): Promise<BISourceCodeResponse> {
        return this._messenger.sendRequest(deleteFlowNode, HOST_EXTENSION, params);
    }

    deleteByComponentInfo(params: BIDeleteByComponentInfoRequest): Promise<BIDeleteByComponentInfoResponse> {
        return this._messenger.sendRequest(deleteByComponentInfo, HOST_EXTENSION, params);
    }

    getAvailableNodes(params: BIAvailableNodesRequest): Promise<BIAvailableNodesResponse> {
        return this._messenger.sendRequest(getAvailableNodes, HOST_EXTENSION, params);
    }

    getFunctions(params: BIGetFunctionsRequest): Promise<BIGetFunctionsResponse> {
        return this._messenger.sendRequest(getFunctions, HOST_EXTENSION, params);
    }

    getEnclosedFunction(params: BIGetEnclosedFunctionRequest): Promise<BIGetEnclosedFunctionResponse> {
        return this._messenger.sendRequest(getEnclosedFunction, HOST_EXTENSION, params);
    }

    getNodeTemplate(params: BINodeTemplateRequest): Promise<BINodeTemplateResponse> {
        return this._messenger.sendRequest(getNodeTemplate, HOST_EXTENSION, params);
    }

    getAiSuggestions(params: BIAiSuggestionsRequest): Promise<BIAiSuggestionsResponse> {
        return this._messenger.sendRequest(getAiSuggestions, HOST_EXTENSION, params);
    }

    createProject(params: ProjectRequest): void {
        return this._messenger.sendNotification(createProject, HOST_EXTENSION, params);
    }

    getWorkspaces(): Promise<WorkspacesResponse> {
        return this._messenger.sendRequest(getWorkspaces, HOST_EXTENSION);
    }

    getProjectStructure(): Promise<ProjectStructureResponse> {
        return this._messenger.sendRequest(getProjectStructure, HOST_EXTENSION);
    }

    getProjectComponents(): Promise<ProjectComponentsResponse> {
        return this._messenger.sendRequest(getProjectComponents, HOST_EXTENSION);
    }

    createComponent(params: ComponentRequest): Promise<CreateComponentResponse> {
        return this._messenger.sendRequest(createComponent, HOST_EXTENSION, params);
    }

    getBIConnectors(params: BIConnectorsRequest): Promise<BIConnectorsResponse> {
        return this._messenger.sendRequest(getBIConnectors, HOST_EXTENSION, params);
    }

    handleReadmeContent(params: ReadmeContentRequest): Promise<ReadmeContentResponse> {
        return this._messenger.sendRequest(handleReadmeContent, HOST_EXTENSION, params);
    }

    getVisibleVariableTypes(params: BIGetVisibleVariableTypesRequest): Promise<BIGetVisibleVariableTypesResponse> {
        return this._messenger.sendRequest(getVisibleVariableTypes, HOST_EXTENSION, params);
    }

    getExpressionCompletions(params: ExpressionCompletionsRequest): Promise<ExpressionCompletionsResponse> {
        return this._messenger.sendRequest(getExpressionCompletions, HOST_EXTENSION, params);
    }

    getConfigVariables(): Promise<ConfigVariableResponse> {
        return this._messenger.sendRequest(getConfigVariables, HOST_EXTENSION);
    }

    updateConfigVariables(params: UpdateConfigVariableRequest): Promise<UpdateConfigVariableResponse> {
        return this._messenger.sendRequest(updateConfigVariables, HOST_EXTENSION, params);
    }

    getModuleNodes(): Promise<BIModuleNodesResponse> {
        return this._messenger.sendRequest(getModuleNodes, HOST_EXTENSION);
    }

    getReadmeContent(): Promise<ReadmeContentResponse> {
        return this._messenger.sendRequest(getReadmeContent, HOST_EXTENSION);
    }

    openReadme(): void {
        return this._messenger.sendNotification(openReadme, HOST_EXTENSION);
    }

    renameIdentifier(params: RenameIdentifierRequest): Promise<void> {
        return this._messenger.sendRequest(renameIdentifier, HOST_EXTENSION, params);
    }

    deployProject(): void {
        return this._messenger.sendNotification(deployProject, HOST_EXTENSION);
    }

    openAIChat(params: AIChatRequest): void {
        return this._messenger.sendNotification(openAIChat, HOST_EXTENSION, params);
    }

    getSignatureHelp(params: SignatureHelpRequest): Promise<SignatureHelpResponse> {
        return this._messenger.sendRequest(getSignatureHelp, HOST_EXTENSION, params);
    }

    buildProject(): void {
        return this._messenger.sendNotification(buildProject, HOST_EXTENSION);
    }

    runProject(): void {
        return this._messenger.sendNotification(runProject, HOST_EXTENSION);
    }

    getVisibleTypes(params: VisibleTypesRequest): Promise<VisibleTypesResponse> {
        return this._messenger.sendRequest(getVisibleTypes, HOST_EXTENSION, params);
    }

    addBreakpointToSource(params: BreakpointRequest): void {
        return this._messenger.sendNotification(addBreakpointToSource, HOST_EXTENSION, params);
    }

    removeBreakpointFromSource(params: BreakpointRequest): void {
        return this._messenger.sendNotification(removeBreakpointFromSource, HOST_EXTENSION, params);
    }

    getBreakpointInfo(): Promise<CurrentBreakpointsResponse> {
        return this._messenger.sendRequest(getBreakpointInfo, HOST_EXTENSION);
    }

    getExpressionDiagnostics(params: ExpressionDiagnosticsRequest): Promise<ExpressionDiagnosticsResponse> {
        return this._messenger.sendRequest(getExpressionDiagnostics, HOST_EXTENSION, params);
    }

    getAllImports(): Promise<ProjectImports> {
        return this._messenger.sendRequest(getAllImports, HOST_EXTENSION);
    }

    formDidOpen(params: FormDidOpenParams): Promise<void> {
        return this._messenger.sendRequest(formDidOpen, HOST_EXTENSION, params);
    }

    formDidClose(params: FormDidCloseParams): Promise<void> {
        return this._messenger.sendRequest(formDidClose, HOST_EXTENSION, params);
    }

    getDesignModel(): Promise<BIDesignModelResponse> {
        return this._messenger.sendRequest(getDesignModel, HOST_EXTENSION);
    }
    
    getTypes(params: GetTypesRequest): Promise<GetTypesResponse> {
        return this._messenger.sendRequest(getTypes, HOST_EXTENSION, params);
    }

    getType(params: GetTypeRequest): Promise<GetTypeResponse> {
        return this._messenger.sendRequest(getType, HOST_EXTENSION, params);
    }

    updateType(params: UpdateTypeRequest): Promise<UpdateTypeResponse> {
        return this._messenger.sendRequest(updateType, HOST_EXTENSION, params);
    }

    updateTypes(params: UpdateTypesRequest): Promise<UpdateTypesResponse> {
        return this._messenger.sendRequest(updateTypes, HOST_EXTENSION, params);
    }

    getServiceClassModel(params: ModelFromCodeRequest): Promise<ServiceClassModelResponse> {
        return this._messenger.sendRequest(getServiceClassModel, HOST_EXTENSION, params);
    }

    updateClassField(params: ClassFieldModifierRequest): Promise<SourceEditResponse> {
        return this._messenger.sendRequest(updateClassField, HOST_EXTENSION, params);
    }

    addClassField(params: AddFieldRequest): Promise<SourceEditResponse> {
        return this._messenger.sendRequest(addClassField, HOST_EXTENSION, params);
    }

    updateServiceClass(params: ServiceClassSourceRequest): Promise<SourceEditResponse> {
        return this._messenger.sendRequest(updateServiceClass, HOST_EXTENSION, params);
    }

    createGraphqlClassType(params: UpdateTypeRequest): Promise<UpdateTypeResponse> {
        return this._messenger.sendRequest(createGraphqlClassType, HOST_EXTENSION, params);
    }

    updateImports(params: UpdateImportsRequest): Promise<UpdateImportsResponse> {
        return this._messenger.sendRequest(updateImports, HOST_EXTENSION, params);
    }

    addFunction(params: AddFunctionRequest): Promise<AddFunctionResponse> {
        return this._messenger.sendRequest(addFunction, HOST_EXTENSION, params);
    }

    getFunctionNode(params: FunctionNodeRequest): Promise<FunctionNodeResponse> {
        return this._messenger.sendRequest(getFunctionNode, HOST_EXTENSION, params);
    }

    getEndOfFile(params: EndOfFileRequest): Promise<LinePosition> {
        return this._messenger.sendRequest(getEndOfFile, HOST_EXTENSION, params);
    }
    search(params: BISearchRequest): Promise<BISearchResponse> {
        return this._messenger.sendRequest(search, HOST_EXTENSION, params);
    }
}
