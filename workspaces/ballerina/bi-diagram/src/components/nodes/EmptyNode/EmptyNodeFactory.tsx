
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { EmptyNodeModel } from "./EmptyNodeModel";
import { EmptyNodeWidget } from "./EmptyNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class EmptyNodeFactory extends AbstractReactFactory<EmptyNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.EMPTY_NODE);
    }

    generateModel(event: GenerateModelEvent): EmptyNodeModel {
        return new EmptyNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<EmptyNodeModel>) {
        return <EmptyNodeWidget engine={this.engine} node={event.model} />;
    }
}
