
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { DraftNodeModel } from "./DraftNodeModel";
import { DraftNodeWidget } from "./DraftNodeWidget";
import { NodeTypes } from "../../../resources/constants";
import { NodeKind } from "../../../utils/types";

export class DraftNodeFactory extends AbstractReactFactory<DraftNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.DRAFT_NODE);
    }

    generateModel(event: GenerateModelEvent): DraftNodeModel {
        return new DraftNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<DraftNodeModel>) {
        return <DraftNodeWidget engine={this.engine} model={event.model} />;
    }
}
