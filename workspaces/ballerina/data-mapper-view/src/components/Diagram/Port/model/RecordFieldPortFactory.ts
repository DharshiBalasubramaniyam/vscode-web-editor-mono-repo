import { AbstractModelFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine, PortModel } from '@projectstorm/react-diagrams';
import { container, injectable, singleton } from 'tsyringe';

import { FORM_FIELD_PORT } from "./RecordFieldPortModel";

@injectable()
@singleton()
export class RecordFieldPortFactory extends AbstractModelFactory<PortModel, DiagramEngine> {

	constructor() {
		super(FORM_FIELD_PORT);
	}

	generateModel(): PortModel {
		return undefined;
	}
}
container.register("PortFactory", {useClass: RecordFieldPortFactory});
