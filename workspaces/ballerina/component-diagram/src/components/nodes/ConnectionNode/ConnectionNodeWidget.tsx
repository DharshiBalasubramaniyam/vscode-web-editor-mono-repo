/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import React, { useState } from "react";
import styled from "@emotion/styled";
import { DiagramEngine, PortWidget } from "@projectstorm/react-diagrams-core";
import { ConnectionNodeModel } from "./ConnectionNodeModel";
import { NODE_BORDER_WIDTH, CON_NODE_WIDTH, CON_NODE_HEIGHT } from "../../../resources/constants";
import { Button, Item, Menu, MenuItem, Popover, ThemeColors } from "@dharshi/ui-toolkit";
import { useDiagramContext } from "../../DiagramContext";
import { DatabaseIcon, LinkIcon } from "../../../resources";
import { MoreVertIcon } from "../../../resources/icons/nodes/MoreVertIcon";

type NodeStyleProp = {
    hovered: boolean;
    inactive?: boolean;
};

const Node = styled.div<NodeStyleProp>`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    height: ${CON_NODE_HEIGHT}px;
    color: ${ThemeColors.ON_SURFACE};
    cursor: pointer;
`;

const Header = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 6px;
`;

const Circle = styled.div<NodeStyleProp>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: ${CON_NODE_HEIGHT}px;
    height: ${CON_NODE_HEIGHT}px;
    border: ${NODE_BORDER_WIDTH}px solid
        ${(props: NodeStyleProp) => (props.hovered ? ThemeColors.PRIMARY : ThemeColors.OUTLINE_VARIANT)};
    border-radius: 50%;
    background-color: ${ThemeColors.SURFACE_DIM};
    color: ${ThemeColors.ON_SURFACE};
`;

const MenuButton = styled(Button)`
    border-radius: 5px;
`;

const LeftPortWidget = styled(PortWidget)`
    margin-top: -3px;
`;

const RightPortWidget = styled(PortWidget)`
    margin-bottom: -2px;
`;

const StyledText = styled.div`
    font-size: 14px;
`;

const Icon = styled.div`
    padding: 4px;
    svg {
        fill: ${ThemeColors.ON_SURFACE};
    }
`;

const Title = styled(StyledText)<NodeStyleProp>`
    max-width: ${CON_NODE_WIDTH - 50}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "GilmerMedium";
    color: ${(props: NodeStyleProp) => (props.hovered ? ThemeColors.PRIMARY : ThemeColors.ON_SURFACE)};
    opacity: ${(props: NodeStyleProp) => (props.inactive && !props.hovered ? 0.7 : 1)};
`;

const Description = styled(StyledText)`
    font-size: 12px;
    max-width: ${CON_NODE_WIDTH - CON_NODE_HEIGHT}px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: monospace;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${ThemeColors.ON_SURFACE};
    opacity: 0.7;
`;

const Row = styled.div<NodeStyleProp>`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 12px;
    width: 100%;
`;

interface ConnectionNodeWidgetProps {
    model: ConnectionNodeModel;
    engine: DiagramEngine;
}

export interface NodeWidgetProps extends Omit<ConnectionNodeWidgetProps, "children"> {}

export function ConnectionNodeWidget(props: ConnectionNodeWidgetProps) {
    const { model, engine } = props;
    const [isHovered, setIsHovered] = React.useState(false);
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | SVGSVGElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const { onConnectionSelect, onDeleteComponent } = useDiagramContext();
    // TODO: fix this database icon hack with icon prop from node model
    const databaseNames = [
        "MySQL",
        "PostgreSQL",
        "Oracle",
        "SQL Server",
        "Redis",
        "Derby",
        "SQLite",
        "MongoDB",
        "MariaDB",
    ];
    const hasDatabaseName = databaseNames.some((name) => model.node.symbol?.toLowerCase().includes(name.toLowerCase()));

    const handleOnClick = () => {
        onConnectionSelect(model.node);
    };

    const handleOnMenuClick = (event: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
        event.stopPropagation();
        setMenuAnchorEl(event.currentTarget);
    };

    const handleOnMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const getNodeTitle = () => {
        return model.node.symbol;
    };

    const getNodeDescription = () => {
        return "Connection";
    };

    const menuItems: Item[] = [
        { id: "edit", label: "Edit", onClick: () => handleOnClick() },
        { id: "delete", label: "Delete", onClick: () => onDeleteComponent(model.node) },
    ];

    return (
        <Node
            hovered={isHovered}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleOnClick}
        >
            <LeftPortWidget port={model.getPort("in")!} engine={engine} />
            <Row hovered={isHovered}>
                <Circle hovered={isHovered}>
                    <Icon>{hasDatabaseName ? <DatabaseIcon /> : <LinkIcon />}</Icon>
                </Circle>
                <Header>
                    <Title hovered={isHovered}>{getNodeTitle()}</Title>
                    <Description>{getNodeDescription()}</Description>
                </Header>
                <MenuButton appearance="icon" onClick={handleOnMenuClick}>
                    <MoreVertIcon />
                </MenuButton>
            </Row>
            <Popover
                open={isMenuOpen}
                anchorEl={menuAnchorEl}
                handleClose={handleOnMenuClose}
                sx={{
                    padding: 0,
                    borderRadius: 0,
                }}
            >
                <Menu>
                    {menuItems.map((item) => (
                        <MenuItem key={item.id} item={item} />
                    ))}
                </Menu>
            </Popover>
            <RightPortWidget port={model.getPort("out")!} engine={engine} />
        </Node>
    );
}
