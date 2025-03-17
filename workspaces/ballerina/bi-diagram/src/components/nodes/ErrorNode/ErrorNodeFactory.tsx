
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { NodeTypes } from "../../../resources/constants";
import { NodeKind } from "../../../utils/types";
import { ErrorNodeModel } from "./ErrorNodeModel";
import { ErrorNodeWidget } from "./ErrorNodeWidget";

export class ErrorNodeFactory extends AbstractReactFactory<ErrorNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.ERROR_NODE);
    }

    generateModel(event: GenerateModelEvent): ErrorNodeModel {
        return new ErrorNodeModel(event.initialConfig, event.initialConfig.branch);
    }

    generateReactWidget(event: GenerateWidgetEvent<ErrorNodeModel>) {
        switch (event.model.node.codedata.node as NodeKind) {
            default:
                return (
                    <ErrorNodeWidget engine={this.engine} model={event.model} />
                );
        }
    }
}
