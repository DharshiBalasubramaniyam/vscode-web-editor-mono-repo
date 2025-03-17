// tslint:disable: jsx-no-multiline-js
import React, { useEffect, useState } from "react";
import {
    LowCodeDiagram,
    initVisitor,
    PositioningVisitor,
    SizingVisitor,
    SymbolVisitor,
    cleanLocalSymbols,
    cleanModuleLevelSymbols,
    getSymbolInfo,
} from "@dharshi/ballerina-low-code-diagram";

import { NodePosition, STKindChecker, STNode, traversNode } from "@dharshi/syntax-tree";
import { BallerinaConnectorInfo, BallerinaModuleResponse, BallerinaConnectorsRequest, BallerinaConstruct, STModification } from "@dharshi/ballerina-core";


import { BallerinaModuleType, Marketplace, SearchQueryParams } from "../Marketplace";
import { BallerinaRpcClient, useRpcContext } from "@dharshi/ballerina-rpc-client";
import { fetchConnectorInfo, getConnectorImports, getInitialSourceForConnectors } from "./utils";
import { set } from "lodash";
import { useVisualizerContext } from "../../../Context";
import { PanelContainer } from "@dharshi/ballerina-side-panel";
import { StatementEditorComponent } from "../../StatementEditorComponent";
import { URI } from "vscode-uri";
import { PackageLoader } from "../PackageLoader";


export interface ConnectorListProps {
    applyModifications: (modifications: STModification[]) => Promise<void>;
}

enum MESSAGE_TYPE {
    ERROR,
    WARNING,
    INFO,
}

export function ConnectorList(props: ConnectorListProps) {
    const { applyModifications } = props;
    const [pullingPackage, setPullingPackage] = useState(false);
    const [selectedConnector, setSelectedConnector] = useState<BallerinaConnectorInfo>();
    const [showStatementEditor, setShowStatementEditor] = useState<boolean>(false);
    const [initialSource, setInitialSource] = useState<string>();
    const { activeFileInfo, statementPosition, setActivePanel, setSidePanel, setActiveFileInfo, setStatementPosition } = useVisualizerContext();

    const { rpcClient } = useRpcContext();

    useEffect(() => {
        console.log(activeFileInfo);
        if (
            pullingPackage &&
            selectedConnector?.package?.organization &&
            selectedConnector.package.name
        ) {
            // setPullingPackage(true);
            console.log("getting imports....")
            const imports = getConnectorImports(activeFileInfo?.fullST, selectedConnector.package.organization, selectedConnector.moduleName, true);
            console.log("imports: ", imports);
            if (imports && imports?.size > 0) {
                let pullCommand = "";
                imports.forEach((impt) => {
                    if (pullCommand !== "") {
                        pullCommand += ` && `;
                    }
                    pullCommand += `bal pull ${impt.replace(" as _", "")}`;
                });
                rpcClient.getCommonRpcClient().runBackgroundTerminalCommand({ command: pullCommand })
                    .then((res) => {
                        if (res.error && !res.message.includes("already exists")) {
                            // TODO: Handle error properly
                            console.error('Something wrong when pulling package: ', res.message);
                        }
                    })
                    .catch((err) => {
                        // TODO: Handle error properly
                        console.error('Something wrong when pulling package: ', err);
                    })
                    .finally(async () => {
                        setPullingPackage(false);
                        // get the initial source
                        const stSymbolInfo = getSymbolInfo();
                        const initialSource = await getInitialSourceForConnectors(selectedConnector, statementPosition, stSymbolInfo, activeFileInfo.activeSequence);
                        setInitialSource(initialSource);
                        setShowStatementEditor(true);
                    });
            }
        }
    }, [selectedConnector]);

    const fetchConnectorsList = async (
        queryParams: SearchQueryParams,
        currentFilePath: string,
        langClient: BallerinaRpcClient,
    ): Promise<BallerinaModuleResponse> => {
        const { query, category, filterState, limit, page } = queryParams;
        const request: BallerinaConnectorsRequest = {
            targetFile: currentFilePath,
            query,
            limit: limit,
        };
        if (category) {
            request.keyword = category;
        }
        if (page) {
            request.offset = (page - 1) * (limit || 5);
        }
        return langClient.getConnectorWizardRpcClient().getConnectors(request);
    };

    const onSelect = async (balModule: BallerinaConstruct, langClient: BallerinaRpcClient) => {
        setPullingPackage(true);
        const connectorMetadata = await fetchConnectorInfo(balModule, langClient, activeFileInfo?.filePath);
        setSelectedConnector(connectorMetadata);
    }

    const closeStatementEditor = () => {
        setShowStatementEditor(false);
        setSidePanel("EMPTY");
    }

    const cancelStatementEditor = () => {
        setShowStatementEditor(false);
        setSelectedConnector(undefined);
    }

    const onMarketplaceClose = () => {
        setSidePanel("EMPTY");
    }

    useEffect(() => {
        rpcClient
            .getLangClientRpcClient()
            .getSyntaxTree()
            .then(async (model) => {
                const parsedModel = sizingAndPositioningST(model.syntaxTree);
                const filePath = (await rpcClient.getVisualizerLocation()).documentUri;
                const fullST = await rpcClient.getLangClientRpcClient().getST({
                    documentIdentifier: { uri: URI.parse(filePath).toString() }
                });
                setActiveFileInfo({ fullST: fullST?.syntaxTree, filePath, activeSequence: parsedModel });
                if (!statementPosition) {
                    setStatementPosition({
                        startLine: fullST.syntaxTree.position.endLine + 1,
                        endLine: fullST.syntaxTree.position.endLine + 1,
                        startColumn: fullST.syntaxTree.position.endColumn - 1,
                        endColumn: fullST.syntaxTree.position.endColumn - 1,
                    });
                }
            });
    }, [])

    function sizingAndPositioningST(
        st: STNode,
        experimentalEnabled?: boolean,
        showMessage?: (
            arg: string,
            messageType: MESSAGE_TYPE,
            ignorable: boolean,
            filePath?: string,
            fileContent?: string,
            bypassChecks?: boolean
        ) => void
    ): STNode {
        traversNode(st, initVisitor);
        const sizingVisitor = new SizingVisitor(experimentalEnabled);
        traversNode(st, sizingVisitor);
        if (showMessage && sizingVisitor.getConflictResulutionFailureStatus()) {
            showMessage(
                "Something went wrong in the diagram rendering.",
                MESSAGE_TYPE.ERROR,
                false,
                undefined,
                undefined,
                true
            );
        }
        traversNode(st, new PositioningVisitor());
        cleanLocalSymbols();
        cleanModuleLevelSymbols();
        traversNode(st, SymbolVisitor);
        const clone = { ...st };
        return clone;
    }

    return (
        <>
            {pullingPackage &&
                (
                    <PanelContainer title="Pulling packages" show={true} onClose={() => setActivePanel({ isActive: false })}>
                        <PackageLoader />
                    </PanelContainer>
                )}
            {activeFileInfo?.filePath && !selectedConnector && !pullingPackage &&
                <Marketplace
                    currentFilePath={activeFileInfo?.filePath}
                    onSelect={onSelect}
                    onClose={onMarketplaceClose}
                    fetchModulesList={fetchConnectorsList}
                    title={"Connectors"}
                    shortName="connectors"
                />
            }
            {selectedConnector && !pullingPackage && activeFileInfo?.filePath && showStatementEditor &&
                <PanelContainer title="Add Connector" show={true} onClose={cancelStatementEditor}>
                    (
                    <StatementEditorComponent
                        label={"Connector"}
                        config={{ type: "Connector", model: null }}
                        initialSource={initialSource}
                        applyModifications={applyModifications}
                        currentFile={{
                            content: activeFileInfo?.fullST?.source || "",
                            path: activeFileInfo?.filePath,
                            size: 1
                        }}
                        formArgs={{
                            connector: selectedConnector?.package ? selectedConnector : undefined,
                            functionNode: activeFileInfo?.activeSequence,
                        }}
                        onCancel={cancelStatementEditor}
                        onClose={closeStatementEditor}
                        syntaxTree={activeFileInfo?.fullST}
                        targetPosition={statementPosition}
                        skipSemicolon={false}
                        extraModules={getConnectorImports(activeFileInfo?.fullST, selectedConnector?.package?.organization, selectedConnector?.moduleName)}

                    />
                    )
                </PanelContainer>

            }
        </>
    );
}
