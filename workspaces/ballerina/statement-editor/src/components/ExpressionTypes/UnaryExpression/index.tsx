import React from "react";

import { UnaryExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { OperatorComponent } from "../../Operator";

interface UnaryProps {
    model: UnaryExpression;
}

export function UnaryExpressionComponent(props: UnaryProps) {
    const { model } = props;

    return (
        <>
            <OperatorComponent model={model.unaryOperator} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
