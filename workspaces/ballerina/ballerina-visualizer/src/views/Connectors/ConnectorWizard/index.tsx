// tslint:disable: jsx-no-multiline-js
import { useEffect, useState } from "react";
import {
    getSymbolInfo,
} from "@dharshi/ballerina-low-code-diagram";

import { STKindChecker } from "@dharshi/syntax-tree";
import { BallerinaConnectorInfo, BallerinaModuleResponse, BallerinaConnectorsRequest, BallerinaConstruct, STModification, EVENT_TYPE, MACHINE_VIEW } from "@dharshi/ballerina-core";


import { Marketplace, SearchQueryParams } from "../Marketplace";
import { BallerinaRpcClient, useRpcContext } from "@dharshi/ballerina-rpc-client";
import { fetchConnectorInfo, getConnectorImports, getInitialSourceForConnectors } from "./utils";
import { PanelType, useVisualizerContext } from "../../../Context";
import { PanelContainer } from "@dharshi/ballerina-side-panel";
import { StatementEditorComponent } from "../../StatementEditorComponent";
import { URI } from "vscode-uri";
import { PackageLoader } from "../PackageLoader";
import { ProgressRing, Typography } from "@dharshi/ui-toolkit";


export interface ConnectorListProps {
    edit?: boolean
    applyModifications: (modifications: STModification[]) => Promise<void>;
}

enum MESSAGE_TYPE {
    ERROR,
    WARNING,
    INFO,
}

export function ConnectorList(props: ConnectorListProps) {
    const { applyModifications, edit } = props;
    const [pullingPackage, setPullingPackage] = useState(false);
    const [selectedConnector, setSelectedConnector] = useState<BallerinaConnectorInfo>();
    const [showStatementEditor, setShowStatementEditor] = useState<boolean>(false);
    const [initialSource, setInitialSource] = useState<string>();
    const { activeFileInfo, statementPosition, setActivePanel, setSidePanel, setActiveFileInfo, setStatementPosition, componentInfo } = useVisualizerContext();
    const { rpcClient } = useRpcContext();
    const [isFetchingEditConnector, setIsFetchingEditConnector] = useState<boolean>(false);

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
                            console.error('Something wrong when pulling package: ', res.message);
                        }
                    })
                    .catch((err) => {
                        console.error('Something wrong when pulling package: ', err);
                    })
                    .finally(async () => {
                        setPullingPackage(false);
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
        console.log("closing statement editor...")
        setShowStatementEditor(false);
        setSelectedConnector(undefined);
        setSidePanel("EMPTY");
        if (edit) {
            rpcClient.getVisualizerRpcClient().openView({
                location: {documentUri: activeFileInfo.filePath, view: MACHINE_VIEW.Overview},
                type: EVENT_TYPE.OPEN_VIEW
            })
        } else {
            rpcClient.getVisualizerRpcClient().goBack()
        }
    }

    const cancelStatementEditor = () => {
        console.log("cancelling statement editor...")
        setShowStatementEditor(false);
        setSelectedConnector(undefined);
        if (edit) {
            setSidePanel("EMPTY");
            rpcClient.getVisualizerRpcClient().openView({
                location: {documentUri: activeFileInfo.filePath, view: MACHINE_VIEW.Overview},
                type: EVENT_TYPE.OPEN_VIEW
            })
        }
    }

    const onMarketplaceClose = () => {
        setSidePanel("EMPTY");
    }

    useEffect(() => {
        rpcClient
            .getLangClientRpcClient()
            .getSyntaxTree()
            .then(async (model) => {
                console.log("model: ", model);
                const filePath = (await rpcClient.getVisualizerLocation()).documentUri;
                if (!STKindChecker.isFunctionDefinition(model.syntaxTree)) {
                    const fullST = await rpcClient.getLangClientRpcClient().getST({
                        documentIdentifier: { uri: URI.parse(filePath).toString() }
                    });
                    setActiveFileInfo({ ...activeFileInfo, fullST: fullST?.syntaxTree, filePath });
                    setStatementPosition({
                        startLine: fullST.syntaxTree.position.endLine + 1,
                        endLine: fullST.syntaxTree.position.endLine + 1,
                        startColumn: fullST.syntaxTree.position.endColumn - 1,
                        endColumn: fullST.syntaxTree.position.endColumn - 1,
                    });
                }
                if (edit) {
                    setIsFetchingEditConnector(true);
                    console.log("getting connector info for editing: ", {
                        "filepath": filePath
                    })
                    rpcClient.getVisualizerLocation()
                        .then((location) => {
                            console.log("location: ", location)
                            const [module, name] = location.identifier.split(":");
                            console.log(module, name)
                                ; fetchConnectorsList(
                                    { query: module }, filePath, rpcClient
                                ).then((res) => {
                                    const allConnectors = [...res.central, ...res.local]
                                    console.log("allConnectors: ", allConnectors)
                                    const connector = allConnectors.find((c) => {
                                        return c.moduleName.toLowerCase() === module && c.name.toLowerCase() === name;
                                    })
                                    console.log("connector: ", connector)
                                    rpcClient.getLangClientRpcClient().getSTByRange({
                                        documentIdentifier: { uri: filePath },
                                        lineRange: {
                                            start: { line: location.position.startLine, character: location.position.startColumn },
                                            end: { line: location.position.endLine, character: location.position.endColumn },
                                        }
                                    }).then(async (res) => {
                                        setShowStatementEditor(true);
                                        const connectorMetadata = await fetchConnectorInfo(connector, rpcClient, filePath);
                                        setSelectedConnector(connectorMetadata);
                                        setInitialSource(res.syntaxTree.source);
                                        setStatementPosition(location.position);
                                    }).finally(() => {
                                        setIsFetchingEditConnector(false);
                                    })
                                })
                        });
                }
                console.log("activeFileInfo: ", activeFileInfo)
            }).finally(() => {
            });
        
    }, []);

    console.log(!!selectedConnector, pullingPackage, !!activeFileInfo?.filePath, edit, showStatementEditor, isFetchingEditConnector)

    return (
        <>
            {pullingPackage &&
                (
                    <PanelContainer title="Pulling packages" show={true} onClose={() => setActivePanel({ isActive: false })}>
                        <PackageLoader />
                    </PanelContainer>
                )}
            {activeFileInfo?.filePath && !selectedConnector && !pullingPackage && !edit &&
                <Marketplace
                    currentFilePath={activeFileInfo?.filePath}
                    onSelect={onSelect}
                    onClose={onMarketplaceClose}
                    fetchModulesList={fetchConnectorsList}
                    title={"Connectors"}
                    shortName="connectors"
                />
            }
            {/* {
                edit && !selectedConnector && isFetchingEditConnector && (
                    <PanelContainer title="Connector" show={true} onClose={cancelStatementEditor}>
                        <ProgressRing />
                        <Typography variant="h3" sx={{ marginTop: '16px' }}>Fetching Connector...</Typography>
                    </PanelContainer>
                )
            } */}
            {selectedConnector && !pullingPackage && activeFileInfo?.filePath && showStatementEditor && edit &&
                <PanelContainer title={ edit ? "Edit Connector" : "Add Connector"} show={true} onClose={cancelStatementEditor}>
                    (
                    <StatementEditorComponent
                        label={"Connector"}
                        config={{ type: "Connector", model: edit ? activeFileInfo?.fullST : null }}
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
