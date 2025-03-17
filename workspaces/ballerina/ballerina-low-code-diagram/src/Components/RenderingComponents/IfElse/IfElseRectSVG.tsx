
import React, { ReactElement, ReactNode, useContext, useEffect, useState } from "react";

import { STNode } from "@dharshi/syntax-tree";

import { Context } from "../../../Context/diagram";
import { DefaultTooltip } from "../DefaultTooltip";
interface IfElseRectSVGProps {
    type?: string,
    className?: string,
    onClick?: () => void,
    text?: { heading?: string, content?: string, example?: string, code?: string },
    icon?: ReactNode;
    model: STNode
}

export function IfElseRectSVG(props: IfElseRectSVGProps) {
    const { onClick, icon, className, model } = props;
    const diagramContext = useContext(Context);
    const showTooltip = diagramContext?.api?.edit?.showTooltip;
    const [tooltipComp, setTooltipComp] = useState(undefined);
    let sourceSnippet;
    if (model) {
        sourceSnippet = model?.source?.trim().split(')')[0];
    }

    const component = (
        <g id="IfElse" className={className} transform="translate(7 6)">
            <g transform="matrix(1, 0, 0, 1, -7, -6)" >
                <g id="IfElsePolygon" transform="translate(33.5, 3) rotate(45)">
                    <rect width="40.903" height="40.903" className="if-else-rect" rx="6" stroke="none" />
                    <rect x="0.5" y="0.5" width="39.903" className="if-else-rect click-effect" height="39.903" rx="5.5" fill="none" />
                </g>
            </g>
            {icon}
        </g>
    );

    const defaultTooltip = (
        <DefaultTooltip text={sourceSnippet}>{component}</DefaultTooltip>
    );

    useEffect(() => {
        if (model && showTooltip) {
            setTooltipComp(showTooltip(component, undefined, onClick, model));
        }
    }, [model]);

    return (
        <>
            {tooltipComp ? tooltipComp : defaultTooltip}
        </>
    );
}
