// tslint:disable: jsx-no-multiline-js jsx-no-lambda
import * as React from 'react';

import { AbstractReactFactory } from '@projectstorm/react-canvas-core';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import "reflect-metadata";
import { container, injectable, singleton } from "tsyringe";

import { RecordFieldPortModel } from '../../Port';
import { IDataMapperNodeFactory } from '../commons/DataMapperNode';
import { InputSearchNoResultFound, SearchNoResultFoundKind } from "../commons/Search";

import { ModuleVariableNode, MODULE_VAR_SOURCE_NODE_TYPE } from "./ModuleVariableNode";
import { ModuleVariableTreeWidget } from "./ModuleVariableTreeWidget";

@injectable()
@singleton()
export class ModuleVariableNodeFactory extends AbstractReactFactory<ModuleVariableNode, DiagramEngine> implements IDataMapperNodeFactory {
    constructor() {
        super(MODULE_VAR_SOURCE_NODE_TYPE);
    }

    generateReactWidget(event: { model: ModuleVariableNode; }): JSX.Element {
        return (
            <>
                {event.model.hasNoMatchingFields ? (
                    <InputSearchNoResultFound kind={SearchNoResultFoundKind.ModuleVariable}/>
                ) : (
                    <ModuleVariableTreeWidget
                        engine={this.engine}
                        moduleVariables={event.model.moduleVarDecls}
                        context={event.model.context}
                        getPort={(portId: string) => event.model.getPort(portId) as RecordFieldPortModel}
                        handleCollapse={(fieldName: string, expand?: boolean) => event.model.context.handleCollapse(fieldName, expand)}
                    />
                )}
            </>
        );
    }

    generateModel(): ModuleVariableNode {
        return undefined;
    }
}

container.register("NodeFactory", { useClass: ModuleVariableNodeFactory });
