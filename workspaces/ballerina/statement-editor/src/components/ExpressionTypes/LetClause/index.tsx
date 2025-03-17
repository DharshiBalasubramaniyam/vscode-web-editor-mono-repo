import React from "react";

import { LetClause } from "@dharshi/syntax-tree";


import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface LetClauseProps {
    model: LetClause;
}

export function LetClauseComponent(props: LetClauseProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.letKeyword} className={"keyword"} />
            <ExpressionArrayComponent modifiable={true} expressions={model.letVarDeclarations} />
        </>
    );
}
