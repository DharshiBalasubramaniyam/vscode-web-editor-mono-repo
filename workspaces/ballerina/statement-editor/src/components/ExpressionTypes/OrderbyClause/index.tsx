import React from "react";

import { OrderByClause } from "@dharshi/syntax-tree";

import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface OrderByClauseProps {
    model: OrderByClause;
}

export function OrderByClauseComponent(props: OrderByClauseProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.orderKeyword} className={"keyword"} />
            <TokenComponent model={model.byKeyword} className={"keyword"} />
            <ExpressionArrayComponent modifiable={true} expressions={model.orderKey} />
        </>
    );
}
