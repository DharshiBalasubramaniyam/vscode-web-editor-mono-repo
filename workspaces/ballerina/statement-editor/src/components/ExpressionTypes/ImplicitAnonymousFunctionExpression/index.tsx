import React from "react";

import { ImplicitAnonymousFunctionExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface ImplicitAnonymousFunctionExpressionProps {
    model: ImplicitAnonymousFunctionExpression;
}

export function ImplicitAnonymousFunctionExprComponent(props: ImplicitAnonymousFunctionExpressionProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.params} />
            <TokenComponent model={model.rightDoubleArrow} className={"operator"} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
