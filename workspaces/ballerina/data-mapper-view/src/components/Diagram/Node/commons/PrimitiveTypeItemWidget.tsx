// tslint:disable: jsx-no-multiline-js
import React, { useState } from "react";

import { DiagramEngine, PortWidget } from '@projectstorm/react-diagrams';
import { TypeField } from "@dharshi/ballerina-core";

import { DataMapperPortWidget, PortState, RecordFieldPortModel } from '../../Port';
import { EXPANDED_QUERY_INPUT_NODE_PREFIX } from '../../utils/constants';
import { getTypeName } from "../../utils/dm-utils";

import { InputSearchHighlight } from './Search';
import { TreeContainer, TreeHeader } from './Tree/Tree';
import { useIONodesStyles } from "../../../styles";

export interface RecordTypeTreeWidgetProps {
    id: string; // this will be the root ID used to prepend for UUIDs of nested fields
    typeDesc: TypeField;
    engine: DiagramEngine;
    getPort: (portId: string) => RecordFieldPortModel;
    valueLabel?: string;
    nodeHeaderSuffix?: string;
}

export function PrimitiveTypeItemWidget(props: RecordTypeTreeWidgetProps) {
    const { engine, typeDesc, id, getPort, valueLabel, nodeHeaderSuffix } = props;
    const classes = useIONodesStyles();

    const [ portState, setPortState ] = useState<PortState>(PortState.Unselected);

    const typeName = getTypeName(typeDesc);

    const portIn = getPort(`${id}.IN`);
    const portOut = getPort(`${id}.OUT`);

    let expanded = true;
    if ((portIn && portIn.collapsed) || (portOut && portOut.collapsed)) {
        expanded = false;
    }

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

    /** Invisible port to which the right angle link from the query header/clauses are connected to */
    const invisiblePort = getPort(`${EXPANDED_QUERY_INPUT_NODE_PREFIX}.${valueLabel}`);

    const handlePortState = (state: PortState) => {
        setPortState(state)
    };

    return (
        <TreeContainer data-testid={`${id}-node`}>
            <div className={classes.queryPortWrap}>
                {invisiblePort && <PortWidget port={invisiblePort} engine={engine} />}
            </div>
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
