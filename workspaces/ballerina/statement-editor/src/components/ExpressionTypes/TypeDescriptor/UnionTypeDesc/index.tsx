import React from "react";

import { UnionTypeDesc } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface UnionTypeDescProps {
    model: UnionTypeDesc;
}

export function UnionTypeDescComponent(props: UnionTypeDescProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.leftTypeDesc} />
            <TokenComponent model={model.pipeToken} />
            <ExpressionComponent model={model.rightTypeDesc} />
        </>
    );
}
