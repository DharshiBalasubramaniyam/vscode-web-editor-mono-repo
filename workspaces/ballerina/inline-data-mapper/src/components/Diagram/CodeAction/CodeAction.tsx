// tslint:disable: jsx-no-multiline-js
import React from "react";
import { Button, Codicon } from "@dharshi/ui-toolkit";

import { CodeActionTooltip } from "./CodeActionTooltip";

export interface CodeAction {
    title: string;
    onClick: () => void;
}

export interface CodeActionWidgetProps {
    codeActions: CodeAction[];
    isConfiguration?: boolean;
    btnSx?: React.CSSProperties;
}

export function CodeActionWidget(props: CodeActionWidgetProps) {
    const { codeActions, isConfiguration, btnSx } = props;

    return (
        <CodeActionTooltip codeActions={codeActions}>
            <Button
                appearance="icon"
                data-testid={`data-mapper-code-action`}
                sx={{ ...btnSx, userSelect: "none", pointerEvents: "auto" }}
            >
                <Codicon
                    name={isConfiguration ? "settings-gear" : "lightbulb"}
                    sx={{ height: "18px", width: "18px" }}
                    iconSx={{ fontSize: "17px", color: "var(--vscode-input-placeholderForeground)" }}
                />
            </Button>
        </CodeActionTooltip>
    );
}
