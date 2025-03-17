// tslint:disable: jsx-no-multiline-js

import React, { ReactNode, useContext, useEffect, useState } from "react";

import { STNode } from "@dharshi/syntax-tree";

import { Context } from "../../../../Context/diagram";
import { ErrorSnippet } from "../../../../Types/type";
import { DefaultTooltip } from "../../DefaultTooltip";
interface DiagnosticTooltipProps {
    type?: string,
    className?: string,
    onClick?: () => void,
    text?: { heading?: string, content?: string, example?: string, code?: string },
    diagnostic?: ErrorSnippet,
    icon?: ReactNode;
    model: STNode;
}

export function ActionProcessRectSVG(props: DiagnosticTooltipProps) {
    const { type, onClick, diagnostic, model } = props;
    const diagnosticStyles = diagnostic?.severity === "ERROR" ? "action-processor-error" : "action-processor-warning";
    const actionRectStyles = diagnostic?.diagnosticMsgs ? diagnosticStyles : "action-processor";
    const diagramContext = useContext(Context);
    const showTooltip = diagramContext?.api?.edit?.showTooltip;
    const [tooltipComp, setTooltipComp] = useState(undefined);
    let sourceSnippet;
    if (model) {
        sourceSnippet = model?.source?.trim();
    }

    const rectSVG = (
        <g id="Process" className={actionRectStyles} transform="translate(-221.5 -506)">
            <g transform="matrix(1, 0, 0, 1, 222, 509)">
                <g id="ProcessRect-2" className="connector-process" transform="translate(5.5 4)">
                    <rect width="48" height="48" rx="4" />
                    <rect x="-0.5" y="-0.5" width="49" height="49" rx="4.5" className="click-effect" />
                </g>
            </g>
            {
                (
                    <path
                        id="Icon"
                        className="action-process-icon"
                        d="M136.331,276.637h7.655v1.529h-7.655Zm.017,3.454H144v1.529h-7.655Z"
                        transform="translate(112 258)"
                    />
                )
            }
        </g>
    );

    const defaultTooltip = (
        <DefaultTooltip text={sourceSnippet}>{rectSVG}</DefaultTooltip>
    );

    useEffect(() => {
        if (model && showTooltip) {
            setTooltipComp(showTooltip(rectSVG, undefined, onClick, model));
        }
    }, [model]);

    return (
        <>
            {tooltipComp ? tooltipComp : defaultTooltip}
        </>
    );
}
