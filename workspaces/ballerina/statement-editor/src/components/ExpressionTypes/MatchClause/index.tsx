// tslint:disable: jsx-no-multiline-js
import React from "react";

import { MatchClause } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface MatchClauseProps {
    model: MatchClause;
}

export function MatchClauseComponent(props: MatchClauseProps) {
    const { model } = props;

    return (
        <>
            <ExpressionArrayComponent
                expressions={model.matchPatterns}
            />
            <TokenComponent model={model.rightDoubleArrow} />
            <ExpressionComponent model={model.blockStatement}/>
        </>
    );
}
