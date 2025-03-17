
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { ButtonNodeModel } from "./ButtonNodeModel";
import { ButtonNodeWidget } from "./ButtonNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class ButtonNodeFactory extends AbstractReactFactory<ButtonNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.BUTTON_NODE);
    }

    generateModel(event: GenerateModelEvent): ButtonNodeModel {
        return new ButtonNodeModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<ButtonNodeModel>) {
        return <ButtonNodeWidget engine={this.engine} model={event.model} />;
    }
}
