
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { NodePortModel } from "./NodePortModel";
import { NodePortWidget } from "./NodePortWidget";
import { NODE_PORT } from "../../resources/constants";

export class NodePortFactory extends AbstractReactFactory<NodePortModel, DiagramEngine> {
    constructor() {
        super(NODE_PORT);
    }

    generateModel(event: GenerateModelEvent): NodePortModel {
        return new NodePortModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<NodePortModel>): JSX.Element {
        return <NodePortWidget engine={this.engine} port={event.model} />;
    }
}
