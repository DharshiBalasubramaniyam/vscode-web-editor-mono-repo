
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { NodeTypes } from "../../../resources/constants";
import { NodeKind } from "../../../utils/types";
import { IfNodeModel } from "./IfNodeModel";
import { IfNodeWidget } from "./IfNodeWidget";

export class IfNodeFactory extends AbstractReactFactory<IfNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.IF_NODE);
    }

    generateModel(event: GenerateModelEvent): IfNodeModel {
        return new IfNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<IfNodeModel>) {
        return <IfNodeWidget engine={this.engine} model={event.model} />;
    }
}
