import React from "react";

import { ReturnTypeDescriptor } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { ExpressionArrayComponent } from "../../../ExpressionArray";
import { TokenComponent } from "../../../Token";

interface ReturnTypeDescProps {
    model: ReturnTypeDescriptor;
}

export function ReturnTypeDescComponent(props: ReturnTypeDescProps) {
    const { model } = props;

    return (
        <>
            {!!model.annotations.length && <ExpressionArrayComponent expressions={model.annotations} />}
            <TokenComponent model={model.returnsKeyword} className="keyword" />
            <ExpressionComponent model={model.type} />
        </>
    );
}
