import React from "react";

import { StartAction } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface StartActionProps {
    model: StartAction;
}

export function StartActionComponent(props: StartActionProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.startKeyword} className={"keyword"} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
