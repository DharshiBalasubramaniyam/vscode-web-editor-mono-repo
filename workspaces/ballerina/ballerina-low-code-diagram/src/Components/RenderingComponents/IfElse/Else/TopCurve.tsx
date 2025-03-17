import React from "react";

import { DiagnosticMsgSeverity } from "@dharshi/ballerina-core";

export const TOP_CURVE_SVG_WIDTH = 6.5;
export const TOP_CURVE_SVG_HEIGHT = 6.5;

export function TopCurveSVG(xyProps: { x: number, y: number, diagnostics: DiagnosticMsgSeverity, strokeWidth?: number }) {
    const { diagnostics } = xyProps;
    const diagnosticStyles = diagnostics?.severity === "ERROR" ? "line-curve-error" : "line-curve-warning";
    const lineStyles = diagnostics ? diagnosticStyles : "line-curve"
    const { strokeWidth } = xyProps;

    return (
        <svg {...xyProps} width={TOP_CURVE_SVG_WIDTH} height={TOP_CURVE_SVG_HEIGHT} style={{ "overflow": "visible" }}>
            <path className={lineStyles} d="M0,0.5c3.3,0,6,2.7,6,6c0,0,0,0,0,0" strokeWidth={strokeWidth ? strokeWidth : 1} />
        </svg>
    );
}
