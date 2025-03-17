
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { NodeLinkModel } from "./NodeLinkModel";
import { NodeLinkWidget } from "./NodeLinkWidget";
import { NODE_LINK } from "../../resources/constants";

export class NodeLinkFactory extends AbstractReactFactory<NodeLinkModel, DiagramEngine> {
    constructor() {
        super(NODE_LINK);
    }

    generateModel(event: GenerateModelEvent): NodeLinkModel {
        return new NodeLinkModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<NodeLinkModel>): JSX.Element {
        return <NodeLinkWidget link={event.model} engine={this.engine} />;
    }
}
