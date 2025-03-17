import React from "react";
import { AbstractReactFactory, GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DiagramEngine } from "@projectstorm/react-diagrams";

import { OverlayLayerModel } from "./OverlayLayerModel";
import { OverlayLayerWidget } from "./OverlayLayerWidget";
import { LOADING_OVERLAY } from "../../resources/constants";

export class OverlayLayerFactory extends AbstractReactFactory<OverlayLayerModel, DiagramEngine> {
    constructor() {
        super(LOADING_OVERLAY);
    }

    generateModel(): OverlayLayerModel {
        return new OverlayLayerModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<OverlayLayerModel>): JSX.Element {
        return <OverlayLayerWidget layer={event.model} engine={this.engine} />;
    }
}
