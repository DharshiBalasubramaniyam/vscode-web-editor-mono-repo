import React from "react";

import { QueryExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";


interface QueryExpressionProps {
    model: QueryExpression;
}

export function QueryExpressionComponent(props: QueryExpressionProps) {
    const { model } = props;

    return (
        <>
            {model.queryConstructType && <ExpressionComponent model={model.queryConstructType} />}
            <ExpressionComponent model={model.queryPipeline} />
            <ExpressionComponent  model={model.selectClause || (model as any).resultClause} />
        </>
    );
}
