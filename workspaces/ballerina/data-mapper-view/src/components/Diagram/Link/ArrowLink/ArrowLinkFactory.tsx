import React from "react";

import { GenerateWidgetEvent } from "@projectstorm/react-canvas-core";
import { DefaultLinkFactory } from "@projectstorm/react-diagrams";

import { ArrowLinkModel } from "./ArrowLinkModel";
import { ArrowLinkWidget } from "./ArrowLinkWidget";

export class ArrowLinkFactory extends DefaultLinkFactory {
    constructor() {
        super('arrow');
    }

    generateModel() {
        return new ArrowLinkModel();
    }

    generateReactWidget(event: GenerateWidgetEvent<ArrowLinkModel>): JSX.Element {
        return <ArrowLinkWidget link={event.model} />;
    }
}
