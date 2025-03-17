import React from "react";

import { LimitClause } from "@dharshi/syntax-tree";


import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface LimitClauseProps {
    model: LimitClause;
}

export function LimitClauseComponent(props: LimitClauseProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.limitKeyword} className={"keyword"} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
