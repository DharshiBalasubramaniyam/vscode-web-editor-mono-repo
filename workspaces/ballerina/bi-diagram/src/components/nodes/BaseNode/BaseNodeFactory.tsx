
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { BaseNodeModel } from "./BaseNodeModel";
import { NodeTypes } from "../../../resources/constants";
import { BaseNodeWidget } from "./BaseNodeWidget";

export class BaseNodeFactory extends AbstractReactFactory<BaseNodeModel, DiagramEngine> {

    constructor() {
        super(NodeTypes.BASE_NODE);
    }

    generateModel(event: GenerateModelEvent): BaseNodeModel {
        return new BaseNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<BaseNodeModel>) {
        return <BaseNodeWidget engine={this.engine} model={event.model} />;
    }
}
