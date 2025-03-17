// tslint:disable: jsx-no-multiline-js
import React, { useContext } from "react";

import { ActionStatement, STKindChecker } from "@dharshi/syntax-tree";

import { ACTION, HTTP_ACTION } from "../../../constants";
import { StatementEditorContext } from "../../../store/statement-editor-context";
import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface ReturnStatementProps {
    model: ActionStatement;
}

export function ActionStatementC(props: ReturnStatementProps) {
    const { model } = props;
    const stmtCtx = useContext(StatementEditorContext);
    const {
        modelCtx: { currentModel, changeCurrentModel },
        config,
    } = stmtCtx;

    if (!currentModel.model) {
        if (
            (config.type === ACTION || config.type === HTTP_ACTION) &&
            model &&
            STKindChecker.isCheckAction(model.expression) &&
            STKindChecker.isRemoteMethodCallAction(model.expression.expression)
        ) {
            if (model.expression.expression.arguments?.length > 0) {
                changeCurrentModel(model.expression.expression.arguments[0]);
            } else {
                changeCurrentModel(model.expression.expression);
            }
        } else if (model && STKindChecker.isAsyncSendAction(model.expression)) {
            changeCurrentModel(model.expression.peerWorker);
        } else {
            changeCurrentModel(model.expression);
        }
    }

    let component: JSX.Element;
    if (STKindChecker.isAsyncSendAction(model.expression)) {
        const expressionModel: any = model.expression as any;
        component = (
            <>
                <ExpressionComponent model={expressionModel.expression} />
                <TokenComponent model={expressionModel.rightArrowToken} />
                <ExpressionComponent model={expressionModel.peerWorker} />
                <TokenComponent model={model.semicolonToken} />
            </>
        );
    } else {
        component = (
            <>
                <ExpressionComponent model={model.expression} />
                <TokenComponent model={model.semicolonToken} />
            </>
        );
    }

    return component;
}
