// tslint:disable: jsx-no-multiline-js
import React, { useState } from "react";
import { DiagramEngine } from '@projectstorm/react-diagrams';
import { IOType } from "@dharshi/ballerina-core";

import { DataMapperPortWidget, PortState, InputOutputPortModel } from '../../Port';
import { InputSearchHighlight } from './Search';
import { TreeContainer, TreeHeader } from './Tree/Tree';
import { useIONodesStyles } from "../../../styles";
import { getTypeName } from "../../utils/type-utils";

export interface PrimitiveTypeItemWidgetProps {
    id: string; // this will be the root ID used to prepend for UUIDs of nested fields
    dmType: IOType;
    engine: DiagramEngine;
    getPort: (portId: string) => InputOutputPortModel;
    valueLabel?: string;
    nodeHeaderSuffix?: string;
}

export function PrimitiveTypeInputWidget(props: PrimitiveTypeItemWidgetProps) {
    const { engine, dmType, id, getPort, valueLabel, nodeHeaderSuffix } = props;

    const [ portState, setPortState ] = useState<PortState>(PortState.Unselected);
    const classes = useIONodesStyles();

    const typeName = getTypeName(dmType);
    const portOut = getPort(`${id}.OUT`);

    const handlePortState = (state: PortState) => {
        setPortState(state)
    };

    const label = (
        <span style={{ marginRight: "auto" }}>
            <span className={classes.valueLabel}>
                <InputSearchHighlight>{valueLabel ? valueLabel : id}</InputSearchHighlight>
                {typeName && ":"}
            </span>
            {typeName && (
                <span className={classes.inputTypeLabel}>
                    {typeName}
                </span>
            )}

        </span>
    );

    return (
        <TreeContainer data-testid={`${id}-node`}>
            <TreeHeader id={"recordfield-" + id} isSelected={portState !== PortState.Unselected}>
                <span className={classes.label}>
                    {label}
                    <span className={classes.nodeType}>{nodeHeaderSuffix}</span>
                </span>
                <span className={classes.outPort}>
                    {portOut &&
                        <DataMapperPortWidget engine={engine} port={portOut} handlePortState={handlePortState} />
                    }
                </span>
            </TreeHeader>
        </TreeContainer>
    );
}
