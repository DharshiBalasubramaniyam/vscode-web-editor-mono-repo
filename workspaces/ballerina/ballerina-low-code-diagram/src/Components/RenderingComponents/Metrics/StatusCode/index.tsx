import * as React from "react";

import "../style.scss"

import { ConnectionErrorSVG } from "./ConnectionErrorSVG";
import { ConnectionFailedSVG } from "./ConnectionFailedSVG";
import { ConnectionSuccessSVG } from "./ConnectionSuccessSVG";

export interface StatusCodeProps {
    x: number,
    y: number,
    httpStatusCode: string
    errorStatus: string
    errorMsg: string
}

export function StatusCodeC(props: StatusCodeProps) {
    const { x, y, httpStatusCode, errorStatus, errorMsg } = props;
    if (httpStatusCode === "") {
        return errorStatus !== "false" ? <ConnectionErrorSVG x={x} y={y} text={"Failure"} errorMsg={errorMsg} /> : <ConnectionSuccessSVG x={x} y={y} text={"Success"} />
    }
    const statusMsg = httpStatusCode.charAt(0) === '2' ? <ConnectionSuccessSVG x={x} y={y} text={httpStatusCode}/> : <ConnectionFailedSVG x={x} y={y} text={httpStatusCode}/>

    if (errorStatus !== "false"){
        return (
            <g>
                <ConnectionErrorSVG x={x} y={y} text={"ERROR"} errorMsg={errorMsg}/>
            </g>
        );
    }else{
        return (
            <g>
                {statusMsg}
            </g>
        );
    }
}

export const StatusCode = StatusCodeC;
