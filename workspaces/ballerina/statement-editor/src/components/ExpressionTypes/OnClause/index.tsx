import React from "react";

import { OnClause } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface OnClauseProps {
    model: OnClause;
}

export function OnClauseComponent(props: OnClauseProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.onKeyword} className={"keyword"} />
            <ExpressionComponent model={model.lhsExpression} />
            <TokenComponent model={model.equalsKeyword} className={"keyword"} />
            <ExpressionComponent model={model.rhsExpression} />
        </>
    );
}
