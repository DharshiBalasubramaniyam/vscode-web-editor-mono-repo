// tslint:disable: jsx-no-multiline-js align  jsx-wrap-multiline
import React from "react";

import { ControlFlowLineState } from "../../../ViewState";

import { ControlFlowLineSVG } from "./ControlFlowLineSVG";
import "./style.scss";

export interface ControlFlowProps {
    controlFlowViewState?: ControlFlowLineState;
}

export function ControlFlowLine(props: ControlFlowProps) {
    const { controlFlowViewState } = props;
    const { h = 0, x, y, w = 0, isDotted } = controlFlowViewState;

    return (
        <g className="control-flow-line">
            <ControlFlowLineSVG
                x1={x}
                y1={y}
                x2={x + w}
                y2={y + h}
                isDotted={isDotted}
            />
        </g>
    );
}
