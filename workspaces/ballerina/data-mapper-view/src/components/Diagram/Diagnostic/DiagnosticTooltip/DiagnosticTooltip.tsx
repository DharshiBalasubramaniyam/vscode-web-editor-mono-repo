// tslint:disable: jsx-no-multiline-js jsx-no-lambda
import React from "react";

import { Button, Codicon, Divider, Icon, Tooltip } from "@dharshi/ui-toolkit";
import { Diagnostic } from "vscode-languageserver-types";

import { useStyles } from "../style";

interface Props {
    placement: "top" | "bottom" | "left" | "right";
    children: React.ReactNode;
    diagnostic: Diagnostic
    value?: string
    onClick?: () => void;
}

export const DiagnosticTooltipID = "data-mapper-diagnostic-tooltip";

export function DiagnosticTooltip(props: Partial<Props>) {
    const { diagnostic, value, children, onClick } = props;
    const classes = useStyles();
    const source = diagnostic.source || value

    const Code = () => (
        <>
            <Divider />
            <div className={classes.source}>
                <code
                    data-lang="ballerina"
                    className={classes.code}
                >
                    {source.trim()}
                </code>
                <Button
                    appearance="icon"
                    className={classes.editButton}
                    aria-label="edit"
                    onClick={onClick}
                >
                    <Codicon name="tools" sx={{ marginRight: "8px" }} />
                    <span className={classes.editButtonText}>Fix by editing expression</span>
                </Button>
            </div>
        </>

    );
    const DiagnosticC = () => (
        <>
            <Button
                appearance="icon"
                className={classes.editButton}
                aria-label="edit"
                onClick={onClick}
            >
                <Icon name="error-icon" iconSx={{ color: "var(--vscode-errorForeground)" }} />
            </Button>
            <div className={classes.diagnosticWrapper}>{diagnostic.message}</div>
        </>

    );

    const tooltipTitleComponent = (
        <pre className={classes.pre}>
            {diagnostic.message && <DiagnosticC />}
            {source && <Code />}
        </pre>
    );

    return (
        <Tooltip
            id={DiagnosticTooltipID}
            content={tooltipTitleComponent}
            position="bottom"
        >
            {children}
        </Tooltip>
    )

}
