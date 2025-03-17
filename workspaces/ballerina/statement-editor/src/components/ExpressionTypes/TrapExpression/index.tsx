import React from "react";

import { TrapExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { KeywordComponent } from "../../Keyword";

interface TrapExpressionProps {
    model: TrapExpression
}

export function TrapExpressionComponent(props: TrapExpressionProps) {
    const { model } = props;

    return (
        <>
            <KeywordComponent model={model.trapKeyword} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
