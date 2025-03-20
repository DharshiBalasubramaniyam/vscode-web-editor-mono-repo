import * as React from 'react';

import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import "reflect-metadata";
import { container, injectable, singleton } from "tsyringe";

import { IDataMapperNodeFactory } from '../commons/DataMapperNode';

import { ExpandedMappingHeaderNode, EXPANDED_MAPPING_HEADER_NODE_TYPE } from './ExpandedMappingHeaderNode';
import { ExpandedMappingHeaderWidget } from "./ExpandedMappingHeaderWidget";

@injectable()
@singleton()
export class ExpandedMappingHeaderNodeFactory extends AbstractReactFactory<ExpandedMappingHeaderNode, DiagramEngine> implements IDataMapperNodeFactory {
    constructor() {
        super(EXPANDED_MAPPING_HEADER_NODE_TYPE);
    }

    generateReactWidget(event: { model: ExpandedMappingHeaderNode; }): JSX.Element {
        return (
            <ExpandedMappingHeaderWidget
                node={event.model}
                title={`Query: ${event.model.queryExpr.queryPipeline.fromClause.expression.source}`}
                engine={this.engine}
                port={event.model.getPort(EXPANDED_MAPPING_HEADER_NODE_TYPE)}
            />
        );
    }

    generateModel(): ExpandedMappingHeaderNode {
        return undefined;
    }
}

container.register("NodeFactory", { useClass: ExpandedMappingHeaderNodeFactory });
