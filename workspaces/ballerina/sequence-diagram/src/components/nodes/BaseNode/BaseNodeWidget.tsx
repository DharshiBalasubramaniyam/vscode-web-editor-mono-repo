
import React from "react";
import styled from "@emotion/styled";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { ThemeColors } from "@dharshi/ui-toolkit";
import { BaseNodeModel } from "./BaseNodeModel";
import { NODE_HEIGHT, NODE_WIDTH } from "../../../resources/constants";
import { Node } from "../../../utils/types";

export namespace BaseNodeStyles {
    export type NodeStyleProp = {
        hovered: boolean;
    };
    export const Node = styled.div<NodeStyleProp>`
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        min-width: ${NODE_WIDTH}px;
        min-height: ${NODE_HEIGHT}px;
        padding: 0 8px;
        border: 1.5px solid ${(props: NodeStyleProp) => (props.hovered ? ThemeColors.PRIMARY : ThemeColors.OUTLINE_VARIANT)};
        border-radius: 10px;
        background-color: ${ThemeColors.SURFACE_DIM};
        color: ${ThemeColors.ON_SURFACE};
    `;

    export const TopPortWidget = styled(PortWidget)`
        margin-top: -3px;
    `;

    export const BottomPortWidget = styled(PortWidget)`
        margin-bottom: -2px;
    `;
}

interface BaseNodeWidgetProps {
    model: BaseNodeModel;
    engine: DiagramEngine;
    onClick?: (node: Node) => void;
}

export interface NodeWidgetProps extends Omit<BaseNodeWidgetProps, "children"> {}

export function BaseNodeWidget(props: BaseNodeWidgetProps) {
    const { model, engine, onClick } = props;
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <BaseNodeStyles.Node
            hovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <BaseNodeStyles.TopPortWidget port={model.getLeftPort()!} engine={engine} />
            <BaseNodeStyles.BottomPortWidget port={model.getRightPort()!} engine={engine} />
        </BaseNodeStyles.Node>
    );
}
