import React from "react";

import { KeyTypeConstraint } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface KeyTypeConstraintProps {
    model: KeyTypeConstraint;
}

export function KeyTypeConstraintComponent(props: KeyTypeConstraintProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.keyKeywordToken} />
            <ExpressionComponent model={model.typeParameterNode} />
        </>
    );
}
