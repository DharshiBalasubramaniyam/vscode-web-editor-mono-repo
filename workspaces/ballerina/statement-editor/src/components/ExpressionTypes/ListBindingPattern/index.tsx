// tslint:disable: jsx-no-multiline-js
import React from "react";

import { ListBindingPattern } from "@dharshi/syntax-tree";

import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface ListBindingPatternProps {
    model: ListBindingPattern;
}

export function ListBindingPatternComponent(props: ListBindingPatternProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.openBracket} />
            <ExpressionArrayComponent expressions={model.bindingPatterns} />
            <TokenComponent model={model.closeBracket} />
        </>
    );
}
