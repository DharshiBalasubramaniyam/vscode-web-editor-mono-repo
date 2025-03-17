import * as React from 'react';

import { AbstractReactFactory, GenerateWidgetEvent } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams';

import { ExpressionLabelModel } from './ExpressionLabelModel';
import { ExpressionLabelWidget } from './ExpressionLabelWidget';

export class ExpressionLabelFactory extends AbstractReactFactory<ExpressionLabelModel, DiagramEngine> {
	constructor() {
		super('expression-label');
	}

	generateModel(): ExpressionLabelModel {
		return new ExpressionLabelModel();
	}

	generateReactWidget(event: GenerateWidgetEvent<ExpressionLabelModel>): JSX.Element {
		return <ExpressionLabelWidget model={event.model} />;
	}
}
