import React from "react";

import { BlockViewState, CollapseViewState } from "../../../ViewState";
import { DefaultConfig } from "../../../Visitors";
import { COLLAPSE_SVG_HEIGHT, COLLAPSE_SVG_WIDTH } from "../ForEach/ColapseButtonSVG";

import { CollapseButtonSVG } from "./CollapseButtonSVG";
import { CollapsedComponentSVG } from "./CollapsedComponentSVG";
import { ExpandedContainer } from "./ExpandedContainer";

interface CollapseProps {
    collapseVS: CollapseViewState;
    onExpandClick?: () => void;
    onCollapseClick?: () => void;
}


export default function CollapseComponent(props: CollapseProps) {
    const { collapseVS, onExpandClick, onCollapseClick } = props;
    const x = collapseVS.bBox.cx;
    const y = collapseVS.bBox.cy;
    return (
        <g >
            {collapseVS.collapsed && <CollapsedComponentSVG x={x} y={y} onExpandClick={onExpandClick} />}
            {!collapseVS.collapsed && <ExpandedContainer collapseVS={collapseVS} onCollapseClick={onCollapseClick} />}
        </g>
    )
}
