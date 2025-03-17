import React from "react";

import { ImplicitNewExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface ImplicitNewExprProps {
    model: ImplicitNewExpression;
}

export function ImplicitNewExpressionComponent(props: ImplicitNewExprProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.newKeyword} />
            <ExpressionComponent model={model.parenthesizedArgList} />
        </>
    );
}
