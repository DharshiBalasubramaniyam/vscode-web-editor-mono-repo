import React from "react";

import { FromClause } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface FromClauseProps {
    model: FromClause;
}

export function FromClauseComponent(props: FromClauseProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.fromKeyword} className={"keyword"} />
            <ExpressionComponent model={model.typedBindingPattern} />
            <TokenComponent model={model.inKeyword} className={"keyword"} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
