import * as React from "react";

import { ArrowHead } from "../../ArrowHead";

export interface ActionInvoLineProps {
    clientInvoX: number,
    clientInvoY: number,
    actionX: number,
    actionY: number,
    direction: "left" | "right",
    className: string
}

export function ActionInvoLineC(props: ActionInvoLineProps) {
    const { clientInvoX, clientInvoY, actionX, actionY, direction, className } = props;

    return (
        <g>
            <line x1={clientInvoX} y1={clientInvoY} x2={actionX} y2={actionY} className={className}/>
            <ArrowHead x={actionX} y={actionY} direction={direction} />
        </g>
    );
}

export const ActionInvoLine = ActionInvoLineC;
