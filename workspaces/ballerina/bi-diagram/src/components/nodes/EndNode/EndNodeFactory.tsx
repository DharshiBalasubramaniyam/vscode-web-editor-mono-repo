
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { EndNodeModel } from "./EndNodeModel";
import { EndNodeWidget } from "./EndNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class EndNodeFactory extends AbstractReactFactory<EndNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.END_NODE);
    }

    generateModel(event: GenerateModelEvent): EndNodeModel {
        return new EndNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<EndNodeModel>) {
        return <EndNodeWidget engine={this.engine} node={event.model} />;
    }
}
