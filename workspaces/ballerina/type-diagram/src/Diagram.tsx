import React, { useEffect, useState } from 'react';
import { DiagramEngine, DiagramModel } from '@projectstorm/react-diagrams';
import { NavigationWrapperCanvasWidget, ProgressRing, ThemeColors } from '@dharshi/ui-toolkit';
import { createEntitiesEngine, entityModeller } from './utils';

import { DiagramContainer, useStyles } from './utils/CanvasStyles';

import './resources/assets/font/fonts.css';

import { dagreEngine } from './resources/constants';
import { DesignDiagramContext } from './components/common';
import { DiagramControls } from './components/Controls/DiagramControls';
import { OverlayLayerModel } from './components/OverlayLoader';
import { Type } from '@dharshi/ballerina-core';
import { focusToNode } from './utils/utils';
import { graphqlModeller } from './utils/model-mapper/entityModelMapper';

interface TypeDiagramProps {
    typeModel: Type[];
    rootService?: Type;
    isGraphql?: boolean;
    selectedNodeId?: string;
    focusedNodeId?: string;
    updateFocusedNodeId?: (nodeId: string) => void;
    refreshDiagram?: boolean;
    setRefreshDiagram?: (r: boolean) => void
    showProblemPanel?: () => void;
    goToSource: (node: Type) => void
    onTypeEdit: (typeId: string, isGraphqlRoot?: boolean) => void;
}

export function TypeDiagram(props: TypeDiagramProps) {
    const { typeModel, showProblemPanel, selectedNodeId, goToSource, focusedNodeId, updateFocusedNodeId, rootService, isGraphql } = props;

    const [diagramEngine] = useState<DiagramEngine>(createEntitiesEngine());
    const [diagramModel, setDiagramModel] = useState<DiagramModel>(undefined);
    const [hasDiagnostics, setHasDiagnostics] = useState<boolean>(false);
    const [selectedDiagramNode, setSelectedDiagramNode] = useState<string>(selectedNodeId);

    useEffect(() => {
        drawDiagram(focusedNodeId);
    }, [typeModel, focusedNodeId, rootService]);

    useEffect(() => {
        setSelectedDiagramNode(selectedNodeId);
    }, [selectedNodeId]);

    const drawDiagram = (focusedNode?: string) => {
        let diagramModel;
        
        // Create diagram model based on type
        if (isGraphql && rootService) {
            console.log("Modeling  graphql diagram");
            diagramModel = graphqlModeller(rootService, typeModel);
        } else if (typeModel && !isGraphql) {
            console.log("Modeling entity diagram");
            diagramModel = entityModeller(typeModel, focusedNode);
        }
    
        if (diagramModel) {
            // Setup initial model
            diagramModel.addLayer(new OverlayLayerModel());
            diagramEngine.setModel(diagramModel);
            setDiagramModel(diagramModel);
    
            // Layout and focus handling
            setTimeout(() => {
                dagreEngine.redistribute(diagramEngine.getModel());
    
                if (selectedNodeId) {
                    const selectedModel = diagramEngine.getModel().getNode(selectedNodeId);
                    focusToNode(selectedModel, diagramEngine.getModel().getZoomLevel(), diagramEngine);
                } else if (diagramEngine?.getCanvas()?.getBoundingClientRect) {
                    diagramEngine.zoomToFitNodes({ margin: 10, maxZoom: 1 });
                }
    
                // Cleanup and refresh
                diagramEngine.getModel().removeLayer(
                    diagramEngine.getModel().getLayers().find(layer => layer instanceof OverlayLayerModel)
                );
                diagramEngine.setModel(diagramModel);
                diagramEngine.repaintCanvas();
            }, 300);
        }
    }

    // const defaultOrg = useRef<string>('');

    const styles = useStyles();

    const onTypeEdit = (typeId: string, isGraphqlRoot?: boolean) => {
        console.log("Editing type: ", typeId, isGraphqlRoot);
        // setSelectedNodeId(typeId);
        props.onTypeEdit(typeId, isGraphqlRoot);
    }

    const updateSelectionOnDiagram = (nodeId: string) => {
        setSelectedDiagramNode(nodeId);
    }

    let ctx = {
        selectedNodeId: selectedDiagramNode,
        setSelectedNodeId: updateSelectionOnDiagram,
        setHasDiagnostics,
        hasDiagnostics,
        focusedNodeId,
        setFocusedNodeId: updateFocusedNodeId,
        onEditNode: onTypeEdit,
        goToSource
    }

    const refreshDiagram = () => {
        drawDiagram(focusedNodeId);
    };

    return (
        <DesignDiagramContext {...ctx}>
            {diagramEngine?.getModel() && diagramModel ?
                <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
                    <DiagramContainer>
                        <NavigationWrapperCanvasWidget
                            diagramEngine={diagramEngine}
                            className={styles.canvas}
                            focusedNode={diagramEngine?.getModel()?.getNode(selectedDiagramNode)}
                        />
                    </DiagramContainer>
                    <DiagramControls
                        engine={diagramEngine}
                        refreshDiagram={refreshDiagram}
                        showProblemPanel={showProblemPanel}
                    />
                </div> :
                <ProgressRing sx={{ color: ThemeColors.PRIMARY }} />
            }
        </DesignDiagramContext>
    );
}
