// tslint:disable: jsx-no-multiline-js
import React from "react";

import { ExplicitAnonymousFunctionExpression, STKindChecker } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface ExplicitAnonymousFunctionExpressionProps {
    model: ExplicitAnonymousFunctionExpression;
}

export function ExplicitAnonymousFunctionExprComponent(props: ExplicitAnonymousFunctionExpressionProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.functionKeyword} className="keyword" />
            <ExpressionComponent model={model.functionSignature} />
            {model?.functionBody && STKindChecker.isExpressionFunctionBody(model.functionBody) && (
                <>
                    <TokenComponent model={model.functionBody.rightDoubleArrow} className={"operator"} />
                    <ExpressionComponent model={model.functionBody.expression} />
                </>
            )}
            {model?.functionBody && STKindChecker.isFunctionBodyBlock(model.functionBody) && (
                <>
                    <TokenComponent model={model.functionBody.openBraceToken} className={"operator"} />
                    <ExpressionArrayComponent expressions={model?.functionBody.statements} />
                    <TokenComponent model={model.functionBody.closeBraceToken} className={"operator"} />
                </>
            )}
        </>
    );
}
