
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { ListenerNodeModel } from "./ListenerNodeModel";
import { ListenerNodeWidget } from "./ListenerNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class ListenerNodeFactory extends AbstractReactFactory<ListenerNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.LISTENER_NODE);
    }

    generateModel(event: GenerateModelEvent): ListenerNodeModel {
        return new ListenerNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<ListenerNodeModel>) {
        return (
            <ListenerNodeWidget engine={this.engine} model={event.model} />
        );
    }
}
