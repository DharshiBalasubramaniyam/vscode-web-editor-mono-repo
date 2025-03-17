// tslint:disable: jsx-no-lambda jsx-no-multiline-js
import * as React from 'react';

import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { STKindChecker, STNode } from '@dharshi/syntax-tree';
import "reflect-metadata";
import { container, injectable, singleton } from "tsyringe";

import { RecordFieldPortModel } from '../../Port';
import { FUNCTION_BODY_QUERY, PRIMITIVE_TYPE_TARGET_PORT_PREFIX } from "../../utils/constants";
import { PrimitiveTypeOutputWidget } from "../commons/DataManipulationWidget/PrimitiveTypeOutputWidget";
import { IDataMapperNodeFactory } from '../commons/DataMapperNode';
import { OutputSearchNoResultFound, SearchNoResultFoundKind } from "../commons/Search";

import { PrimitiveTypeNode, PRIMITIVE_TYPE_NODE_TYPE } from './PrimitiveTypeNode';

@injectable()
@singleton()
export class PrimitiveTypeNodeFactory extends AbstractReactFactory<PrimitiveTypeNode, DiagramEngine> implements IDataMapperNodeFactory {
	constructor() {
		super(PRIMITIVE_TYPE_NODE_TYPE);
	}

	generateReactWidget(event: { model: PrimitiveTypeNode; }): JSX.Element {
		let valueLabel: string;
		if (STKindChecker.isSelectClause(event.model.value)
			&& event.model.context.selection.selectedST.fieldPath !== FUNCTION_BODY_QUERY)
		{
			valueLabel = event.model.typeIdentifier.value as string || event.model.typeIdentifier.source;
		}
		return (
			<>
				{event.model.hasNoMatchingFields ? (
					<OutputSearchNoResultFound kind={SearchNoResultFoundKind.OutputValue} />
				) : (
					<PrimitiveTypeOutputWidget
						id={PRIMITIVE_TYPE_TARGET_PORT_PREFIX}
						engine={this.engine}
						field={event.model.recordField}
						getPort={(portId: string) => event.model.getPort(portId) as RecordFieldPortModel}
						context={event.model.context}
						typeName={event.model.typeName}
						valueLabel={valueLabel}
						deleteField={(node: STNode) => event.model.deleteField(node)}
					/>
				)}
			</>
		);
	}

	generateModel(): PrimitiveTypeNode {
		return undefined;
	}
}
container.register("NodeFactory", { useClass: PrimitiveTypeNodeFactory });
