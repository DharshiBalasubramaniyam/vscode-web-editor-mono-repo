import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';

import { INPUT_OUTPUT_PORT } from "./InputOutputPortModel";

export class InputOutputPortFactory extends AbstractModelFactory<PortModel, DiagramEngine> {

	constructor() {
		super(INPUT_OUTPUT_PORT);
	}

	generateModel(): PortModel {
		return undefined;
	}
}
