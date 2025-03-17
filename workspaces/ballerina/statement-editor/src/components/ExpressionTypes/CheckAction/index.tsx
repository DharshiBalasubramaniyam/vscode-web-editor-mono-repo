import React from "react";

import { CheckAction, CheckExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { KeywordComponent } from "../../Keyword";

interface CheckActionProps {
    model: CheckAction | CheckExpression;
}

export function CheckActionComponent(props: CheckActionProps) {
    const { model } = props;

    return (
        <>
            <KeywordComponent model={model.checkKeyword} />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
