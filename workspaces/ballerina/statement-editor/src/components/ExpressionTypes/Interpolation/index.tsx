import React from "react";

import { Interpolation} from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface InterpolationProps {
    model: Interpolation;
}

export function InterpolationComponent(props: InterpolationProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.interpolationStartToken} />
            <ExpressionComponent model={model.expression} />
            <TokenComponent model={model.interpolationEndToken} />
        </>
    );
}
