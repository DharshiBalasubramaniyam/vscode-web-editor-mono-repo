// tslint:disable: jsx-no-multiline-js
import React, { useContext } from "react";

import { ClientResourceAccessAction, NodePosition } from "@dharshi/syntax-tree";

import { StatementEditorContext } from "../../../store/statement-editor-context";
import { EXPR_PLACEHOLDER } from "../../../utils/expressions";
import { NewExprAddButton } from "../../Button/NewExprAddButton";
import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface ClientResourceAccessActionProps {
    model: ClientResourceAccessAction;
}

export function ClientResourceAccessActionComponent(props: ClientResourceAccessActionProps) {
    const { model } = props;
    const {
        modelCtx: {
            updateModel
        }
    } = useContext(StatementEditorContext);

    const methodPosition: NodePosition = model.methodName?.position;
    if (model.arguments && methodPosition) {
        methodPosition.endLine = model.arguments.closeParenToken.position.endLLine;
        methodPosition.endColumn = model.arguments.closeParenToken.position.endColumn;
    }

    const addNewExpression = () => {
        const expression = `.${EXPR_PLACEHOLDER}`;
        const position: NodePosition =  model.position;
        position.startColumn = model.position.endColumn;
        position.startLine = model.position.endLine;
        updateModel(expression, position);
    };

    return (
        <>
            <ExpressionComponent model={model.expression} />
            <TokenComponent model={model.rightArrowToken} className={"operator"} />
            {model.resourceAccessPath.length ? <TokenComponent model={model.slashToken}  />
                : <ExpressionComponent model={model.slashToken} />}
            {model.resourceAccessPath && <ExpressionArrayComponent expressions={model.resourceAccessPath} />}
            {model.dotToken && <TokenComponent model={model.dotToken} className={"operator"} />}

            {model.methodName && (
                <ExpressionComponent model={model.methodName} stmtPosition={methodPosition}>
                    {model.arguments?.openParenToken && <TokenComponent model={model.arguments.openParenToken} />}
                    {model.arguments?.arguments && <ExpressionArrayComponent expressions={model.arguments.arguments} />}
                    {model.arguments?.closeParenToken && <TokenComponent model={model.arguments.closeParenToken} />}
                </ExpressionComponent>
            )}
            {!model.methodName && (
                <NewExprAddButton model={model} onClick={addNewExpression}/>
            )}
        </>
    );
}
