import React from "react";

import { NodePosition, RemoteMethodCallAction } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface RemoteMethodCallActionProps {
    model: RemoteMethodCallAction;
}

export function RemoteMethodCallActionComponent(props: RemoteMethodCallActionProps) {
    const { model } = props;

    const methodPosition: NodePosition = model.methodName.position;
    methodPosition.endLine = model.closeParenToken.position.endLLine;
    methodPosition.endColumn = model.closeParenToken.position.endColumn;

    return (
        <>
            <ExpressionComponent model={model.expression} />
            <TokenComponent model={model.rightArrowToken} className={"operator"} />
            <ExpressionComponent model={model.methodName} stmtPosition={methodPosition}>
                <TokenComponent model={model.openParenToken} />
                <ExpressionArrayComponent expressions={model.arguments} />
                <TokenComponent model={model.closeParenToken} />
            </ExpressionComponent>
        </>
    );
}
