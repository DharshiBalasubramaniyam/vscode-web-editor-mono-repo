
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { StartNodeModel } from "./StartNodeModel";
import { StartNodeWidget } from "./StartNodeWidget";
import { NodeTypes } from "../../../resources/constants";
import { NodeKind } from "../../../utils/types";

export class StartNodeFactory extends AbstractReactFactory<StartNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.START_NODE);
    }

    generateModel(event: GenerateModelEvent): StartNodeModel {
        return new StartNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<StartNodeModel>) {
        return <StartNodeWidget engine={this.engine} model={event.model} />;
    }
}
