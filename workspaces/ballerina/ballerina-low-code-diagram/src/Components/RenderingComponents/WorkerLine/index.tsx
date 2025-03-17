import * as React from "react";

import cn from "classnames";

import { FunctionViewState, ViewState } from "../../../ViewState";

import "./style.scss";

export interface WorkerLineProps {
    viewState: ViewState
}

export function WorkerLine(props: WorkerLineProps) {
    const { viewState } = props;
    const functionViewState: FunctionViewState = viewState as FunctionViewState;
    const x = functionViewState.workerLine.x;
    const y = functionViewState.workerLine.y;
    const h = functionViewState.workerLine.h;
    const classes = cn("worker-line");
    return (
        <g className={classes}>
            <line x1={x} y1={y} x2={x} y2={y + h} />
        </g>
    );
}
