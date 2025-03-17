
import React from 'react';

import { AbstractReactFactory } from "@projectstorm/react-canvas-core";
import { DataImportNodeModel } from "./DataImportNode";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { DATA_IMPORT_NODE } from "./DataImportNode";
import { DataImportNodeWidget } from "./DataImportNodeWidget";

export class DataImportNodeFactory extends AbstractReactFactory<DataImportNodeModel, DiagramEngine> {
    constructor() {
        super(DATA_IMPORT_NODE);
    }

    generateReactWidget(event: { model: DataImportNodeModel; }): JSX.Element {
        return (
            <DataImportNodeWidget configName={event.model.configName} ioType={event.model.ioType}/>
        );
    }

    generateModel(): DataImportNodeModel {
        return new DataImportNodeModel();
    }
}
