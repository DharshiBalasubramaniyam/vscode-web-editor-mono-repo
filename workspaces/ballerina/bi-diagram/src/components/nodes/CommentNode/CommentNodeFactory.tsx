
import React from "react";
import { AbstractReactFactory, GenerateModelEvent, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { CommentNodeModel } from "./CommentNodeModel";
import { CommentNodeWidget } from "./CommentNodeWidget";
import { NodeTypes } from "../../../resources/constants";
import { NodeKind } from "../../../utils/types";

export class CommentNodeFactory extends AbstractReactFactory<CommentNodeModel, DiagramEngine> {
    constructor() {
        super(NodeTypes.COMMENT_NODE);
    }

    generateModel(event: GenerateModelEvent): CommentNodeModel {
        return new CommentNodeModel(event.initialConfig);
    }

    generateReactWidget(event: GenerateWidgetEvent<CommentNodeModel>) {
        return <CommentNodeWidget engine={this.engine} model={event.model} />;
    }
}
