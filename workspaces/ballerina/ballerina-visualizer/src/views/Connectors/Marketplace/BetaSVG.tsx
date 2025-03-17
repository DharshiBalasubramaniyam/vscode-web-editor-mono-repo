import * as React from "react";

export const BETA_SVG_WIDTH = 26;
export const BETA_SVG_HEIGHT = 12;

export function BetaSVG() {
    return (
        <svg width={BETA_SVG_WIDTH} height={BETA_SVG_HEIGHT} >
            <rect id="Rectangle" className="beta-button" width="26" height="12" rx="4"/>
            <text id="Beta" className="beta-text" transform="translate(3.75 8.5)">
                <tspan x="0" y="0">Beta</tspan>
            </text>
        </svg>
    )
}
