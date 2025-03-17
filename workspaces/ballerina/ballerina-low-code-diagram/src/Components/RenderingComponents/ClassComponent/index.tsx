import React, { useState } from "react";

import { ClassDefinition } from "@dharshi/syntax-tree";

import { ClassHeader } from "./ClassHeader";
import './style.scss'

export interface ClassComponentProps {
    model: ClassDefinition
}

export function ClassComponent(props: ClassComponentProps) {
    const { model } = props;
    const [isExpanded, setIsExpanded] = useState(false);

    const onExpandClick = () => {
        setIsExpanded(!isExpanded);
    }

    return (
        <div className={'class-component'}>
            <ClassHeader model={model} onExpandClick={onExpandClick} isExpanded={isExpanded} />
        </div>
    );
}
