// tslint:disable: jsx-no-multiline-js
import * as React from "react";

import { STNode } from "@dharshi/syntax-tree";

import { ErrorSnippet } from "../../../../Types/type";

import { ConnectorRectSVG } from "./ConnectorRectSVG";

export const CONNECTOR_PROCESS_SVG_WIDTH_WITH_SHADOW = 65;
export const CONNECTOR_PROCESS_SVG_HEIGHT_WITH_SHADOW = 65;
export const CONNECTOR_PROCESS_SVG_WIDTH = 55;
export const CONNECTOR_PROCESS_SVG_HEIGHT = 55;
export const CONNECTOR_PROCESS_SHADOW_OFFSET = CONNECTOR_PROCESS_SVG_WIDTH_WITH_SHADOW - CONNECTOR_PROCESS_SVG_WIDTH;

export function ConnectorProcessSVG(props: {
    x: number, y: number,
    sourceSnippet?: string,
    diagnostics?: ErrorSnippet,
    openInCodeView?: () => void,
    componentSTNode: STNode
}) {
    const { sourceSnippet, diagnostics, openInCodeView, componentSTNode, ...xyProps } = props;
    const tooltipText = sourceSnippet ? {
        code: sourceSnippet
    } : undefined;
    return (
        <svg {...xyProps} width={CONNECTOR_PROCESS_SVG_WIDTH} height={CONNECTOR_PROCESS_SVG_HEIGHT}>
            <defs>
                <linearGradient id="default-linear-gradient" x1="0.5" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
                    <stop offset="0" stopColor="#fcfcfd" />
                    <stop offset="1" stopColor="#f7f8fb" />
                </linearGradient>
                <filter id="default-filter" x="0" y="0" width="62" height="62" filterUnits="userSpaceOnUse">
                    <feOffset dy="1" in="SourceAlpha" />
                    <feGaussianBlur stdDeviation="2" result="blur" />
                    <feFlood floodColor="#a9acb6" floodOpacity="0.388" />
                    <feComposite operator="in" in2="blur" />
                    <feComposite in="SourceGraphic" />
                </filter>
            </defs>
            (
            <ConnectorRectSVG
                onClick={openInCodeView}
                model={componentSTNode}
                diagnostic={diagnostics}
            />
            )
        </svg>
    )
}
