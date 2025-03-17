
import React from 'react';
import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { EntityModel } from './EntityModel';
import { EntityWidget } from './EntityWidget';

export class EntityFactory extends AbstractReactFactory<EntityModel, DiagramEngine> {
    constructor() {
        super('entityNode');
    }

    generateReactWidget(event: { model: EntityModel }): JSX.Element {
        return <EntityWidget engine={this.engine} node={event.model} />;
    }

    generateModel(event: { initialConfig: any }) {
        return new EntityModel(event.initialConfig.key, event.initialConfig.entity);
    }
}
