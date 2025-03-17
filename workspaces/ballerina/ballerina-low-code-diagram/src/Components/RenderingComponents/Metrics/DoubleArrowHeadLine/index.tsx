import * as React from "react";

import { ArrowHead } from "../../ArrowHead";
import "../style.scss";

export interface DoubleArrowHeadLineProps {
    startX: number,
    endX: number,
    startY: number,
    endY: number,
    direction: "vertical" | "horizontal",
    className: string
}

export function DoubleArrowHeadLineC(props: DoubleArrowHeadLineProps) {
    const { startX, endX, startY, endY, direction, className } = props;

    return (
        <g>
            <ArrowHead x={startX} y={startY} direction={direction === "vertical" ? "up" : "left"} />
            <line x1={startX} y1={startY} x2={endX} y2={endY} className={className}/>
            <ArrowHead x={endX} y={endY} direction={direction === "vertical" ? "down" : "right"} />
        </g>
    );
}

export const DoubleArrowHeadLine = DoubleArrowHeadLineC;
