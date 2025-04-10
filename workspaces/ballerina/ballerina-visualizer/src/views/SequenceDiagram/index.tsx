
import React, { useEffect, useState } from "react";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
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
import styled from "@emotion/styled";
import { PanelType, useVisualizerContext } from "../../Context";
import { ComponentInfo, ConnectorInfo, removeStatement, STModification } from "@dharshi/ballerina-core";
import { URI } from "vscode-uri";
// import { fetchConnectorInfo, retrieveUsedAction } from "../Connectors/ConnectorWizard/utils";

enum MESSAGE_TYPE {
    ERROR,
    WARNING,
    INFO,
}

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 50px);
`;

const MessageContainer = styled.div({
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
});

interface SequenceDiagramProps {
    syntaxTree: STNode;
    applyModifications: (modifications: STModification[]) => void;
}

export function SequenceDiagram(props: SequenceDiagramProps) {
    const { syntaxTree, applyModifications } = props;
    const { rpcClient } = useRpcContext();
    const { setStatementPosition, setActivePanel, setComponentInfo, setActiveFileInfo, activeFileInfo } = useVisualizerContext();

    useEffect(() => {
        getSequenceModel();
    }, [syntaxTree]);

    const getSequenceModel = () => {
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
            });
    };

    // TODO: Refactor this function
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

    const handleAddComponent = (position: NodePosition) => {
        setStatementPosition(position);
        setActivePanel({ isActive: true, name: PanelType.CONSTRUCTPANEL });
    }

    const handleEditComponent = async (model: STNode, targetPosition: NodePosition, componentType: string, connectorInfo?: ConnectorInfo) => {
        console.log("edit component: ", {
            "model": model, "position": targetPosition,
            "compoenentTypes": componentType, 
            "connectorInfo": connectorInfo
        })
        setStatementPosition(targetPosition);
        setComponentInfo({ model, position: targetPosition, componentType, connectorInfo });
        setActivePanel({ isActive: true, name: PanelType.STATEMENTEDITOR });
    }

    const handleDeleteComponent = (model: STNode) => {
        const modifications: STModification[] = [];

        // delete action
        if (STKindChecker.isIfElseStatement(model) && !model.viewState.isMainIfBody) {
            const ifElseRemovePosition = model.position;
            ifElseRemovePosition.endLine = model.elseBody.elseBody.position.startLine;
            ifElseRemovePosition.endColumn = model.elseBody.elseBody.position.startColumn;

            const deleteConfig: STModification = removeStatement(ifElseRemovePosition);
            modifications.push(deleteConfig);
            applyModifications(modifications);
        } else {
            const deleteAction: STModification = removeStatement(
                model.position
            );
            modifications.push(deleteAction);
            applyModifications(modifications);
        }
    }

    return (
        <>
            <Container>{!!activeFileInfo?.activeSequence &&
                <LowCodeDiagram syntaxTree={activeFileInfo?.activeSequence} stSymbolInfo={getSymbolInfo()} isReadOnly={false} onAddComponent={handleAddComponent} onEditComponent={handleEditComponent} onDeleteComponent={handleDeleteComponent} />
            }</Container>
        </>
    );
}
