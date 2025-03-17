import React from "react";

import { TypeParameter } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface TypeParameterProps {
    model: TypeParameter;
}

export function TypeParameterComponent(props: TypeParameterProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.ltToken} />
            <ExpressionComponent model={model.typeNode} />
            <TokenComponent model={model.gtToken} />
        </>
    );
}
