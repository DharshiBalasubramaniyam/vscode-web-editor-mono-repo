import React from "react";

import { FunctionTypeDesc } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { ExpressionArrayComponent } from "../../../ExpressionArray";
import { TokenComponent } from "../../../Token";

interface FunctionTypeDescProps {
    model: FunctionTypeDesc;
}

export function FunctionTypeDescComponent(props: FunctionTypeDescProps) {
    const { model } = props;

    return (
        <>
            {!!model.qualifierList.length && <ExpressionArrayComponent expressions={model.qualifierList} />}
            <TokenComponent model={model.functionKeyword} className="keyword" />
            <ExpressionComponent model={model.functionSignature} />
        </>
    );
}
