import React from "react";

import { RestArg } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface RestArgProps {
    model: RestArg;
}

export function RestArgComponent(props: RestArgProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.ellipsis} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
