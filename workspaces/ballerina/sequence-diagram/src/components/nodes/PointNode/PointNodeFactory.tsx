
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { PointNodeModel } from "./PointNodeModel";
import { PointNodeWidget } from "./PointNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class PointNodeFactory extends AbstractReactFactory<PointNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.POINT_NODE);
    }

    generateModel(event: GenerateModelEvent): PointNodeModel {
        return new PointNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<PointNodeModel>) {
        return <PointNodeWidget engine={this.engine} node={event.model} />;
    }
}
