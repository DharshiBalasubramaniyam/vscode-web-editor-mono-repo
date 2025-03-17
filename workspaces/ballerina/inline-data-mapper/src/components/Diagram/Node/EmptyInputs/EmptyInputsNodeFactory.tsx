// tslint:disable: jsx-no-multiline-js
import * as React from 'react';

import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

import { EmptyInputsNode, EMPTY_INPUTS_NODE_TYPE } from './EmptyInputsNode';
import { EmptyInputsWidget } from "./EmptyInputsNodeWidget";

export class EmptyInputsNodeFactory extends AbstractReactFactory<EmptyInputsNode, DiagramEngine> {
	constructor() {
		super(EMPTY_INPUTS_NODE_TYPE);
	}

	generateReactWidget(event: { model: EmptyInputsNode; }): JSX.Element {
		return <EmptyInputsWidget />;
	}

	generateModel(): EmptyInputsNode {
		return undefined;
	}
}
