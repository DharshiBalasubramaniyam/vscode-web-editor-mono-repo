
import React, { useEffect, useState } from "react";
import { PanelContainer, NodeList } from "@dharshi/ballerina-side-panel";
import { useVisualizerContext } from '../../Context';
import { StatementEditorComponent } from "../StatementEditorComponent"
import { getAllVariables, getInitialSource, STModification } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { getSymbolInfo } from "@dharshi/ballerina-low-code-diagram";
import { constructList, getTemplateValues } from "./constructList";

interface ConstructPanelProps {
    applyModifications: (modifications: STModification[]) => Promise<void>;
}

export function ConstructPanel(props: ConstructPanelProps) {
    const { applyModifications } = props;

    const { activePanel, setActivePanel, statementPosition, activeFileInfo, setSidePanel } = useVisualizerContext();
    const [showStatementEditor, setShowStatementEditor] = useState<boolean>(false);
    const [initialSource, setInitialSource] = useState<string>();
    const [selectedNode, setSelectedNode] = useState<string>();

    const closeStatementEditor = () => {
        setShowStatementEditor(false);
        setActivePanel({ isActive: false });
    }

    const cancelStatementEditor = () => {
        setShowStatementEditor(false);
    }


    const handleOnSelectNode = (nodeId: string) => {
        // create the intial source for the statement editor
        const stSymbolInfo = getSymbolInfo();
        const allVariables = stSymbolInfo ? getAllVariables(stSymbolInfo) : [];
        if (nodeId === "If") {
            const ifTemplateValues = getTemplateValues("IfStatement", allVariables);
            const initialSource = getInitialSource(ifTemplateValues);
            const elseTemplateValues = getTemplateValues("ElseStatement", allVariables);
            const elseInitialSource = getInitialSource(elseTemplateValues);
            setInitialSource(initialSource + elseInitialSource);
            setSelectedNode(nodeId);
            setShowStatementEditor(true);
        } else if (nodeId === "Connector") {
            setActivePanel({ isActive: false });
            setSidePanel("ADD_CONNECTION");
        } else if (nodeId === "Action") {
            setActivePanel({ isActive: false });
            setSidePanel("ADD_ACTION");
        } else {
            const templateValues = getTemplateValues(nodeId, allVariables);
            const initialSource = getInitialSource(templateValues);
            setInitialSource(initialSource);
            setSelectedNode(nodeId);
            setShowStatementEditor(true);
        }
    }


    return (
        <PanelContainer title="Add Constructs" show={activePanel?.isActive} onClose={() => { setActivePanel({ isActive: false }) }}>
            {showStatementEditor && activeFileInfo?.filePath ?
                (
                    <StatementEditorComponent
                        label={selectedNode}
                        config={{ type: selectedNode, model: null }}
                        initialSource={initialSource}
                        applyModifications={applyModifications}
                        currentFile={{
                            content: activeFileInfo?.fullST?.source || "",
                            path: activeFileInfo?.filePath,
                            size: 1
                        }}
                        onCancel={cancelStatementEditor}
                        onClose={closeStatementEditor}
                        syntaxTree={activeFileInfo?.fullST}
                        targetPosition={statementPosition}
                        skipSemicolon={shouldSkipSemicolon(selectedNode)}

                    />
                )
                :
                (<NodeList categories={constructList()} onSelect={handleOnSelectNode} />)
            }
        </PanelContainer>
    );
}

export function shouldSkipSemicolon(nodeId: string) {
    if (nodeId === "If" || nodeId === "While" || nodeId === "Foreach") {
        return true;
    }
}
