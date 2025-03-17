import React from "react";

import { Button, Icon } from "@dharshi/ui-toolkit";

import { DiagnosticTooltip } from "./DiagnosticTooltip";

export interface DiagnosticWidgetProps {
    diagnostic: any,
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
