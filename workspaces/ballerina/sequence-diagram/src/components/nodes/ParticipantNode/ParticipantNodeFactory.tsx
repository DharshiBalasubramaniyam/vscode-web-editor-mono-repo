
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { ParticipantNodeModel } from "./ParticipantNodeModel";
import { ParticipantNodeWidget } from "./ParticipantNodeWidget";
import { NodeTypes } from "../../../resources/constants";

export class ParticipantNodeFactory extends AbstractReactFactory<ParticipantNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.PARTICIPANT_NODE);
    }

    generateModel(event: GenerateModelEvent): ParticipantNodeModel {
        return new ParticipantNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<ParticipantNodeModel>) {
        return <ParticipantNodeWidget engine={this.engine} node={event.model} />;
    }
}
