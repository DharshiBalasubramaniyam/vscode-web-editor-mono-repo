// tslint:disable: jsx-no-multiline-js
import React from "react";
import { Item, Menu, MenuItem, Tooltip } from "@dharshi/ui-toolkit";

import { CodeAction } from "./CodeAction";

interface CodeActionTooltipProps {
    codeActions?: CodeAction[];
    children: React.ReactNode | React.ReactNode[];
}

export const CodeActionTooltipID = "data-mapper-codeaction-tooltip";

export function CodeActionTooltip(props: Partial<CodeActionTooltipProps>) {
    const { codeActions, children } = props;
    const menuItems: React.ReactNode[] = [];

    if (codeActions && codeActions.length > 0) {
        codeActions.forEach((item, index) => {
            const menuItem: Item = { id: `${item.title}-${index}`, label: item.title, onClick: item.onClick }
            menuItems.push(
                <MenuItem
                    key={`${item.title}-${index}`}
                    sx={{ pointerEvents: "auto", userSelect: "none" }}
                    item={menuItem}
                    data-testid={`code-action-additional-${index}`}
                />
            );
        });
    }

    const tooltipTitleComponent = (
        <Menu sx={{ background: 'none', boxShadow: 'none', padding: 0 }}>
            {menuItems}
        </Menu>
    );

    return (
        <Tooltip
            content={tooltipTitleComponent}
            position="bottom"
            sx={{ padding: 0, fontSize: "12px" }}
        >
            {children}
        </Tooltip>
    )
}
