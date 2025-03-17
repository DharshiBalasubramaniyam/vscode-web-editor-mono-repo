
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { ApiCallNodeModel } from "./ApiCallNodeModel";
import { ApiCallNodeWidget } from "./ApiCallNodeWidget";
import { NodeTypes } from "../../../resources/constants";
import { NodeKind } from "../../../utils/types";

export class ApiCallNodeFactory extends AbstractReactFactory<ApiCallNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.API_CALL_NODE);
    }

    generateModel(event: GenerateModelEvent): ApiCallNodeModel {
        return new ApiCallNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<ApiCallNodeModel>) {
        return <ApiCallNodeWidget engine={this.engine} model={event.model} />;
    }
}
