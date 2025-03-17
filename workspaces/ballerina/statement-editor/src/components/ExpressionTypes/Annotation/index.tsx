import React from "react";

import { Annotation } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface AnnotationProps {
    model: Annotation;
}

export function AnnotationComponent(props: AnnotationProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.atToken} />
            <ExpressionComponent model={model.annotReference} />
            {model?.annotValue && <ExpressionComponent model={model.annotValue} />}
        </>
    );
}
