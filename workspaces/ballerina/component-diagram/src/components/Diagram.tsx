
import React, { useState, useEffect } from "react";
import { DiagramEngine, DiagramModel } from "@projectstorm/react-diagrams";
import { CanvasWidget } from "@projectstorm/react-canvas-core";
import {
    autoDistribute,
    calculateEntryNodeHeight,
    createNodesLink,
    createPortNodeLink,
    generateEngine,
    sortItems,
} from "../utils/diagram";
import { DiagramCanvas } from "./DiagramCanvas";
import { NodeModel } from "../utils/types";
import { NodeLinkModel } from "./NodeLink";
import { OverlayLayerModel } from "./OverlayLayer";
import { DiagramContextProvider, DiagramContextState } from "./DiagramContext";
import Controls from "./Controls";
import {
    CDAutomation,
    CDConnection,
    CDFunction,
    CDListener,
    CDModel,
    CDService,
    CDResourceFunction,
} from "@dharshi/ballerina-core";
import { EntryNodeModel } from "./nodes/EntryNode";
import { ListenerNodeModel } from "./nodes/ListenerNode";
import { ConnectionNodeModel } from "./nodes/ConnectionNode";

export interface DiagramProps {
    project: CDModel;
    onListenerSelect: (listener: CDListener) => void;
    onServiceSelect: (service: CDService) => void;
    onFunctionSelect: (func: CDFunction | CDResourceFunction) => void;
    onAutomationSelect: (automation: CDAutomation) => void;
    onConnectionSelect: (connection: CDConnection) => void;
    onDeleteComponent: (component: CDListener | CDService | CDAutomation | CDConnection) => void;
}

export function Diagram(props: DiagramProps) {
    const {
        project,
        onListenerSelect,
        onServiceSelect,
        onFunctionSelect,
        onAutomationSelect,
        onConnectionSelect,
        onDeleteComponent,
    } = props;
    const [diagramEngine] = useState<DiagramEngine>(generateEngine());
    const [diagramModel, setDiagramModel] = useState<DiagramModel | null>(null);
    const [showControls, setShowControls] = useState(false);

    useEffect(() => {
        if (diagramEngine) {
            const { nodes, links } = getDiagramData();
            drawDiagram(nodes, links);
            autoDistribute(diagramEngine);
        }
    }, [project]);

    useEffect(() => {
        const handleResize = () => {
            if (diagramEngine?.getCanvas()?.getBoundingClientRect) {
                diagramEngine.zoomToFitNodes({ margin: 40, maxZoom: 1 });
                diagramEngine.repaintCanvas();
            }
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [diagramEngine, diagramModel]);

    const getDiagramData = () => {
        const nodes: NodeModel[] = [];
        const links: NodeLinkModel[] = [];

        // Sort and create connections
        const sortedConnections = sortItems(project.connections || []) as CDConnection[];
        sortedConnections.forEach((connection, index) => {
            const node = new ConnectionNodeModel(connection);
            // Set initial Y position for connections
            node.setPosition(0, 100 + index * 100);
            nodes.push(node);
        });

        let startY = 100;

        // Sort services by sortText before creating nodes
        const sortedServices = sortItems(project.services || []) as CDService[];
        sortedServices.forEach((service, index) => {
            // Calculate height based on number of functions
            const numFunctions = service.remoteFunctions.length + service.resourceFunctions.length;
            const nodeHeight = calculateEntryNodeHeight(numFunctions);

            // Create entry node with calculated height
            const node = new EntryNodeModel(service, "service");
            node.height = nodeHeight;
            node.setPosition(0, startY);
            nodes.push(node);

            startY += nodeHeight + 16;

            // create function connections
            service.remoteFunctions?.forEach((func) => {
                func.connections?.forEach((connectionUuid) => {
                    console.log(">>> remoteservice con", { func, connectionUuid });
                    const connectionNode = nodes.find((node) => node.getID() === connectionUuid);
                    if (connectionNode) {
                        const port = node.getFunctionPort(func);
                        if (port) {
                            const link = createPortNodeLink(port, connectionNode);
                            if (link) {
                                links.push(link);
                            }
                        }
                    }
                });
            });

            // create resource function connections
            service.resourceFunctions?.forEach((func) => {
                func.connections?.forEach((connectionUuid) => {
                    const connectionNode = nodes.find((node) => node.getID() === connectionUuid);
                    console.log(">>> resource service con", { func, connectionUuid, connectionNode });
                    if (connectionNode) {
                        const port = node.getFunctionPort(func);
                        console.log(">>> resource service con port", { port });
                        if (port) {
                            const link = createPortNodeLink(port, connectionNode);
                            if (link) {
                                links.push(link);
                            }
                        }
                    }
                });
            });
        });

        // create automation
        const automation = project.automation;
        if (automation) {
            const automationNode = new EntryNodeModel(automation, "automation");
            nodes.push(automationNode);
            // link connections
            automation.connections.forEach((connectionUuid) => {
                const connectionNode = nodes.find((node) => node.getID() === connectionUuid);
                if (connectionNode) {
                    const link = createNodesLink(automationNode, connectionNode);
                    if (link) {
                        links.push(link);
                    }
                }
            });
        }

        // create listeners
        project.listeners?.forEach((listener) => {
            const node = new ListenerNodeModel(listener);
            nodes.push(node);
            // link services
            listener.attachedServices.forEach((serviceUuid) => {
                const serviceNode = nodes.find((node) => node.getID() === serviceUuid);
                if (serviceNode) {
                    const link = createNodesLink(node, serviceNode);
                    if (link) {
                        links.push(link);
                    }
                }
            });
        });

        return { nodes, links };
    };

    const drawDiagram = (nodes: NodeModel[], links: NodeLinkModel[]) => {
        const newDiagramModel = new DiagramModel();
        newDiagramModel.addLayer(new OverlayLayerModel());
        // add nodes and links to the diagram
        newDiagramModel.addAll(...nodes, ...links);

        diagramEngine.setModel(newDiagramModel);
        setDiagramModel(newDiagramModel);
        // registerListeners(diagramEngine);

        diagramEngine.setModel(newDiagramModel);

        // diagram paint with timeout
        setTimeout(() => {
            // remove loader overlay layer
            const overlayLayer = diagramEngine
                .getModel()
                .getLayers()
                .find((layer) => layer instanceof OverlayLayerModel);
            if (overlayLayer) {
                diagramEngine.getModel().removeLayer(overlayLayer);
            }
            if (diagramEngine?.getCanvas()?.getBoundingClientRect) {
                diagramEngine.zoomToFitNodes({ margin: 40, maxZoom: 1 });
            }
            diagramEngine.repaintCanvas();
        }, 200);
    };

    const context: DiagramContextState = {
        project,
        onListenerSelect,
        onServiceSelect,
        onFunctionSelect,
        onAutomationSelect,
        onConnectionSelect,
        onDeleteComponent,
    };

    return (
        <>
            <Controls engine={diagramEngine} />

            {diagramEngine && diagramModel && (
                <DiagramContextProvider value={context}>
                    <DiagramCanvas
                        onMouseEnter={() => setShowControls(true)}
                        onMouseLeave={() => setShowControls(false)}
                    >
                        <CanvasWidget engine={diagramEngine} />
                    </DiagramCanvas>
                </DiagramContextProvider>
            )}
        </>
    );
}
