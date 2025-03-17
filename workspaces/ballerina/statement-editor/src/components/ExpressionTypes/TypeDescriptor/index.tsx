import React from "react";

import {
    BooleanTypeDesc,
    DecimalTypeDesc,
    FloatTypeDesc,
    IntTypeDesc,
    JsonTypeDesc,
    StringTypeDesc,
    VarTypeDesc
} from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";

interface TypeDescProps {
    model: BooleanTypeDesc
        | DecimalTypeDesc
        | FloatTypeDesc
        | IntTypeDesc
        | JsonTypeDesc
        | StringTypeDesc
        | VarTypeDesc;
}

export function TypeDescComponent(props: TypeDescProps) {
    const { model } = props;

    return (
        <ExpressionComponent model={model.name} />
    );
}
