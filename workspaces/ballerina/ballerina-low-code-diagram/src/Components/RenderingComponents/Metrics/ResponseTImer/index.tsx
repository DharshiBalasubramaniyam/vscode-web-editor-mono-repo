import * as React from "react";

import { TRIGGER_RECT_SVG_HEIGHT } from "../../ActionInvocation/TriggerSVG";
import "../style.scss"

import { CounterLeftSVG } from "./CounterLeftSVG";

export interface ResponseTimerProps {
    x: number,
    y: number,
    responseTime: string
}

export function ResponseTimerC(props: ResponseTimerProps) {
    const { x, y, responseTime } = props;
    const responseTimeValue = Number(responseTime);
    const value = responseTimeValue > 1000 ? (responseTimeValue / 1000).toFixed(2) : responseTimeValue;
    const unit = responseTimeValue > 1000 ? " s" : " ms";

    return (
        <g>
            <CounterLeftSVG x={x} y={y - TRIGGER_RECT_SVG_HEIGHT / 2.5} text={value.toString() + unit}/>
        </g>
    );
}

export const ResponseTimer = ResponseTimerC;

export function PerformanceLabelC(props: ResponseTimerProps) {
    const { x, y, responseTime } = props;
    return (
        <g>
            <CounterLeftSVG x={x} y={y - TRIGGER_RECT_SVG_HEIGHT / 2.5} text={responseTime}/>
        </g>
    );
}

export const PerformanceLabel = PerformanceLabelC;
