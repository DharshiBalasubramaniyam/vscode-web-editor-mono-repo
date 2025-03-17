// tslint:disable: jsx-no-multiline-js jsx-wrap-multiline
import React from "react";

import { STNode, WhereClause } from "@dharshi/syntax-tree";

import { DEFAULT_INTERMEDIATE_CLAUSE } from "../../../constants";
import { getMinutiaeJSX } from "../../../utils";
import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface WhereClauseProps {
    model: WhereClause;
}

export function WhereClauseComponent(props: WhereClauseProps) {
    const { model } = props;

    const exprModel: STNode = {
        ...model.expression,
        position: model.position
    }

    const { leadingMinutiaeJSX } = getMinutiaeJSX(model);

    return (
        <>
            {model.expression?.source?.includes(DEFAULT_INTERMEDIATE_CLAUSE) ?
                <>
                    {leadingMinutiaeJSX}
                    <ExpressionComponent model={exprModel}/>
                </>
                : (
                    <>
                        <TokenComponent model={model.whereKeyword} className={"keyword"}/>
                        <ExpressionComponent model={model.expression}/>
                    </>
                )}
        </>
    );
}
