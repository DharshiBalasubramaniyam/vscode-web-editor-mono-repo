import React from "react";

import { NamedArg } from "@dharshi/syntax-tree";

import { ModelType, StatementEditorViewState } from "../../../utils/statement-editor-viewstate";
import { ExpressionComponent } from "../../Expression";
import { TokenComponent } from "../../Token";

interface NamedArgProps {
    model: NamedArg;
}

export function NamedArgComponent(props: NamedArgProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.argumentName} />
            <TokenComponent
                model={model.equalsToken}
                className={((model.equalsToken.viewState as StatementEditorViewState).modelType = ModelType.OPERATOR) && "operator"}
            />
            <ExpressionComponent model={model.expression} />
        </>
    );
}
