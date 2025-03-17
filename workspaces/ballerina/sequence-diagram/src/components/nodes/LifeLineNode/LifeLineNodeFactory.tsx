
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { LifeLineNodeModel } from "./LifeLineNodeModel";
import { LifeLineNodeWidget } from "./LifeLineNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class LifeLineNodeFactory extends AbstractReactFactory<LifeLineNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.LIFE_LINE_NODE);
    }

    generateModel(event: GenerateModelEvent): LifeLineNodeModel {
        return new LifeLineNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<LifeLineNodeModel>) {
        return <LifeLineNodeWidget engine={this.engine} node={event.model} />;
    }
}
