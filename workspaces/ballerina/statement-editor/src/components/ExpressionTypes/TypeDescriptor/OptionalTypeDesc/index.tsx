import React from "react";

import { OptionalTypeDesc } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface OptionalTypeDescProps {
    model: OptionalTypeDesc;
}

export function OptionalTypeDescComponent(props: OptionalTypeDescProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.typeDescriptor} />
            <TokenComponent model={model.questionMarkToken} />
        </>
    );
}
