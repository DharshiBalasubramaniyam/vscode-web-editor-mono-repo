import React from "react";

import { OnConflictClause } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface OnConflictClauseProps {
    model: OnConflictClause;
}

export function OnConflictClauseComponent(props: OnConflictClauseProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.onKeyword} className={"keyword"}/>
            <TokenComponent model={model.conflictKeyword} className={"keyword"}/>
            <ExpressionComponent model={model.expression}/>
        </>
    );
}
