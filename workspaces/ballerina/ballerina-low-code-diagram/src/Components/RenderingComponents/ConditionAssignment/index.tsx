// tslint:disable: jsx-no-multiline-js align  jsx-wrap-multiline
import React, { ReactElement, useContext, useEffect, useState } from "react";

import classNames from "classnames";

import { Context } from "../../../Context/diagram";
import { DefaultConfig } from "../../../Visitors/default";
import { DefaultTooltip } from "../DefaultTooltip";

import "./style.scss"

export let CONDITION_ASSIGNMENT_NAME_WIDTH = 125;

export function ConditionAssignment(props: { x: number, y: number, assignment: string, className?: string, key_id: number }) {
    const { assignment, className, key_id, ...xyProps } = props;
    const [textWidth, setTextWidth] = useState(CONDITION_ASSIGNMENT_NAME_WIDTH);
    const diagramContext = useContext(Context);
    const showTooltip = diagramContext?.api?.edit?.showTooltip;
    const [tooltip, setTooltip] = useState(undefined);

    useEffect(() => {
        setTextWidth(document.getElementById("textLegnth_" + key_id)?.getBoundingClientRect().width);
    }, []);

    const assignmentMaxWidth = assignment?.length >= 15;
    const assignmentWidth = textWidth
    let assignmentX = 0;

    assignmentX = (assignmentWidth > CONDITION_ASSIGNMENT_NAME_WIDTH) ? CONDITION_ASSIGNMENT_NAME_WIDTH - DefaultConfig.dotGap : assignmentX = (CONDITION_ASSIGNMENT_NAME_WIDTH - assignmentWidth - (DefaultConfig.dotGap * 2));
    const assignemtComponant: ReactElement = (
        <text
            className={classNames("assignment-text", className)}
            id="Assignment_text"
            transform="translate(15 11)"
        >
            <tspan x={assignmentX} y="0" id={"textLegnth_" + key_id}>  {assignmentMaxWidth ? assignment.slice(0, 16) + "..." : assignment} </tspan>
        </text>
    );

    const defaultTooltip = (
        <DefaultTooltip text={{ heading: assignment }}>{assignemtComponant}</DefaultTooltip>
    );

    useEffect(() => {
        if (assignment && showTooltip) {
            setTooltip(showTooltip(assignemtComponant, assignment));
        }
    }, [assignment]);

    return (
        <svg {...xyProps}>
            {assignmentMaxWidth ? tooltip ? tooltip : defaultTooltip : assignemtComponant}
        </svg >
    );
}
