import React from "react";

import { TableTypeDesc } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface TableTypeDescProps {
    model: TableTypeDesc;
}

export function TableTypeDescComponent(props: TableTypeDescProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.tableKeywordToken} />
            <ExpressionComponent model={model.rowTypeParameterNode} />
            {model.keyConstraintNode && <ExpressionComponent model={model.keyConstraintNode}/>}
        </>
    );
}
