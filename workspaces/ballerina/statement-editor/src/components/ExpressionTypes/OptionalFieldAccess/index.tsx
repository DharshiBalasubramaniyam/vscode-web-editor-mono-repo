import React from "react";

import { OptionalFieldAccess } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface OptionalFieldAccessProps {
    model: OptionalFieldAccess;
}

export function OptionalFieldAccessComponent(props: OptionalFieldAccessProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.expression} >
                <TokenComponent model={model.optionalChainingToken} />
                <ExpressionComponent model={model.fieldName} />
            </ExpressionComponent>
        </>
    );
}
