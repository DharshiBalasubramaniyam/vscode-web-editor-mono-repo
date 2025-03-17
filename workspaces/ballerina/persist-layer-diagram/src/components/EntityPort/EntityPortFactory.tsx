
import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';
import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { EntityPortModel } from './EntityPortModel';

export class EntityPortFactory extends AbstractModelFactory<PortModel, DiagramEngine> {
    constructor() {
        super('entityPort');
    }

    generateModel(event: { initialConfig: any }): EntityPortModel {
        return new EntityPortModel(event.initialConfig.id, event.initialConfig.portType);
    }
}
