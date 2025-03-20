// tslint:disable: jsx-no-multiline-js
import React from "react";

import { STNode } from "@dharshi/syntax-tree";
import classNames from "classnames";

import { DiagnosticTooltip } from "../../../Diagnostic/DiagnosticTooltip/DiagnosticTooltip";
import { useStyles } from "../styles";
import { Button, Icon } from "@dharshi/ui-toolkit";

export const ClickableExpression = (props: {
    node: STNode;
    onEditClick: () => void;
    index?: number;
    testIdPrefix?: string;
    expressionPlaceholder?: string;
}) => {
    const classes = useStyles();
    const { node, onEditClick, index, testIdPrefix, expressionPlaceholder = "<add-expression>" } = props;
    const hasDiagnostic = !!node?.typeData?.diagnostics?.length && node.source.trim() !== "EXPRESSION";

    if (hasDiagnostic) {
        return (
            <DiagnosticTooltip
                placement="right"
                diagnostic={node?.typeData?.diagnostics?.[0]}
                value={node.source}
                onClick={onEditClick}
            >
                <Button
                    appearance="icon"
                    data-testid={`${testIdPrefix || "intermediate-clause-expression"}-${index}`}
                    onClick={onEditClick}
                >
                    {node.source}
                    <Icon
                        name="error-icon"
                        sx={{ height: "14px", width: "14px" }}
                        iconSx={{ fontSize: "14px", color: "var(--vscode-errorForeground)" }}
                    />
                </Button>
            </DiagnosticTooltip>
        );
    }

    return (
        <span
            className={classNames({
                [classes.clausePlaceholder]: node.source.trim() === "EXPRESSION",
                [classes.clauseExpression]: true,
            })}
            onClick={onEditClick}
            data-testid={`${testIdPrefix || "intermediate-clause-expression"}-${index}`}
        >
            {node.source.trim() === "EXPRESSION" ? expressionPlaceholder : node.source}
        </span>
    );
};
