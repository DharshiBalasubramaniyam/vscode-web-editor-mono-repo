
import React from 'react';
import { DefaultLinkFactory } from '@projectstorm/react-diagrams';
import { EntityLinkModel } from './EntityLinkModel';
import { EntityLinkWidget } from './EntityLinkWidget';

export class EntityLinkFactory extends DefaultLinkFactory {
	constructor() {
		super('entityLink');
	}

	generateModel(event: { initialConfig: any }): EntityLinkModel {
		return new EntityLinkModel(event.initialConfig.cardinality);
	}

	generateReactWidget(props: { model: EntityLinkModel }): JSX.Element {
		return <EntityLinkWidget link={props.model} engine={this.engine} />;
	}
}
