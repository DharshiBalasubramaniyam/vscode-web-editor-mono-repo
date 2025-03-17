// tslint:disable: jsx-no-multiline-js
import React, { useContext } from "react";

import { STNode } from "@dharshi/syntax-tree";

import { StatementEditorContext } from "../../../store/statement-editor-context";
import { useStatementRendererStyles } from "../../styles";

export interface AddButtonProps {
    model: STNode;
    onClick?: (model?: STNode) => void;
    classNames?: string;
}

export function NewExprAddButton(props: AddButtonProps) {
    const { model, onClick, classNames } = props;

    const { modelCtx } = useContext(StatementEditorContext);
    const {
        hasSyntaxDiagnostics
    } = modelCtx;

    const statementRendererClasses = useStatementRendererStyles();

    const onClickOnAddButton = () => {
        if (!hasSyntaxDiagnostics) {
            onClick(model);
        }
    };

    return (
        <span
            className={`${statementRendererClasses.plusIcon} ${classNames}`}
            onClick={onClickOnAddButton}
            data-testid="plus-button"
        >
            +
        </span>
    );
}
