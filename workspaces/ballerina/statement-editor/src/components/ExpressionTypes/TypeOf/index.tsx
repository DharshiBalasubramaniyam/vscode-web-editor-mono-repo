import React from "react";

import { TypeofExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface TypeOfExpressionProps {
    model: TypeofExpression
}

export function TypeOfExpressionComponent(props: TypeOfExpressionProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.typeofKeyword} className={"keyword"} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
