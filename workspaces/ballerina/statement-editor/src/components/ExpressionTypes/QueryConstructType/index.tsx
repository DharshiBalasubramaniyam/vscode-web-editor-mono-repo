// tslint:disable: jsx-no-multiline-js
import React from "react";

import { QueryConstructType } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";


interface QueryConstructTypeProps {
    model: QueryConstructType;
}

export function QueryConstructTypeComponent(props: QueryConstructTypeProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.keyword} className={"keyword"}/>
            {model.keySpecifier &&
            <ExpressionComponent model={model.keySpecifier}/>
            }
        </>
    );
}
