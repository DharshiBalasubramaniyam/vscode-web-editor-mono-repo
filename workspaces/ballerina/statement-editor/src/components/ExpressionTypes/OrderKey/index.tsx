// tslint:disable: jsx-no-multiline-js
import React from "react";

import { OrderKey } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { KeywordComponent } from "../../Keyword";

interface OrderKeyProps {
    model: OrderKey;
}

export function OrderKeyComponent(props: OrderKeyProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.expression}/>
            {model.orderDirection &&
            <KeywordComponent model={model.orderDirection}/>
            }
        </>
    );
}
