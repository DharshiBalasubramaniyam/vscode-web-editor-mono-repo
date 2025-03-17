
import { MenuItem } from "@dharshi/ui-toolkit";
import React from "react";

interface BreakpointMenuWidgetProps {
    hasBreakpoint: boolean;
    onAddBreakpoint: () => void;
    onRemoveBreakpoint: () => void;
}

export function BreakpointMenu(props: BreakpointMenuWidgetProps) {
    const { hasBreakpoint, onAddBreakpoint, onRemoveBreakpoint } = props;

    return (
        <>
            {hasBreakpoint ?
                <MenuItem
                    key={'remove-breakpoint-btn'}
                    item={{ label: 'Remove Breakpoint', id: "removeBreakpoint", onClick: () => onRemoveBreakpoint() }}
                /> :
                <MenuItem key={'breakpoint-btn'}
                    item={{ label: 'Add Breakpoint', id: "addBreakpoint", onClick: () => onAddBreakpoint() }}
                />
            }
        </>
    );
}
