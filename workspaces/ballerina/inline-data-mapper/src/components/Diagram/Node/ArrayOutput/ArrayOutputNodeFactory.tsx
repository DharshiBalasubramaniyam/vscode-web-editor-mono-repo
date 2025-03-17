import * as React from 'react';

import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';

import { InputOutputPortModel } from '../../Port';
import { ARRAY_OUTPUT_TARGET_PORT_PREFIX } from '../../utils/constants';
import { ArrayOutputWidget } from "./ArrayOutputWidget";
import { OutputSearchNoResultFound, SearchNoResultFoundKind } from "../commons/Search";

import { ArrayOutputNode, ARRAY_OUTPUT_NODE_TYPE } from './ArrayOutputNode';

export class ArrayOutputNodeFactory extends AbstractReactFactory<ArrayOutputNode, DiagramEngine> {
	constructor() {
		super(ARRAY_OUTPUT_NODE_TYPE);
	}

	generateReactWidget(event: { model: ArrayOutputNode; }): JSX.Element {
		return (
			<>
				{event.model.hasNoMatchingFields ? (
					<OutputSearchNoResultFound kind={SearchNoResultFoundKind.OutputField} />
				) : (
					<ArrayOutputWidget
						engine={this.engine}
						id={`${ARRAY_OUTPUT_TARGET_PORT_PREFIX}${event.model.rootName ? `.${event.model.rootName}` : ''}`}
						outputType={event.model.outputType}
						typeName={event.model.typeName}
						isBodyArrayLitExpr={event.model.isBodyArrayliteralExpr}
						getPort={(portId: string) => event.model.getPort(portId) as InputOutputPortModel}
						context={event.model.context}
						valueLabel={event.model.outputType.id}
					/>
				)}
			</>
		);
	}

	generateModel(event: { initialConfig: any }): any {
		return undefined;
	}
}
