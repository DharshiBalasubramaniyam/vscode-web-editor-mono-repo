// tslint:disable: jsx-no-multiline-js
import React from "react";

import {
    FunctionDefinition,
    STKindChecker,
} from "@dharshi/syntax-tree";

import { ExprBodiedFuncComponent } from "./ExpressionBodiedFuction";
import { RegularFuncComponent } from "./RegularFunction";

export interface FunctionProps {
    model: FunctionDefinition;
    hideHeader?: boolean;
}


export function Function(props: FunctionProps) {
    const { model, hideHeader } = props;

    const isExpressionFuncBody: boolean = STKindChecker.isExpressionFunctionBody(
        model.functionBody
    );

    return (
        <>
            {isExpressionFuncBody ? (
                <ExprBodiedFuncComponent
                    model={model}
                />
            ) : (
                <RegularFuncComponent
                    model={model}
                    hideHeader={hideHeader}
                />
            )}
        </>
    );
}
