import React from "react";

import { SelectClause } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface SelectClauseProps {
    model: SelectClause;
}

export function SelectClauseComponent(props: SelectClauseProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.selectKeyword} className={"keyword"} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
