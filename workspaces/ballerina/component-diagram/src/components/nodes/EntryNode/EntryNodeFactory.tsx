
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { EntryNodeModel } from "./EntryNodeModel";
import { EntryNodeWidget } from "./EntryNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class EntryNodeFactory extends AbstractReactFactory<EntryNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.ENTRY_NODE);
    }

    generateModel(event: GenerateModelEvent): EntryNodeModel {
        return new EntryNodeModel(event.initialConfig, event.initialConfig.type);
    }

    generateReactWidget(event: GenerateWidgetEvent<EntryNodeModel>) {
        return (
            <EntryNodeWidget engine={this.engine} model={event.model} />
        );
    }
}
