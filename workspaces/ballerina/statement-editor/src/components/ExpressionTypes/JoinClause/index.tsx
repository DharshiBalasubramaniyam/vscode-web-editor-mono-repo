// tslint:disable: jsx-no-multiline-js
import React from "react";

import { JoinClause } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface JoinClauseProps {
    model: JoinClause;
}

export function JoinClauseComponent(props: JoinClauseProps) {
    const { model } = props;

    return (
        <>
            {model.outerKeyword && (
                <TokenComponent model={model.outerKeyword} className={"keyword"} />
            )}
            <TokenComponent model={model.joinKeyword} className={"keyword"} />
            <ExpressionComponent model={model.typedBindingPattern} />
            <TokenComponent model={model.inKeyword} className={"keyword"} />
            <ExpressionComponent model={model.expression} />
            <ExpressionComponent model={model.joinOnCondition} />
        </>
    );
}
