import React from "react";

import { TypeCastExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface TypeCastExpressionProps {
    model: TypeCastExpression
}

export function TypeCastExpressionComponent(props: TypeCastExpressionProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.ltToken} />
            <ExpressionComponent model={model.typeCastParam} />
            <TokenComponent model={model.gtToken} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
