
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { NodeTypes } from "../../../resources/constants";
import { NodeKind } from "../../../utils/types";
import { WhileNodeModel } from "./WhileNodeModel";
import { WhileNodeWidget } from "./WhileNodeWidget";

export class WhileNodeFactory extends AbstractReactFactory<WhileNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.WHILE_NODE);
    }

    generateModel(event: GenerateModelEvent): WhileNodeModel {
        return new WhileNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<WhileNodeModel>) {
        switch (event.model.node.codedata.node as NodeKind) {
            default:
                return (
                    <WhileNodeWidget engine={this.engine} model={event.model} />
                );
        }
    }
}
