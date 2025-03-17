
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { AgentCallNodeModel } from "./AgentCallNodeModel";
import { AgentCallNodeWidget } from "./AgentCallNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class AgentCallNodeFactory extends AbstractReactFactory<AgentCallNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.AGENT_CALL_NODE);
    }

    generateModel(event: GenerateModelEvent): AgentCallNodeModel {
        return new AgentCallNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<AgentCallNodeModel>) {
        return <AgentCallNodeWidget engine={this.engine} model={event.model} />;
    }
}
