import React from "react";

import { ParenthesisedTypeDesc } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface ParenthesisedTypeDescProps {
    model: ParenthesisedTypeDesc;
}

export function ParenthesisedTypeDescComponent(props: ParenthesisedTypeDescProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.openParenToken} />
            <ExpressionComponent model={model.typedesc} />
            <TokenComponent model={model.closeParenToken} />
        </>
    );
}
