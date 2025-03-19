
import React, { useEffect, useState } from "react";
import { PanelContainer } from "@dharshi/ballerina-side-panel";
import { useVisualizerContext } from '../../Context';
import { StatementEditorComponent } from "../StatementEditorComponent"
import { STModification } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { shouldSkipSemicolon } from "../ConstructPanel";
import { fetchConnectorInfo, retrieveUsedAction } from "../Connectors/ConnectorWizard/utils";
import { Typography } from "@dharshi/ui-toolkit";

interface EditPanelProps {
    applyModifications: (modifications: STModification[]) => Promise<void>;
}

export function EditPanel(props: EditPanelProps) {

    console.log('edit panel props: ', props);
    const { applyModifications } = props;
    const { activePanel, setActivePanel, statementPosition, componentInfo, activeFileInfo } = useVisualizerContext();
    const [isFetching, setIsFetching] = useState(true);
    const { rpcClient } = useRpcContext();

    const closeStatementEditor = () => {
        console.log("close")
        setActivePanel({ isActive: false });
    }

    const cancelStatementEditor = () => {
        console.log("cancel")
        setActivePanel({ isActive: false });
    }

    useEffect(() => {
        if (componentInfo && isFetching) {
            getComponentInfo();
        }

    }, [componentInfo]);

    const getComponentInfo = async () => {
        console.log("get component info");
        if ((componentInfo.componentType === "Connector" || componentInfo.componentType === "Action" || componentInfo.componentType === "HttpAction") && componentInfo.connectorInfo?.connector) {
            const connectorMetadata = await fetchConnectorInfo(componentInfo.connectorInfo.connector, rpcClient, activeFileInfo?.filePath);
            componentInfo.connectorInfo.connector = connectorMetadata;
            console.log("connector meta data");
            if (componentInfo.componentType === "Action" || componentInfo.componentType === "HttpAction") {
                const action = retrieveUsedAction(componentInfo.model, connectorMetadata);
                componentInfo.connectorInfo.action = action;
            }
            setIsFetching(false);
        } else {
            setIsFetching(false);
        }
    };

    return (
        <>
            {activeFileInfo?.filePath && componentInfo?.model &&
                <PanelContainer title="Edit Construct" show={activePanel?.isActive} onClose={() => { setActivePanel({ isActive: false }) }}>

                    {isFetching &&
                        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                            <Typography>Loading Statement Editor...</Typography>
                        </div>
                    }
                    {!isFetching &&
                        <StatementEditorComponent
                            label={componentInfo.componentType}
                            config={{ type: componentInfo.componentType, model: componentInfo.model }}
                            initialSource={componentInfo.model?.source}
                            applyModifications={applyModifications}
                            currentFile={{
                                content: activeFileInfo?.fullST?.source || "",
                                path: activeFileInfo?.filePath,
                                size: 1
                            }}
                            formArgs={{
                                ...componentInfo?.connectorInfo
                            }}
                            onCancel={cancelStatementEditor}
                            onClose={closeStatementEditor}
                            syntaxTree={activeFileInfo?.fullST}
                            targetPosition={componentInfo?.position || statementPosition}
                            skipSemicolon={shouldSkipSemicolon(componentInfo?.componentType)}
                            
                        />
                    }

                </PanelContainer>
            }
        </>
    );
}
