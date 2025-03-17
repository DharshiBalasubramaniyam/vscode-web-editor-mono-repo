import React, { useContext } from "react";

import { KeySpecifier } from "@dharshi/syntax-tree";

import { EXPR_CONSTRUCTOR } from "../../../../constants";
import { StatementEditorContext } from "../../../../store/statement-editor-context";
import { ExpressionArrayComponent } from "../../../ExpressionArray";
import { useStatementRendererStyles } from "../../../styles";
import { TokenComponent } from "../../../Token";

interface KeySpecifierProps {
    model: KeySpecifier;
}

export function KeySpecifierComponent(props: KeySpecifierProps) {
    const { model } = props;
    const stmtCtx = useContext(StatementEditorContext);
    const {
        modelCtx: {
            updateModel,
        }
    } = stmtCtx;

    const statementRendererClasses = useStatementRendererStyles();

    const onClickOnPlusIcon = (event: any) => {
        event.stopPropagation();
        const isEmpty = model.fieldNames.length === 0;
        const expr = isEmpty ? EXPR_CONSTRUCTOR : `, ${EXPR_CONSTRUCTOR}`;
        const newPosition = isEmpty ? {
            ...model.closeParenToken.position,
            endColumn: model.closeParenToken.position.startColumn
        } : {
            startLine: model.fieldNames[model.fieldNames.length - 1].position.endLine,
            startColumn: model.fieldNames[model.fieldNames.length - 1].position.endColumn,
            endLine: model.closeParenToken.position.startLine,
            endColumn: model.closeParenToken.position.startColumn
        }
        updateModel(expr, newPosition);
    };

    return (
        <>
            <TokenComponent model={model.keyKeyword} />
            <TokenComponent model={model.openParenToken} />
            <ExpressionArrayComponent expressions={model.fieldNames} />
            <span
                className={statementRendererClasses.plusIcon}
                onClick={onClickOnPlusIcon}
            >
                +
            </span>
            <TokenComponent model={model.closeParenToken} />
        </>
    );
}
