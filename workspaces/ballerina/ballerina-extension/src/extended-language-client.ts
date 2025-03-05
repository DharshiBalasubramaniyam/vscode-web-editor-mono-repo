import {
    Connectors,
    STModifyParams,
    SyntaxTree,
    DiagnosticsParams,
    TypesFromExpression,
    NOT_SUPPORTED_TYPE,
    SymbolInfo,
    BallerinaProject,
    NotebookVariable,
    BallerinaInitializeParams,
    BallerinaInitializeResult,
    ComponentModelsParams,
    ComponentModels,
    PersistERModelParams,
    PersistERModel,
    Diagnostics,
    ConnectorsParams,
    Connector,
    RecordParams,
    BallerinaRecord,
    BallerinaSTParams,
    TriggerModifyParams,
    SymbolInfoParams,
    TypeFromExpressionParams,
    TypeFromSymbolParams,
    TypesFromFnDefinitionParams,
    VisibleVariableTypesParams,
    GraphqlDesignServiceParams,
    SyntaxTreeParams,
    BallerinaExampleListParams,
    BallerinaExampleList,
    BallerinaProjectParams,
    BallerinaPackagesParams,
    BallerinaProjectComponents,
    PackageConfigSchema,
    SyntaxTreeNodeParams,
    SyntaxTreeNode,
    ExecutorPositions,
    TestsDiscoveryRequest,
    TestsDiscoveryResponse,
    JsonToRecordParams,
    XMLToRecordParams,
    XMLToRecord,
    JsonToRecord,
    NoteBookCellOutputParams,
    NoteBookCellOutput,
    NotebookFileSource,
    NotebookDeleteDclnParams,
    PartialSTParams,
    OpenAPIConverterParams,
    OpenAPISpec,
    TypesFromSymbol,
    GraphqlDesignService,
    PartialST,
    BallerinaServerCapability,
    ExtendedLangClientInterface,
    BIAvailableNodesRequest,
    BIAvailableNodesResponse,
    BINodeTemplateRequest,
    BINodeTemplateResponse,
    BIFlowModelRequest,
    BIFlowModelResponse,
    BISourceCodeRequest,
    BISourceCodeResponse,
    BIConnectorsRequest,
    BIConnectorsResponse,
    ConnectorRequest,
    ConnectorResponse,
    BISuggestedFlowModelRequest,
    BICopilotContextRequest,
    BICopilotContextResponse,
    SequenceModelRequest,
    SequenceModelResponse,
    ServiceFromOASRequest,
    ServiceFromOASResponse,
    BIGetFunctionsRequest,
    BIGetFunctionsResponse,
    ExpressionCompletionsRequest,
    ExpressionCompletionsResponse,
    VisibleVariableTypes,
    ConfigVariableResponse,
    ConfigVariableRequest,
    UpdateConfigVariableRequest,
    UpdateConfigVariableResponse,
    ProjectDiagnosticsRequest,
    ProjectDiagnosticsResponse,
    MainFunctionParamsRequest,
    MainFunctionParamsResponse,
    BIModuleNodesRequest,
    BIModuleNodesResponse,
    ComponentsFromContent,
    SignatureHelpRequest,
    SignatureHelpResponse,
    VisibleTypesRequest,
    ReferenceLSRequest,
    Reference,
    VisibleTypesResponse,
    BIDeleteByComponentInfoRequest,
    ExpressionDiagnosticsRequest,
    ExpressionDiagnosticsResponse,
    TriggerModelsRequest,
    TriggerModelsResponse,
    BIGetEnclosedFunctionRequest,
    BIGetEnclosedFunctionResponse,
    HttpResourceModelRequest,
    HttpResourceModelResponse,
    ListenerModelRequest,
    ListenerModelResponse,
    ListenerSourceCodeRequest,
    ListenerSourceCodeResponse,
    ListenersRequest,
    ListenersResponse,
    FunctionSourceCodeRequest,
    ResourceSourceCodeResponse,
    ServiceModelFromCodeRequest,
    ServiceModelFromCodeResponse,
    ServiceModelRequest,
    ServiceModelResponse,
    ServiceSourceCodeRequest,
    BIDesignModelRequest,
    BIDesignModelResponse,
    GetTypesResponse,
    GetTypesRequest,
    UpdateTypeRequest,
    UpdateTypeResponse,
    GetGraphqlTypeRequest,
    GetGraphqlTypeResponse,
    GetTypeRequest,
    GetTypeResponse,
    ListenerModelFromCodeRequest,
    ListenerModelFromCodeResponse,
    AddFunctionRequest,
    AddFunctionResponse,
    UpdateImportsRequest,
    InlineDataMapperModelRequest,
    InlineDataMapperSourceRequest,
    InlineDataMapperSourceResponse,
    InlineDataMapperModelResponse,
    VisualizableFieldsRequest,
    VisualizableFieldsResponse,
    AddArrayElementRequest,
    GetTestFunctionRequest,
    GetTestFunctionResponse,
    AddOrUpdateTestFunctionRequest,
    TestSourceEditResponse,
    FunctionNodeResponse,
    FunctionNodeRequest,
    ModelFromCodeRequest,
    ServiceClassModelResponse,
    ClassFieldModifierRequest,
    SourceEditResponse,
    ServiceClassSourceRequest,
    AddFieldRequest,
    FunctionModelRequest,
    FunctionModelResponse,
    TypeDataWithReferences,
    ICPEnabledRequest,
    ICPEnabledResponse
} from "@dharshi/ballerina-core";
import { ExtensionContext } from "vscode";
import { LanguageClient, LanguageClientOptions, TextDocumentPositionParams } from "vscode-languageclient/browser";

export const CONNECTOR_LIST_CACHE = "CONNECTOR_LIST_CACHE";
export const HTTP_CONNECTOR_LIST_CACHE = "HTTP_CONNECTOR_LIST_CACHE";
export const BALLERINA_LANG_ID = "ballerina";
export const NOT_SUPPORTED = {};

export class ExtendedLanguageClient extends LanguageClient {
    private ballerinaExtendedServices: Set<String> | undefined;
    private isDynamicRegistrationSupported: boolean;
    extensionContext: ExtensionContext;

    constructor(id: string, name: string, clientOptions: LanguageClientOptions, worker: Worker, context: ExtensionContext) {
        super(id, name, clientOptions, worker);
        this.isDynamicRegistrationSupported = true;
        this.extensionContext = context;
    }

    async initBalServices(params: BallerinaInitializeParams): Promise<BallerinaInitializeResult> {
        return this.sendRequest("initBalServices", params);
    }

    async registerExtendedAPICapabilities(): Promise<Set<String>> {
        await this.initBalServices({
            ballerinaClientCapabilities: [
                {
                    name: EXTENDED_APIS_ORG.DOCUMENT, syntaxTreeNode: true, executorPositions: true,
                    syntaxTreeModify: true, diagnostics: true, syntaxTree: true, astModify: true, triggerModify: true,
                    resolveMissingDependencies: true
                },
                { name: EXTENDED_APIS_ORG.PACKAGE, components: true, metadata: true, configSchema: true },
                {
                    name: EXTENDED_APIS_ORG.SYMBOL, type: true, getSymbol: true,
                    getTypeFromExpression: true, getTypeFromSymbol: true, getTypesFromFnDefinition: true
                },
                {
                    name: EXTENDED_APIS_ORG.CONNECTOR, connectors: true, connector: true, record: true
                },
                {
                    name: EXTENDED_APIS_ORG.TRIGGER, triggers: true, trigger: true
                },
                {
                    name: EXTENDED_APIS_ORG.RUNNER, diagnostics: true, mainFunctionParams: true,
                },
                { name: EXTENDED_APIS_ORG.EXAMPLE, list: true },
                { name: EXTENDED_APIS_ORG.JSON_TO_RECORD, convert: true },
                { name: EXTENDED_APIS_ORG.XML_TO_RECORD, convert: true },
                { name: EXTENDED_APIS_ORG.PERF_ANALYZER, getResourcesWithEndpoints: true },
                { name: EXTENDED_APIS_ORG.PARTIAL_PARSER, getSTForSingleStatement: true, getSTForExpression: true, getSTForResource: true },
                { name: EXTENDED_APIS_ORG.BALLERINA_TO_OPENAPI, generateOpenAPI: true },
                { name: EXTENDED_APIS_ORG.GRAPHQL_DESIGN, getGraphqlModel: true },
                { name: EXTENDED_APIS_ORG.SEQUENCE_DIAGRAM, getSequenceDiagramModel: true },
                {
                    name: EXTENDED_APIS_ORG.NOTEBOOK_SUPPORT, getResult: true, getShellFileSource: true,
                    getVariableValues: true, deleteDeclarations: true, restartNotebook: true
                }
            ]
        }).then(response => {
            const capabilities: Set<String> = new Set();
            console.log("Extended capabilities registered successfully: ", response);
            response.ballerinaServerCapabilities.forEach((capability: BallerinaServerCapability) => {
                const keys: string[] = Object.keys(capability);
                const org: string = capability['name'];
                keys.forEach(key => {
                    if (key !== 'name') {
                        capabilities.add(`${org}/${key}`);
                    }
                });
            });
            this.ballerinaExtendedServices = capabilities;
            return Promise.resolve(this.ballerinaExtendedServices);
        }).catch(_error => {
            this.isDynamicRegistrationSupported = false;
        });

        return Promise.resolve(new Set());
    }

    async isExtendedServiceSupported(serviceName: string): Promise<boolean> {
        // if (!this.isDynamicRegistrationSupported) {
            return Promise.resolve(true);
        // }

        // return Promise.resolve((await this.registerExtendedAPICapabilities()).has(serviceName));
    }

    // <------------ EXTENDED APIS START --------------->

    async getPackageComponentModels(params: ComponentModelsParams): Promise<ComponentModels> {
        return this.sendRequest(EXTENDED_APIS.COMPONENT_MODEL_ENDPOINT, params);
    }

    async getPersistERModel(params: PersistERModelParams): Promise<PersistERModel> {
        return this.sendRequest(EXTENDED_APIS.PERSIST_MODEL_ENDPOINT, params);
    }

    async getDiagnostics(params: DiagnosticsParams): Promise<Diagnostics[] | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_DIAGNOSTICS);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        const start = new Date().getTime();
        const response = await this.sendRequest<Diagnostics[]>(EXTENDED_APIS.DOCUMENT_DIAGNOSTICS, params);
        return response;
    }

    // async getType(params: TypeParams): Promise<ExpressionType | NOT_SUPPORTED_TYPE> {
    //     return this.sendRequest(EXTENDED_APIS.SYMBOL_TYPE, params);
    // }

    async getConnectors(params: ConnectorsParams, reset?: boolean): Promise<Connectors | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.CONNECTOR_CONNECTORS);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        if (!reset && params.query === "" && !params.keyword && !params.organization && !params.offset) {
            let connectorList = this.extensionContext?.globalState.get(CONNECTOR_LIST_CACHE) as Connectors;
            if (connectorList && connectorList.central?.length > 0) {
                return Promise.resolve().then(() => connectorList);
            }
        } else if (!reset && params.query === "http" && !params.keyword && !params.organization && !params.offset) {
            const connectorList = this.extensionContext?.globalState.get(HTTP_CONNECTOR_LIST_CACHE) as Connectors;
            if (connectorList && connectorList.central?.length > 0) {
                return Promise.resolve().then(() => connectorList);
            }
        }
        return this.sendRequest<Connectors>(EXTENDED_APIS.CONNECTOR_CONNECTORS, params);
    }

    async getConnector(params: ConnectorRequest): Promise<ConnectorResponse | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.CONNECTOR_CONNECTOR);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<Connector>(EXTENDED_APIS.CONNECTOR_CONNECTOR, params);
    }

    async getRecord(params: RecordParams): Promise<BallerinaRecord | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.CONNECTOR_RECORD);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<BallerinaRecord>(EXTENDED_APIS.CONNECTOR_RECORD, params);
    }

    async astModify(params: STModifyParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_AST_MODIFY);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<SyntaxTree>(EXTENDED_APIS.DOCUMENT_AST_MODIFY, params);
    }

    async stModify(params: STModifyParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_ST_MODIFY);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<SyntaxTree>(EXTENDED_APIS.DOCUMENT_ST_MODIFY, params);
    }

    async getSTForFunction(params: STModifyParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_ST_FUNCTION);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<SyntaxTree>(EXTENDED_APIS.DOCUMENT_ST_FUNCTION, params);
    }

    async getDefinitionPosition(params: TextDocumentPositionParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DEFINITION_POSITION);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<SyntaxTree>(EXTENDED_APIS.DEFINITION_POSITION, params);
    }

    async getSTByRange(params: BallerinaSTParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_ST_BY_RANGE);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<SyntaxTree>(EXTENDED_APIS.DOCUMENT_ST_BY_RANGE, params);
    }

    async triggerModify(params: TriggerModifyParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_TRIGGER_MODIFY);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<SyntaxTree>(EXTENDED_APIS.DOCUMENT_TRIGGER_MODIFY, params);
    }

    async getSymbolDocumentation(params: SymbolInfoParams): Promise<SymbolInfo | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.SYMBOL_DOC);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<SymbolInfo>(EXTENDED_APIS.SYMBOL_DOC, params);
    }

    async getTypeFromExpression(params: TypeFromExpressionParams): Promise<TypesFromExpression | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.SYMBOL_TYPE_FROM_EXPRESSION);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<TypesFromExpression>(EXTENDED_APIS.SYMBOL_TYPE_FROM_EXPRESSION, params);
    }

    async getTypeFromSymbol(params: TypeFromSymbolParams): Promise<TypesFromSymbol | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.SYMBOL_TYPE_FROM_SYMBOL);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<TypesFromSymbol>(EXTENDED_APIS.SYMBOL_TYPE_FROM_SYMBOL, params);
    }

    async getTypesFromFnDefinition(params: TypesFromFnDefinitionParams): Promise<TypesFromSymbol | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.SYMBOL_TYPES_FROM_FN_SIGNATURE);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest<TypesFromSymbol>(EXTENDED_APIS.SYMBOL_TYPES_FROM_FN_SIGNATURE, params);
    }

    async getVisibleVariableTypes(params: VisibleVariableTypesParams): Promise<VisibleVariableTypes | NOT_SUPPORTED_TYPE> {
        return this.sendRequest<VisibleVariableTypes>(EXTENDED_APIS.VISIBLE_VARIABLE_TYPES, params);
    }

    async getInlineDataMapperMappings(params: InlineDataMapperModelRequest): Promise<InlineDataMapperModelResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest<InlineDataMapperModelResponse>(EXTENDED_APIS.DATA_MAPPER_MAPPINGS, params);
    }

    async getInlineDataMapperSource(params: InlineDataMapperSourceRequest): Promise<InlineDataMapperSourceResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest<InlineDataMapperSourceResponse>(EXTENDED_APIS.DATA_MAPPER_GET_SOURCE, params);
    }

    async getVisualizableFields(params: VisualizableFieldsRequest): Promise<VisualizableFieldsResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest<VisualizableFieldsResponse>(EXTENDED_APIS.DATA_MAPPER_VISUALIZABLE, params);
    }

    async addArrayElement(params: AddArrayElementRequest): Promise<InlineDataMapperSourceResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest<InlineDataMapperSourceResponse>(EXTENDED_APIS.DATA_MAPPER_ADD_ELEMENT, params);
    }

    async getGraphqlModel(params: GraphqlDesignServiceParams): Promise<GraphqlDesignService | NOT_SUPPORTED_TYPE> {
        return this.sendRequest<GraphqlDesignService>(EXTENDED_APIS.GRAPHQL_DESIGN_MODEL, params);
    }

    async getSyntaxTree(req: SyntaxTreeParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_ST);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.DOCUMENT_ST, req);
    }

    async fetchExamples(args: BallerinaExampleListParams = {}): Promise<BallerinaExampleList | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.EXAMPLE_LIST);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.EXAMPLE_LIST, args);
    }

    async getBallerinaProject(params: BallerinaProjectParams): Promise<BallerinaProject | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.PACKAGE_METADATA);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.PACKAGE_METADATA, params);
    }

    async getBallerinaProjectComponents(params: BallerinaPackagesParams): Promise<BallerinaProjectComponents | NOT_SUPPORTED_TYPE> {
        console.log("isDynamicRegistrationSupported: ", this.isDynamicRegistrationSupported);
        console.log("getBallerinaProjectComponents:", params);
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.PACKAGE_COMPONENTS);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        const test = await this.sendRequest(EXTENDED_APIS.PACKAGE_COMPONENTS, params);
        return this.sendRequest(EXTENDED_APIS.PACKAGE_COMPONENTS, params);
    }

    async getBallerinaProjectConfigSchema(params: BallerinaProjectParams): Promise<PackageConfigSchema | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.PACKAGE_CONFIG_SCHEMA);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.PACKAGE_CONFIG_SCHEMA, params);
    }

    async getSyntaxTreeNode(params: SyntaxTreeNodeParams): Promise<SyntaxTreeNode | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_ST_NODE);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.DOCUMENT_ST_NODE, params);
    }

    async getExecutorPositions(params: BallerinaProjectParams): Promise<ExecutorPositions | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.DOCUMENT_EXECUTOR_POSITIONS);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.DOCUMENT_EXECUTOR_POSITIONS, params);
    }

    async getProjectTestFunctions(params: TestsDiscoveryRequest): Promise<TestsDiscoveryResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_DISCOVER_TESTS_IN_PROJECT, params);
    }

    async getFileTestFunctions(params: TestsDiscoveryRequest): Promise<TestsDiscoveryResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_DISCOVER_TESTS_IN_FILE, params);
    }

    async getTestFunction(params: GetTestFunctionRequest): Promise<GetTestFunctionResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_GET_TEST_FUNCTION, params);
    }

    async addTestFunction(params: AddOrUpdateTestFunctionRequest):
        Promise<TestSourceEditResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_ADD_TEST_FUNCTION, params);
    }

    async updateTestFunction(params: AddOrUpdateTestFunctionRequest):
        Promise<TestSourceEditResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_UPDATE_TEST_FUNCTION, params);
    }

    async isIcpEnabled(params: ICPEnabledRequest): Promise<ICPEnabledResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_IS_ICP_ENABLED, params);
    }
    
    async addICP(params: ICPEnabledRequest): Promise<TestSourceEditResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_ADD_ICP, params);
    }

    async disableICP(params: ICPEnabledRequest): Promise<TestSourceEditResponse | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BI_DISABLE_ICP, params);
    }

    async getProjectDiagnostics(params: ProjectDiagnosticsRequest): Promise<ProjectDiagnosticsResponse | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.RUNNER_DIAGNOSTICS);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.RUNNER_DIAGNOSTICS, params);
    }

    async getMainFunctionParams(params: MainFunctionParamsRequest): Promise<MainFunctionParamsResponse | NOT_SUPPORTED_TYPE> {
        const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.RUNNER_MAIN_FUNCTION_PARAMS);
        if (!isSupported) {
            return Promise.resolve(NOT_SUPPORTED);
        }
        return this.sendRequest(EXTENDED_APIS.RUNNER_MAIN_FUNCTION_PARAMS, params);
    }

    async convertJsonToRecord(params: JsonToRecordParams): Promise<JsonToRecord | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.JSON_TO_RECORD_CONVERT, params);
    }

    async convertXMLToRecord(params: XMLToRecordParams): Promise<XMLToRecord | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.XML_TO_RECORD_CONVERT, params);
    }

    async convertJsonToRecordType(params: JsonToRecordParams): Promise<TypeDataWithReferences> {
        return this.sendRequest(EXTENDED_APIS.JSON_TO_RECORD_TYPE_CONVERT, params);
    }

    async convertXmlToRecordType(params: XMLToRecordParams): Promise<TypeDataWithReferences> {
        return this.sendRequest(EXTENDED_APIS.XML_TO_RECORD_TYPE_CONVERT, params);
    }

    async getBalShellResult(params: NoteBookCellOutputParams): Promise<NoteBookCellOutput | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.NOTEBOOK_RESULT, params);
    }

    async getShellBufferFilePath(): Promise<NotebookFileSource | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.NOTEBOOK_FILE_SOURCE);
    }

    async restartNotebook(): Promise<boolean | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.NOTEBOOK_RESTART);
    }

    async getNotebookVariables(): Promise<NotebookVariable[] | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.NOTEBOOK_VARIABLES);
    }

    async deleteDeclarations(params: NotebookDeleteDclnParams): Promise<boolean | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.NOTEBOOK_DELETE_DCLNS, params);
    }

    async getSTForSingleStatement(params: PartialSTParams): Promise<PartialST | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.PARTIAL_PARSE_SINGLE_STATEMENT, params);
    }

    async getSTForExpression(params: PartialSTParams): Promise<PartialST | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.PARTIAL_PARSE_EXPRESSION, params);
    }

    async getSTForModulePart(params: PartialSTParams): Promise<PartialST | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.PARTIAL_PARSE_MODULE_PART, params);
    }

    async getSTForResource(params: PartialSTParams): Promise<PartialST | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.PARTIAL_PARSE_RESOURCE, params);
    }

    async getSTForModuleMembers(params: PartialSTParams): Promise<PartialST | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.PARTIAL_PARSE_MODULE_MEMBER, params);
    }

    async resolveMissingDependencies(req: SyntaxTreeParams): Promise<SyntaxTree | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.RESOLVE_MISSING_DEPENDENCIES, req);
    }

    async convertToOpenAPI(params: OpenAPIConverterParams): Promise<OpenAPISpec | NOT_SUPPORTED_TYPE> {
        return this.sendRequest(EXTENDED_APIS.BALLERINA_TO_OPENAPI, params);
    }

    // <------------ EXTENDED APIS END --------------->

    // <------------ BI APIS START --------------->

    async getFlowModel(params: BIFlowModelRequest): Promise<BIFlowModelResponse> {
        return this.sendRequest<BIFlowModelResponse>(EXTENDED_APIS.BI_FLOW_MODEL, params);
    }

    async getSourceCode(params: BISourceCodeRequest): Promise<BISourceCodeResponse> {
        return this.sendRequest<BISourceCodeResponse>(EXTENDED_APIS.BI_SOURCE_CODE, params);
    }

    async getAvailableNodes(params: BIAvailableNodesRequest): Promise<BIAvailableNodesResponse> {
        return this.sendRequest<BIAvailableNodesResponse>(EXTENDED_APIS.BI_AVAILABLE_NODES, params);
    }

    async getFunctions(params: BIGetFunctionsRequest): Promise<BIGetFunctionsResponse> {
        return this.sendRequest<BIGetFunctionsResponse>(EXTENDED_APIS.BI_GET_FUNCTIONS, params);
    }

    async getEnclosedFunctionDef(params: BIGetEnclosedFunctionRequest): Promise<BIGetEnclosedFunctionResponse> {
        return this.sendRequest<BIGetEnclosedFunctionResponse>(EXTENDED_APIS.BI_GET_ENCLOSED_FUNCTION, params);
    }

    async getNodeTemplate(params: BINodeTemplateRequest): Promise<BINodeTemplateResponse> {
        return this.sendRequest<BINodeTemplateResponse>(EXTENDED_APIS.BI_NODE_TEMPLATE, params);
    }

    async getBIConnectors(params: BIConnectorsRequest): Promise<BIConnectorsResponse> {
        return this.sendRequest<BIConnectorsResponse>(EXTENDED_APIS.BI_CONNECTOR, params);
    }

    async generateServiceFromOAS(params: ServiceFromOASRequest): Promise<ServiceFromOASResponse> {
        return this.sendRequest<ServiceFromOASResponse>(EXTENDED_APIS.BI_GEN_OPEN_API, params);
    }

    async getConfigVariables(params: ConfigVariableRequest): Promise<ConfigVariableResponse> {
        return this.sendRequest<ConfigVariableResponse>(EXTENDED_APIS.VIEW_CONFIG_VARIABLES, params);
    }

    async updateConfigVariables(params: UpdateConfigVariableRequest): Promise<UpdateConfigVariableResponse> {
        return this.sendRequest<UpdateConfigVariableResponse>(EXTENDED_APIS.UPDATE_CONFIG_VARIABLES, params);
    }

    async getSuggestedFlowModel(params: BISuggestedFlowModelRequest): Promise<BIFlowModelResponse> {
        return this.sendRequest<BIFlowModelResponse>(EXTENDED_APIS.BI_SUGGESTED_FLOW_MODEL, params);
    }

    async getCopilotContext(params: BICopilotContextRequest): Promise<BICopilotContextResponse> {
        return this.sendRequest<BICopilotContextResponse>(EXTENDED_APIS.BI_COPILOT_CONTEXT, params);
    }

    async deleteFlowNode(params: BISourceCodeRequest): Promise<BISourceCodeResponse> {
        return this.sendRequest<BISourceCodeResponse>(EXTENDED_APIS.BI_DELETE_NODE, params);
    }

    async deleteByComponentInfo(params: BIDeleteByComponentInfoRequest): Promise<BISourceCodeResponse> {
        return this.sendRequest<BISourceCodeResponse>(EXTENDED_APIS.BI_DELETE_BY_COMPONENT_INFO, params);
    }

    async getSequenceDiagramModel(params: SequenceModelRequest): Promise<SequenceModelResponse> {
        // const isSupported = await this.isExtendedServiceSupported(EXTENDED_APIS.SEQUENCE_DIAGRAM_MODEL);
        return this.sendRequest(EXTENDED_APIS.SEQUENCE_DIAGRAM_MODEL, params);
    }

    async getExpressionCompletions(params: ExpressionCompletionsRequest): Promise<ExpressionCompletionsResponse> {
        return this.sendRequest<ExpressionCompletionsResponse>(EXTENDED_APIS.BI_EXPRESSION_COMPLETIONS, params);
    }

    async getModuleNodes(params: BIModuleNodesRequest): Promise<BIModuleNodesResponse> {
        return this.sendRequest<BIModuleNodesResponse>(EXTENDED_APIS.BI_MODULE_NODES, params);
    }

    async getComponentsFromContent(params: ComponentsFromContent): Promise<BallerinaProjectComponents> {
        return this.sendRequest<BallerinaProjectComponents>(EXTENDED_APIS.BI_GET_COMPONENTS_FROM_CONTENT, params);
    }

    async getSignatureHelp(params: SignatureHelpRequest): Promise<SignatureHelpResponse> {
        return this.sendRequest(EXTENDED_APIS.BI_SIGNATURE_HELP, params);
    }

    async getVisibleTypes(params: VisibleTypesRequest): Promise<VisibleTypesResponse> {
        return this.sendRequest(EXTENDED_APIS.BI_VISIBLE_TYPES, params);
    }

    async getReferences(params: ReferenceLSRequest): Promise<Reference[]> {
        return this.sendRequest(EXTENDED_APIS.REFERENCES, params);
    }

    async addErrorHandler(params: BIModuleNodesRequest): Promise<BISourceCodeResponse> {
        return this.sendRequest(EXTENDED_APIS.BI_GEN_ERROR_HANDLER, params);
    }

    async getExpressionDiagnostics(params: ExpressionDiagnosticsRequest): Promise<ExpressionDiagnosticsResponse> {
        return this.sendRequest<ExpressionDiagnosticsResponse>(EXTENDED_APIS.BI_EXPRESSION_DIAGNOSTICS, params);
    }

    async getTriggerModels(params: TriggerModelsRequest): Promise<TriggerModelsResponse> {
        return this.sendRequest<TriggerModelsResponse>(EXTENDED_APIS.BI_SERVICE_TRIGGER_MODELS, params);
    }

    async getListeners(params: ListenersRequest): Promise<ListenersResponse> {
        return this.sendRequest<ListenersResponse>(EXTENDED_APIS.BI_SERVICE_GET_LISTENERS, params);
    }

    async getFunctionNode(params: FunctionNodeRequest): Promise<FunctionNodeResponse> {
        return this.sendRequest<FunctionNodeResponse>(EXTENDED_APIS.BI_EDIT_FUNCTION_NODE, params);
    }

    async getListenerModel(params: ListenerModelRequest): Promise<ListenerModelResponse> {
        return this.sendRequest<ListenerModelResponse>(EXTENDED_APIS.BI_SERVICE_GET_LISTENER, params);
    }

    async addListenerSourceCode(params: ListenerSourceCodeRequest): Promise<ListenerSourceCodeResponse> {
        return this.sendRequest<ListenerSourceCodeResponse>(EXTENDED_APIS.BI_SERVICE_ADD_LISTENER, params);
    }

    async updateListenerSourceCode(params: ListenerSourceCodeRequest): Promise<ListenerSourceCodeResponse> {
        return this.sendRequest<ListenerSourceCodeResponse>(EXTENDED_APIS.BI_SERVICE_UPDATE_LISTENER, params);
    }

    async getListenerFromSourceCode(params: ListenerModelFromCodeRequest): Promise<ListenerModelFromCodeResponse> {
        return this.sendRequest<ListenerModelFromCodeResponse>(EXTENDED_APIS.BI_SERVICE_GET_LISTENER_SOURCE, params);
    }

    async getServiceModel(params: ServiceModelRequest): Promise<ServiceModelResponse> {
        return this.sendRequest<ServiceModelResponse>(EXTENDED_APIS.BI_SERVICE_GET_SERVICE, params);
    }

    async getFunctionModel(params: FunctionModelRequest): Promise<FunctionModelResponse> {
        return this.sendRequest<FunctionModelResponse>(EXTENDED_APIS.BI_SERVICE_GET_FUNCTION, params);
    }

    async addServiceSourceCode(params: ServiceSourceCodeRequest): Promise<ListenerSourceCodeResponse> {
        return this.sendRequest<ListenerSourceCodeResponse>(EXTENDED_APIS.BI_SERVICE_ADD_SERVICE, params);
    }

    async updateServiceSourceCode(params: ServiceSourceCodeRequest): Promise<ListenerSourceCodeResponse> {
        return this.sendRequest<ListenerSourceCodeResponse>(EXTENDED_APIS.BI_SERVICE_UPDATE_SERVICE, params);
    }

    async getServiceModelFromCode(params: ServiceModelFromCodeRequest): Promise<ServiceModelFromCodeResponse> {
        return this.sendRequest<ServiceModelFromCodeResponse>(EXTENDED_APIS.BI_SERVICE_GET_SERVICE_SOURCE, params);
    }

    async updateServiceClass(params: ServiceClassSourceRequest): Promise<SourceEditResponse> {
        return this.sendRequest<SourceEditResponse>(EXTENDED_APIS.BI_SERVICE_UPDATE_SERVICE_CLASS, params);
    }

    async getServiceClassModel(params: ModelFromCodeRequest): Promise<ServiceClassModelResponse> {
        return this.sendRequest<ServiceClassModelResponse>(EXTENDED_APIS.BI_SERVICE_SERVICE_CLASS_MODEL, params);
    }

    async updateClassField(params: ClassFieldModifierRequest): Promise<SourceEditResponse> {
        return this.sendRequest<SourceEditResponse>(EXTENDED_APIS.BI_UPDATE_CLASS_FIELD, params);
    }

    async addClassField(params: AddFieldRequest): Promise<SourceEditResponse> {
        return this.sendRequest<SourceEditResponse>(EXTENDED_APIS.BI_ADD_CLASS_FIELD, params);
    }

    async getHttpResourceModel(params: HttpResourceModelRequest): Promise<HttpResourceModelResponse> {
        return this.sendRequest<HttpResourceModelResponse>(EXTENDED_APIS.BI_SERVICE_GET_RESOURCE, params);
    }

    async addResourceSourceCode(params: FunctionSourceCodeRequest): Promise<ResourceSourceCodeResponse> {
        return this.sendRequest<ResourceSourceCodeResponse>(EXTENDED_APIS.BI_SERVICE_ADD_RESOURCE, params);
    }

    async addFunctionSourceCode(params: FunctionSourceCodeRequest): Promise<ResourceSourceCodeResponse> {
        return this.sendRequest<ResourceSourceCodeResponse>(EXTENDED_APIS.BI_SERVICE_ADD_FUNCTION, params);
    }

    async updateResourceSourceCode(params: FunctionSourceCodeRequest): Promise<ResourceSourceCodeResponse> {
        return this.sendRequest<ResourceSourceCodeResponse>(EXTENDED_APIS.BI_SERVICE_UPDATE_RESOURCE, params);
    }

    async getDesignModel(params: BIDesignModelRequest): Promise<BIDesignModelResponse> {
        return this.sendRequest<BIDesignModelResponse>(EXTENDED_APIS.BI_DESIGN_MODEL, params);
    }

    async getTypes(params: GetTypesRequest): Promise<GetTypesResponse> {
        return this.sendRequest<GetTypesResponse>(EXTENDED_APIS.BI_GET_TYPES, params);
    }

    async getType(params: GetTypeRequest): Promise<GetTypeResponse> {
        return this.sendRequest<GetTypeResponse>(EXTENDED_APIS.BI_GET_TYPE, params);
    }

    async updateType(params: UpdateTypeRequest): Promise<UpdateTypeResponse> {
        return this.sendRequest<UpdateTypeResponse>(EXTENDED_APIS.BI_UPDATE_TYPE, params);
    }

    async createGraphqlClassType(params: UpdateTypeRequest): Promise<UpdateTypeResponse> {
        return this.sendRequest<UpdateTypeResponse>(EXTENDED_APIS.BI_CREATE_GRAPHQL_CLASS_TYPE, params);
    }

    async getGraphqlTypeModel(params: GetGraphqlTypeRequest): Promise<GetGraphqlTypeResponse> {
        return this.sendRequest<GetGraphqlTypeResponse>(EXTENDED_APIS.BI_GET_GRAPHQL_TYPE, params);
    }

    async updateImports(params: UpdateImportsRequest): Promise<void> {
        return this.sendRequest<void>(EXTENDED_APIS.BI_UPDATE_IMPORTS, params);
    }

    async addFunction(params: AddFunctionRequest): Promise<AddFunctionResponse> {
        return this.sendRequest<AddFunctionResponse>(EXTENDED_APIS.BI_ADD_FUNCTION, params);
    }

    // <------------ BI APIS END --------------->

}

enum EXTENDED_APIS {
    DOCUMENT_ST_NODE = 'ballerinaDocument/syntaxTreeNode',
    DOCUMENT_EXECUTOR_POSITIONS = 'ballerinaDocument/executorPositions',
    DOCUMENT_ST_MODIFY = 'ballerinaDocument/syntaxTreeModify',
    DOCUMENT_DIAGNOSTICS = 'ballerinaDocument/diagnostics',
    DOCUMENT_ST = 'ballerinaDocument/syntaxTree',
    DOCUMENT_AST_MODIFY = 'ballerinaDocument/astModify',
    DOCUMENT_TRIGGER_MODIFY = 'ballerinaDocument/triggerModify',
    SYMBOL_TYPE = 'ballerinaSymbol/type',
    CONNECTOR_CONNECTORS = 'ballerinaConnector/connectors',
    CONNECTOR_CONNECTOR = 'ballerinaConnector/connector',
    CONNECTOR_RECORD = 'ballerinaConnector/record',
    PACKAGE_COMPONENTS = 'ballerinaPackage/components',
    PACKAGE_METADATA = 'ballerinaPackage/metadata',
    PACKAGE_CONFIG_SCHEMA = 'ballerinaPackage/configSchema',
    JSON_TO_RECORD_CONVERT = 'jsonToRecord/convert',
    XML_TO_RECORD_CONVERT = 'xmlToRecord/convert',
    JSON_TO_RECORD_TYPE_CONVERT = 'jsonToRecordTypes/convert',
    XML_TO_RECORD_TYPE_CONVERT = 'xmlToRecordTypes/convert',
    PARTIAL_PARSE_SINGLE_STATEMENT = 'partialParser/getSTForSingleStatement',
    PARTIAL_PARSE_EXPRESSION = 'partialParser/getSTForExpression',
    PARTIAL_PARSE_MODULE_MEMBER = 'partialParser/getSTForModuleMembers',
    PARTIAL_PARSE_MODULE_PART = 'partialParser/getSTForModulePart',
    PARTIAL_PARSE_RESOURCE = 'partialParser/getSTForResource',
    EXAMPLE_LIST = 'ballerinaExample/list',
    PERF_ANALYZER_RESOURCES_ENDPOINTS = 'performanceAnalyzer/getResourcesWithEndpoints',
    RESOLVE_MISSING_DEPENDENCIES = 'ballerinaDocument/resolveMissingDependencies',
    BALLERINA_TO_OPENAPI = 'openAPILSExtension/generateOpenAPI',
    NOTEBOOK_RESULT = "balShell/getResult",
    NOTEBOOK_FILE_SOURCE = "balShell/getShellFileSource",
    NOTEBOOK_RESTART = "balShell/restartNotebook",
    NOTEBOOK_VARIABLES = "balShell/getVariableValues",
    NOTEBOOK_DELETE_DCLNS = "balShell/deleteDeclarations",
    SYMBOL_DOC = 'ballerinaSymbol/getSymbol',
    SYMBOL_TYPE_FROM_EXPRESSION = 'ballerinaSymbol/getTypeFromExpression',
    SYMBOL_TYPE_FROM_SYMBOL = 'ballerinaSymbol/getTypeFromSymbol',
    SYMBOL_TYPES_FROM_FN_SIGNATURE = 'ballerinaSymbol/getTypesFromFnDefinition',
    COMPONENT_MODEL_ENDPOINT = 'projectDesignService/getProjectComponentModels',
    GRAPHQL_DESIGN_MODEL = 'graphqlDesignService/getGraphqlModel',
    DOCUMENT_ST_FUNCTION = 'ballerinaDocument/syntaxTreeByName',
    DEFINITION_POSITION = 'ballerinaDocument/syntaxTreeNodeByPosition',
    PERSIST_MODEL_ENDPOINT = 'persistERGeneratorService/getPersistERModels',
    DOCUMENT_ST_BY_RANGE = 'ballerinaDocument/syntaxTreeByRange',
    SEQUENCE_DIAGRAM_MODEL = 'sequenceModelGeneratorService/getSequenceDiagramModel',
    BI_FLOW_MODEL = 'flowDesignService/getFlowModel',
    BI_SUGGESTED_FLOW_MODEL = 'flowDesignService/getSuggestedFlowModel',
    BI_COPILOT_CONTEXT = 'flowDesignService/getCopilotContext',
    BI_SOURCE_CODE = 'flowDesignService/getSourceCode',
    BI_DELETE_NODE = 'flowDesignService/deleteFlowNode',
    BI_DELETE_BY_COMPONENT_INFO = 'flowDesignService/deleteComponent',
    BI_AVAILABLE_NODES = 'flowDesignService/getAvailableNodes',
    BI_GET_FUNCTIONS = 'flowDesignService/getFunctions',
    BI_NODE_TEMPLATE = 'flowDesignService/getNodeTemplate',
    BI_CONNECTOR = 'flowDesignService/getConnectors',
    BI_GEN_OPEN_API = 'flowDesignService/generateServiceFromOpenApiContract',
    BI_MODULE_NODES = 'flowDesignService/getModuleNodes',
    BI_GEN_ERROR_HANDLER = 'flowDesignService/addErrorHandler',
    BI_GET_ENCLOSED_FUNCTION = 'flowDesignService/getEnclosedFunctionDef',
    BI_EXPRESSION_COMPLETIONS = 'expressionEditor/completion',
    VISIBLE_VARIABLE_TYPES = 'expressionEditor/visibleVariableTypes',
    DATA_MAPPER_MAPPINGS = 'dataMapper/mappings',
    DATA_MAPPER_GET_SOURCE = 'dataMapper/getSource',
    DATA_MAPPER_VISUALIZABLE = 'dataMapper/visualizable',
    DATA_MAPPER_ADD_ELEMENT = 'dataMapper/addElement',
    VIEW_CONFIG_VARIABLES = 'configEditor/getConfigVariables',
    UPDATE_CONFIG_VARIABLES = 'configEditor/updateConfigVariables',
    RUNNER_DIAGNOSTICS = 'ballerinaRunner/diagnostics',
    RUNNER_MAIN_FUNCTION_PARAMS = 'ballerinaRunner/mainFunctionParams',
    BI_GET_COMPONENTS_FROM_CONTENT = 'flowDesignService/getSuggestedComponents',
    BI_SIGNATURE_HELP = 'expressionEditor/signatureHelp',
    BI_VISIBLE_TYPES = 'expressionEditor/types',
    REFERENCES = 'textDocument/references',
    BI_EXPRESSION_DIAGNOSTICS = 'expressionEditor/diagnostics',
    BI_TRIGGER_MODELS = 'triggerDesignService/getTriggerModels',
    BI_TRIGGER_MODEL = 'triggerDesignService/getTriggerModel',
    BI_TRIGGER_SOURCE_CODE = 'triggerDesignService/getSourceCode',
    BI_TRIGGER_MODEL_FROM_CODE = 'triggerDesignService/getTriggerModelFromCode',
    BI_TRIGGER_UPDATE_FROM_CODE = 'triggerDesignService/updateTrigger',
    BI_TRIGGER_ADD_FUNCTION = 'triggerDesignService/addTriggerFunction',
    BI_TRIGGER_UPDATE_FUNCTION = 'triggerDesignService/updateTriggerFunction',
    BI_GET_TYPES = 'typesManager/getTypes',
    BI_GET_TYPE = 'typesManager/getType',
    BI_UPDATE_TYPE = 'typesManager/updateType',
    BI_GET_GRAPHQL_TYPE = 'typesManager/getGraphqlType',
    BI_CREATE_GRAPHQL_CLASS_TYPE = 'typesManager/createGraphqlClassType',
    BI_SERVICE_TRIGGER_MODELS = 'serviceDesign/getTriggerModels',
    BI_SERVICE_GET_LISTENERS = 'serviceDesign/getListeners',
    BI_SERVICE_GET_LISTENER = 'serviceDesign/getListenerModel',
    BI_SERVICE_ADD_LISTENER = 'serviceDesign/addListener',
    BI_SERVICE_UPDATE_LISTENER = 'serviceDesign/updateListener',
    BI_SERVICE_GET_LISTENER_SOURCE = 'serviceDesign/getListenerFromSource',
    BI_SERVICE_GET_SERVICE = 'serviceDesign/getServiceModel',
    BI_SERVICE_GET_FUNCTION = 'serviceDesign/getFunctionModel',
    BI_SERVICE_ADD_SERVICE = 'serviceDesign/addService',
    BI_SERVICE_UPDATE_SERVICE = 'serviceDesign/updateService',
    BI_SERVICE_GET_SERVICE_SOURCE = 'serviceDesign/getServiceFromSource',
    BI_SERVICE_UPDATE_SERVICE_CLASS = 'serviceDesign/updateServiceClass',
    BI_SERVICE_GET_RESOURCE = 'serviceDesign/getFunctionModel',
    BI_SERVICE_ADD_RESOURCE = 'serviceDesign/addResource',
    BI_SERVICE_ADD_FUNCTION = 'serviceDesign/addFunction',
    BI_SERVICE_UPDATE_RESOURCE = 'serviceDesign/updateFunction',
    BI_SERVICE_GET_TRIGGERS = 'serviceDesign/getTriggerModels',
    BI_SERVICE_SERVICE_CLASS_MODEL = 'serviceDesign/getServiceClassModelFromSource',
    BI_UPDATE_CLASS_FIELD = 'serviceDesign/updateClassField',
    BI_ADD_CLASS_FIELD = 'serviceDesign/addField',
    BI_DESIGN_MODEL = 'designModelService/getDesignModel',
    BI_UPDATE_IMPORTS = 'expressionEditor/importModule',
    BI_ADD_FUNCTION = 'expressionEditor/functionCallTemplate',
    BI_DISCOVER_TESTS_IN_PROJECT = 'testManagerService/discoverInProject',
    BI_DISCOVER_TESTS_IN_FILE = 'testManagerService/discoverInFile',
    BI_GET_TEST_FUNCTION = 'testManagerService/getTestFunction',
    BI_ADD_TEST_FUNCTION = 'testManagerService/addTestFunction',
    BI_UPDATE_TEST_FUNCTION = 'testManagerService/updateTestFunction',
    BI_EDIT_FUNCTION_NODE = 'flowDesignService/functionDefinition',
    BI_IS_ICP_ENABLED = 'icpService/isIcpEnabled',
    BI_ADD_ICP = 'icpService/addICP',
    BI_DISABLE_ICP = 'icpService/disableICP',
}

enum EXTENDED_APIS_ORG {
    DOCUMENT = 'ballerinaDocument',
    PACKAGE = 'ballerinaPackage',
    EXAMPLE = 'ballerinaExample',
    JSON_TO_RECORD = 'jsonToRecord',
    XML_TO_RECORD = 'xmlToRecord',
    SYMBOL = 'ballerinaSymbol',
    CONNECTOR = 'ballerinaConnector',
    TRIGGER = 'ballerinaTrigger',
    PERF_ANALYZER = 'performanceAnalyzer',
    PARTIAL_PARSER = 'partialParser',
    BALLERINA_TO_OPENAPI = 'openAPILSExtension',
    NOTEBOOK_SUPPORT = "balShell",
    GRAPHQL_DESIGN = "graphqlDesignService",
    SEQUENCE_DIAGRAM = "sequenceModelGeneratorService",
    RUNNER = "ballerinaRunner"
}

export enum DIAGNOSTIC_SEVERITY {
    INTERNAL = "INTERNAL",
    HINT = "HINT",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR"
}

enum VSCODE_APIS {
    DID_OPEN = 'textDocument/didOpen',
    DID_CLOSE = 'textDocument/didClose',
    DID_CHANGE = 'textDocument/didChange',
    DEFINITION = 'textDocument/definition',
    COMPLETION = 'textDocument/completion',
    RENAME = 'textDocument/rename',
    DOC_SYMBOL = 'textDocument/documentSymbol',
    CODE_ACTION = 'textDocument/codeAction',
    EXECUTE_CMD = 'workspace/executeCommand',
    PUBLISH_DIAGNOSTICS = 'textDocument/publishDiagnostics'
}
