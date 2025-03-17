import React, { useContext } from "react";

import { MatchStatement } from "@dharshi/syntax-tree";

import { StatementEditorContext } from "../../../store/statement-editor-context";
import { ExpressionComponent } from "../../Expression";
import { ExpressionArrayComponent } from "../../ExpressionArray";
import { TokenComponent } from "../../Token";

interface MatchStatementProps {
    model: MatchStatement;
}

export function MatchStatementC(props: MatchStatementProps) {
    const { model } = props;
    const stmtCtx = useContext(StatementEditorContext);
    const {
        modelCtx: {
            currentModel,
            changeCurrentModel
        }
    } = stmtCtx;

    if (!currentModel.model) {
        changeCurrentModel(model.condition);
    }

    return (
        <>
            <TokenComponent model={model.matchKeyword} className="keyword"/>
            <ExpressionComponent model={model.condition}/>
            <TokenComponent model={model.openBrace}/>
            <ExpressionArrayComponent expressions={model.matchClauses} />
            <TokenComponent model={model.closeBrace}/>
        </>
    );
}
