import React from "react";

import { ParenthesizedArgList } from "@dharshi/syntax-tree";

import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface ParenthesizedArgListProps {
    model: ParenthesizedArgList;
}

export function ParenthesizedArgListComponent(props: ParenthesizedArgListProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.openParenToken} />
            <ExpressionArrayComponent expressions={model.arguments} />
            <TokenComponent model={model.closeParenToken} />
        </>
    );
}
