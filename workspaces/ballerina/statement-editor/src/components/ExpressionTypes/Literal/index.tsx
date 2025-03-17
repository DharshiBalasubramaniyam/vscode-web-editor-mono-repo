import React from "react";

import {
    AsteriskLiteral,
    BooleanLiteral,
    NullLiteral,
    NumericLiteral,
    StringLiteral
} from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";

interface LiteralProps {
    model: AsteriskLiteral
        | BooleanLiteral
        | NullLiteral
        | NumericLiteral
        | StringLiteral;
}

export function LiteralComponent(props: LiteralProps) {
    const { model } = props;

    return (
        <ExpressionComponent model={model.literalToken} />
    );
}
