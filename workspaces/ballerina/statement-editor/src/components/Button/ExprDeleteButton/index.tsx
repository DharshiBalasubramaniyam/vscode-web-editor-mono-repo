import React from "react";

import { STNode } from "@dharshi/syntax-tree";

import { useStatementRendererStyles } from "../../styles";

export interface ExprDeleteButtonProps {
    model: STNode;
    onClick?: (model?: STNode) => void;
    classNames?: string;
}

export function ExprDeleteButton(props: ExprDeleteButtonProps) {
    const { model, onClick, classNames } = props;

    const statementRendererClasses = useStatementRendererStyles();

    const onClickOnMinusButton = () => {
        onClick(model);
    };

    return (
        <span
            className={`${statementRendererClasses.plusIcon} ${classNames}`}
            onClick={onClickOnMinusButton}
            data-testid="minus-button"
        >
            -
        </span>
    );
}
