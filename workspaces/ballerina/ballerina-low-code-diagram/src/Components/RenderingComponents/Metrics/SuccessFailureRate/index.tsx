import * as React from "react";

import "../style.scss"

import { ErrorSVG } from "./ErrorSVG";
import { SuccessSVG } from "./SuccessSVG";

export interface SuccessTextProps {
    x: number,
    y: number,
    successRate: number,
    failureRate: number
}

export function SuccessFailureC(props: SuccessTextProps) {
    const { x, y, successRate, failureRate } = props;
    if (failureRate > successRate){
        return (
            <g>
                <ErrorSVG x={x} y={y} failureRate={failureRate}/>
            </g>
        );
    }else{
        return (
            <g>
                <SuccessSVG x={x} y={y} successRate={successRate} />
            </g>
        );
    }
}

export const SuccesFailure = SuccessFailureC;
