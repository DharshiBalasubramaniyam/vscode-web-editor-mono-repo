// tslint:disable: jsx-no-multiline-js
import * as React from "react";

import './style.scss';

export function ControlFlowBottomCurveSVG(props: { x: number, y: number, height: number, width: number }) {
    return (
        <svg {...props} >
            <defs>
                <filter id="control_flow_glowing_filter" {...props} filterUnits="userSpaceOnUse">
                    <feOffset in="SourceAlpha" />
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feFlood flood-color="#36b475" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            <path filter="url(#control_flow_glowing_filter)" className="line" d="M6,0c0,3.3-2.7,6-6,6c0,0,0,0,0,0" />
        </svg>
    );
}
