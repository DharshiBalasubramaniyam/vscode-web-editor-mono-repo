
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { ConnectionNodeModel } from "./ConnectionNodeModel";
import { ConnectionNodeWidget } from "./ConnectionNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class ConnectionNodeFactory extends AbstractReactFactory<ConnectionNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.CONNECTION_NODE);
    }

    generateModel(event: GenerateModelEvent): ConnectionNodeModel {
        return new ConnectionNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<ConnectionNodeModel>) {
        return (
            <ConnectionNodeWidget engine={this.engine} model={event.model} />
        );
    }
}
