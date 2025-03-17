import React from "react";

import { LetExpression } from "@dharshi/syntax-tree";


import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface LetExpressionProps {
    model: LetExpression;
}

export function LetExpressionComponent(props: LetExpressionProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.letKeyword} className={"keyword"} />
            <ExpressionArrayComponent expressions={model.letVarDeclarations} />
            <TokenComponent model={model.inKeyword} className={"keyword"} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
