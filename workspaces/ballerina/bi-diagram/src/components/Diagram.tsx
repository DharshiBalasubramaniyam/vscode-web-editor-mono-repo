
import React, { useState, useEffect, memo } from "react";
import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
import { cloneDeep } from "lodash";
import { NavigationWrapperCanvasWidget } from "@dharshi/ui-toolkit";

import {
    clearDiagramZoomAndPosition,
    generateEngine,
    hasDiagramZoomAndPosition,
    loadDiagramZoomAndPosition,
    registerListeners,
    resetDiagramZoomAndPosition,
} from "../utils/diagram";
import { DiagramCanvas } from "./DiagramCanvas";
import { Flow, NodeModel, FlowNode, Branch, LineRange, NodePosition } from "../utils/types";
import { traverseFlow } from "../utils/ast";
import { NodeFactoryVisitor } from "../visitors/NodeFactoryVisitor";
import { NodeLinkModel } from "./NodeLink";
import { OverlayLayerModel } from "./OverlayLayer";
import { DiagramContextProvider, DiagramContextState } from "./DiagramContext";
import { SizingVisitor } from "../visitors/SizingVisitor";
import { PositionVisitor } from "../visitors/PositionVisitor";
import { InitVisitor } from "../visitors/InitVisitor";
import { LinkTargetVisitor } from "../visitors/LinkTargetVisitor";
import { NodeTypes } from "../resources/constants";
import Controls from "./Controls";
import { CurrentBreakpointsResponse as BreakpointInfo } from "@dharshi/ballerina-core";
import { BreakpointVisitor } from "../visitors/BreakpointVisitor";
import { BaseNodeModel } from "./nodes/BaseNode";

export interface DiagramProps {
    model: Flow;
    onAddNode?: (parent: FlowNode | Branch, target: LineRange) => void;
    onAddNodePrompt?: (parent: FlowNode | Branch, target: LineRange, prompt: string) => void;
    onDeleteNode?: (node: FlowNode) => void;
    onAddComment?: (comment: string, target: LineRange) => void;
    onNodeSelect?: (node: FlowNode) => void;
    addBreakpoint?: (node: FlowNode) => void;
    removeBreakpoint?: (node: FlowNode) => void;
    onConnectionSelect?: (connectionName: string) => void;
    goToSource?: (node: FlowNode) => void;
    openView?: (filePath: string, position: NodePosition) => void;
    // ai suggestions callbacks
    suggestions?: {
        fetching: boolean;
        onAccept(): void;
        onDiscard(): void;
    };
    projectPath?: string;
    breakpointInfo?: BreakpointInfo;
    readOnly?: boolean;
}

export function Diagram(props: DiagramProps) {
    const {
        model,
        onAddNode,
        onAddNodePrompt,
        onDeleteNode,
        onAddComment,
        onNodeSelect,
        onConnectionSelect,
        goToSource,
        openView,
        suggestions,
        projectPath,
        addBreakpoint,
        removeBreakpoint,
        breakpointInfo,
        readOnly,
    } = props;

    const [showErrorFlow, setShowErrorFlow] = useState(false);
    const [diagramEngine] = useState<DiagramEngine>(generateEngine());
    const [diagramModel, setDiagramModel] = useState<DiagramModel | null>(null);
    const [showComponentPanel, setShowComponentPanel] = useState(false);
    const [expandedErrorHandler, setExpandedErrorHandler] = useState<string | undefined>(undefined);

    useEffect(() => {
        if (diagramEngine) {
            const { nodes, links } = getDiagramData();
            drawDiagram(nodes, links);
        }
    }, [model, showErrorFlow, expandedErrorHandler]);

    useEffect(() => {
        console.log(">>> Init diagram model", model);
        return () => {
            clearDiagramZoomAndPosition();
        };
    }, []);

    const getDiagramData = () => {
        let flowModel = cloneDeep(model);

        const initVisitor = new InitVisitor(flowModel, expandedErrorHandler);
        traverseFlow(flowModel, initVisitor);
        const sizingVisitor = new SizingVisitor();
        traverseFlow(flowModel, sizingVisitor);
        const positionVisitor = new PositionVisitor();
        traverseFlow(flowModel, positionVisitor);
        if (breakpointInfo) {
            const breakpointVisitor = new BreakpointVisitor(breakpointInfo);
            traverseFlow(flowModel, breakpointVisitor);
        }
        // create diagram nodes and links
        const nodeVisitor = new NodeFactoryVisitor();
        traverseFlow(flowModel, nodeVisitor);

        const nodes = nodeVisitor.getNodes();
        const links = nodeVisitor.getLinks();

        const addTargetVisitor = new LinkTargetVisitor(model, nodes);
        traverseFlow(flowModel, addTargetVisitor);
        console.log(">>> getDiagramData", { flowModel, nodes, links });
        return { nodes, links };
    };

    const drawDiagram = (nodes: NodeModel[], links: NodeLinkModel[]) => {
        const newDiagramModel = new DiagramModel();
        newDiagramModel.addLayer(new OverlayLayerModel());
        // add nodes and links to the diagram

        // get code block nodes from nodes
        const codeBlockNodes = nodes.filter((node) => node.getType() === NodeTypes.CODE_BLOCK_NODE);
        // get all other nodes
        const otherNodes = nodes.filter((node) => node.getType() !== NodeTypes.CODE_BLOCK_NODE);

        newDiagramModel.addAll(...codeBlockNodes);
        newDiagramModel.addAll(...otherNodes, ...links);

        diagramEngine.setModel(newDiagramModel);
        setDiagramModel(newDiagramModel);
        registerListeners(diagramEngine);

        diagramEngine.setModel(newDiagramModel);
        // remove loader overlay layer
        const overlayLayer = diagramEngine
            .getModel()
            .getLayers()
            .find((layer) => layer instanceof OverlayLayerModel);
        if (overlayLayer) {
            diagramEngine.getModel().removeLayer(overlayLayer);
        }

        if (nodes.length < 3 || !hasDiagramZoomAndPosition(model.fileName)) {
            resetDiagramZoomAndPosition(model.fileName);
        }
        loadDiagramZoomAndPosition(diagramEngine);

        diagramEngine.repaintCanvas();
        // update the diagram model state
        setDiagramModel(newDiagramModel);
    };

    const handleCloseComponentPanel = () => {
        setShowComponentPanel(false);
    };

    const handleShowComponentPanel = () => {
        setShowComponentPanel(true);
    };

    const toggleDiagramFlow = () => {
        setShowErrorFlow(!showErrorFlow);
    };

    const toggleErrorHandlerExpansion = (nodeId: string) => {
        setExpandedErrorHandler((prev) => (prev === nodeId ? undefined : nodeId));
    };

    const context: DiagramContextState = {
        flow: model,
        componentPanel: {
            visible: showComponentPanel,
            show: handleShowComponentPanel,
            hide: handleCloseComponentPanel,
        },
        showErrorFlow: showErrorFlow,
        expandedErrorHandler: expandedErrorHandler,
        toggleErrorHandlerExpansion: toggleErrorHandlerExpansion,
        onAddNode: onAddNode,
        onAddNodePrompt: onAddNodePrompt,
        onDeleteNode: onDeleteNode,
        onAddComment: onAddComment,
        onNodeSelect: onNodeSelect,
        addBreakpoint: addBreakpoint,
        removeBreakpoint: removeBreakpoint,
        onConnectionSelect: onConnectionSelect,
        goToSource: goToSource,
        openView: openView,
        suggestions: suggestions,
        projectPath: projectPath,
        readOnly: onAddNode === undefined || onDeleteNode === undefined || onNodeSelect === undefined || readOnly,
    };

    const getActiveBreakpointNode = (nodes: NodeModel[]): NodeModel => {
        const node = nodes.find((node) => {
            const isValidType =
                node.getType() === NodeTypes.BASE_NODE ||
                node.getType() === NodeTypes.WHILE_NODE ||
                node.getType() === NodeTypes.IF_NODE ||
                node.getType() === NodeTypes.API_CALL_NODE;
            return isValidType && (node as BaseNodeModel).isActiveBreakpoint();
        });

        return node;
    };

    return (
        <>
            <Controls engine={diagramEngine} />
            {diagramEngine && diagramModel && (
                <DiagramContextProvider value={context}>
                    <DiagramCanvas>
                        <NavigationWrapperCanvasWidget
                            diagramEngine={diagramEngine}
                            focusedNode={getActiveBreakpointNode(diagramModel.getNodes() as NodeModel[])}
                        />
                    </DiagramCanvas>
                </DiagramContextProvider>
            )}
        </>
    );
}

export const MemoizedDiagram = memo(Diagram);
