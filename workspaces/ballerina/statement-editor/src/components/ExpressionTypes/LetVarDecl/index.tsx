import React from "react";

import { LetVarDecl } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface LetVarDeclProps {
    model: LetVarDecl;
}

export function LetVarDeclComponent(props: LetVarDeclProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.typedBindingPattern} />
            <TokenComponent model={model.equalsToken} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
