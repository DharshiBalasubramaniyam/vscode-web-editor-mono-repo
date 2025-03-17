// tslint:disable: jsx-no-multiline-js
import React from "react";

import { ComputedResourceAccessSegment, NodePosition } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface ComputedResourceAccessSegmentProps {
    model: ComputedResourceAccessSegment;
}

export function ComputedResourceAccessSegmentComponent(props: ComputedResourceAccessSegmentProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.openBracketToken} />
            <ExpressionComponent model={model.expression} />
            <TokenComponent model={model.closeBracketToken} />
        </>
    );
}
