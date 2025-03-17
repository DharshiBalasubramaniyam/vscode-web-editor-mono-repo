// tslint:disable: jsx-no-multiline-js align  jsx-wrap-multiline
import React, { ReactElement, useContext, useEffect, useState } from "react";

import classNames from "classnames";

import { Context } from "../../../Context/diagram";
import { DefaultTooltip } from "../DefaultTooltip";

import "./style.scss";

export let ASSIGNMENT_NAME_WIDTH = 125;

export function Assignment(props: { x: number, y: number, assignment: string, className?: string, key_id: number, textAnchor?: string }) {
    const { assignment, className, key_id, textAnchor, ...xyProps } = props;
    const [textWidth, setTextWidth] = useState(ASSIGNMENT_NAME_WIDTH);
    const diagramContext = useContext(Context);
    const showTooltip = diagramContext?.api?.edit?.showTooltip;
    const [tooltip, setTooltip] = useState(undefined);
    useEffect(() => {
        setTextWidth(document.getElementById("textLegnth_" + key_id)?.getBoundingClientRect().width);
    }, []);

    const assignmentMaxWidth = assignment?.length >= 16;

    const assignmentComponent: ReactElement = (
        <text
            className={classNames("assignment-text", className)}
            id="Assignment_text"
            transform="translate(4 13.5)"
            textAnchor={textAnchor}
        >
            <tspan x="0" y="0">{assignmentMaxWidth ? assignment.slice(0, 16) + "..." : assignment}</tspan>
        </text>
    );

    const defaultTooltip = (
        <DefaultTooltip text={{ heading: assignment }}>{assignmentComponent}</DefaultTooltip>
    );

    useEffect(() => {

        if (assignmentMaxWidth && showTooltip) {
            setTooltip(showTooltip(assignmentComponent, assignment));
        }
    }, [assignment]);

    return (
        <svg {...xyProps} className="assignment-expression">
            {assignmentMaxWidth && tooltip ? tooltip : defaultTooltip}
        </svg>
    );
}
