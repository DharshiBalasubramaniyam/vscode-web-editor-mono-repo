import React from "react";

import { FunctionSignature } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface FunctionSignatureProps {
    model: FunctionSignature;
}

export function FunctionSignatureComponent(props: FunctionSignatureProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.openParenToken} />
            <ExpressionArrayComponent expressions={model.parameters} />
            <TokenComponent model={model.closeParenToken} />
            {model?.returnTypeDesc && <ExpressionComponent model={model.returnTypeDesc} />}
        </>
    );
}
