import React from "react";

import { IntersectionTypeDesc } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface IntersectionTypeDescProps {
    model: IntersectionTypeDesc;
}

export function IntersectionTypeDescComponent(props: IntersectionTypeDescProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.leftTypeDesc} />
            <TokenComponent model={model.bitwiseAndToken} />
            <ExpressionComponent model={model.rightTypeDesc} />
        </>
    );
}
