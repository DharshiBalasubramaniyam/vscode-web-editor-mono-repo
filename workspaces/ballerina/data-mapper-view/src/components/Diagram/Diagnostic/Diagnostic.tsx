// tslint:disable: jsx-no-multiline-js jsx-no-lambda
import React from "react";

import { Diagnostic } from "vscode-languageserver-types";

import { DiagnosticTooltip } from "./DiagnosticTooltip/DiagnosticTooltip";
import { Button, Icon } from "@dharshi/ui-toolkit";

export interface DiagnosticWidgetProps {
    diagnostic: Diagnostic,
    value?: string,
    onClick?: () => void,
    isLabelElement? : boolean,
    btnSx?: React.CSSProperties
}


export function DiagnosticWidget(props: DiagnosticWidgetProps) {
    const {diagnostic, value, onClick, btnSx} =  props;

    return (
        <DiagnosticTooltip diagnostic={diagnostic} value={value} onClick={onClick}>
            <Button
                appearance="icon"
                data-testid={`expression-label-diagnostic`}
                onClick={onClick}
                sx={btnSx}
            >
                <Icon
                    name="error-icon"
                    sx={{ height: "14px", width: "14px" }}
                    iconSx={{ fontSize: "14px", color: "var(--vscode-errorForeground)" }}
                />
            </Button>
        </DiagnosticTooltip>
    )
}
