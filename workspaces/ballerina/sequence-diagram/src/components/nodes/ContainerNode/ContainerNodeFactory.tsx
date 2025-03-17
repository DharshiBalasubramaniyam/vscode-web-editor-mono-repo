
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { ContainerNodeModel } from "./ContainerNodeModel";
import { ContainerNodeWidget } from "./ContainerNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class ContainerNodeFactory extends AbstractReactFactory<ContainerNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.CONTAINER_NODE);
    }

    generateModel(event: GenerateModelEvent): ContainerNodeModel {
        return new ContainerNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<ContainerNodeModel>) {
        return <ContainerNodeWidget engine={this.engine} node={event.model} />;
    }
}
