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
import { EntryNodeModel } from "./EntryNodeModel";
import { NODE_BORDER_WIDTH, ENTRY_NODE_WIDTH, ENTRY_NODE_HEIGHT } from "../../../resources/constants";
import { Button, Item, Menu, MenuItem, Popover, ImageWithFallback, ThemeColors } from "@dharshi/ui-toolkit";
import { useDiagramContext } from "../../DiagramContext";
import { HttpIcon, TaskIcon } from "../../../resources";
import { MoreVertIcon } from "../../../resources/icons/nodes/MoreVertIcon";
import { CDAutomation, CDFunction, CDService, CDResourceFunction } from "@dharshi/ballerina-core";
import { getEntryNodeFunctionPortName } from "../../../utils/diagram";
import { GraphQLIcon } from "../../../resources/icons/nodes/GraphqlIcon";

type NodeStyleProp = {
    hovered: boolean;
    inactive?: boolean;
};
const Node = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${ThemeColors.ON_SURFACE};
`;

const Header = styled.div<NodeStyleProp>`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 6px;
    width: 100%;
    cursor: pointer;
`;

const TopPortWidget = styled(PortWidget)`
    margin-top: -3px;
`;

const BottomPortWidget = styled(PortWidget)`
    margin-bottom: -2px;
`;

const FunctionPortWidget = styled(PortWidget)`
    /* width: 8px;
        height: 8px;
        background-color: ${ThemeColors.PRIMARY};
        border-radius: 50%;
        margin-left: -5px; */
`;

const StyledText = styled.div`
    font-size: 14px;
`;

const Icon = styled.div`
    padding: 4px;
    max-width: 32px;
    svg {
        fill: ${ThemeColors.ON_SURFACE};
    }
    > div:first-child {
        width: 32px;
        height: 32px;
        font-size: 28px;
    }
`;

const Title = styled(StyledText)<NodeStyleProp>`
    max-width: ${ENTRY_NODE_WIDTH - 80}px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: "GilmerMedium";
    color: ${(props: NodeStyleProp) => (props.hovered ? ThemeColors.PRIMARY : ThemeColors.ON_SURFACE)};
    opacity: ${(props: NodeStyleProp) => (props.inactive && !props.hovered ? 0.7 : 1)};
`;

const Accessor = styled(StyledText)`
    text-transform: uppercase;
    font-family: "GilmerBold";
`;

const Description = styled(StyledText)`
    font-size: 12px;
    max-width: ${ENTRY_NODE_WIDTH - 80}px;
    overflow: hidden;
    text-overflow: ellipsis;
    font-family: monospace;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    color: ${ThemeColors.ON_SURFACE};
    opacity: 0.7;
`;

const Box = styled.div<NodeStyleProp>`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 8px;
    width: 100%;

    border: ${NODE_BORDER_WIDTH}px solid
        ${(props: NodeStyleProp) => (props.hovered ? ThemeColors.PRIMARY : ThemeColors.OUTLINE_VARIANT)};
    border-radius: 8px;
    background-color: ${ThemeColors.SURFACE_DIM};

    padding: 0 8px 8px 8px;
`;

const ServiceBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    gap: 10px;
    width: ${ENTRY_NODE_WIDTH}px;
    height: ${ENTRY_NODE_HEIGHT}px;
    cursor: pointer;
`;

const FunctionBoxWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: ${ThemeColors.ON_SURFACE};
`;

const StyledServiceBox = styled(ServiceBox)<NodeStyleProp>`
    height: 40px;
    padding: 0 12px;

    border: ${NODE_BORDER_WIDTH}px solid
        ${(props: NodeStyleProp) => (props.hovered ? ThemeColors.PRIMARY : ThemeColors.OUTLINE_VARIANT)};
    border-radius: 8px;
    background-color: ${ThemeColors.SURFACE_DIM};
`;

const MenuButton = styled(Button)`
    border-radius: 5px;
`;

const ViewAllButton = styled(FunctionBoxWrapper)`
    color: ${ThemeColors.PRIMARY};
    height: 40px;
    width: 100%;
    cursor: pointer;
    font-family: "GilmerMedium";
    font-size: 14px;
    &:hover {
        border: 1px solid ${ThemeColors.PRIMARY};
        border-radius: 8px;
    }
`;

interface EntryNodeWidgetProps {
    model: EntryNodeModel;
    engine: DiagramEngine;
}

export interface NodeWidgetProps extends Omit<EntryNodeWidgetProps, "children"> {}

export function EntryNodeWidget(props: EntryNodeWidgetProps) {
    const { model, engine } = props;
    const [isHovered, setIsHovered] = React.useState(false);
    const { onServiceSelect, onAutomationSelect, onDeleteComponent } = useDiagramContext();
    const [menuAnchorEl, setMenuAnchorEl] = useState<HTMLElement | SVGSVGElement>(null);
    const isMenuOpen = Boolean(menuAnchorEl);

    const handleOnClick = () => {
        if (model.type === "service") {
            onServiceSelect(model.node as CDService);
        } else {
            onAutomationSelect(model.node as CDAutomation);
        }
    };

    const getNodeIcon = () => {
        switch (model.type) {
            case "automation":
                return <TaskIcon />;
            case "service":
                const serviceType = (model.node as CDService)?.type;
                if (serviceType === "graphql:Service") {
                    return <GraphQLIcon />;
                }
                return <ImageWithFallback imageUrl={(model.node as CDService).icon} fallbackEl={<HttpIcon />} />;
            default:
                return <HttpIcon />;
        }
    };

    const getNodeTitle = () => {
        if (model.node.displayName) {
            return model.node.displayName;
        }
        if ((model.node as CDService).absolutePath) {
            return (model.node as CDService).absolutePath;
        }
        return "";
    };

    const getNodeDescription = () => {
        if (model.type === "automation") {
            return "Automation";
        }
        // Service
        if ((model.node as CDService).type) {
            return (model.node as CDService).type.replace(":Listener", ":Service");
        }
        return "Service";
    };

    const handleOnMenuClick = (event: React.MouseEvent<HTMLElement | SVGSVGElement>) => {
        event.stopPropagation();
        setMenuAnchorEl(event.currentTarget);
    };

    const handleOnMenuClose = () => {
        setMenuAnchorEl(null);
    };

    const menuItems: Item[] = [
        { id: "edit", label: "Edit", onClick: () => handleOnClick() },
        { id: "delete", label: "Delete", onClick: () => onDeleteComponent(model.node) },
    ];

    const serviceFunctions = [];
    if ((model.node as CDService).remoteFunctions?.length > 0) {
        serviceFunctions.push(...(model.node as CDService).remoteFunctions);
    }
    if ((model.node as CDService).resourceFunctions?.length > 0) {
        serviceFunctions.push(...(model.node as CDService).resourceFunctions);
    }

    const hasMoreFunctions = serviceFunctions.length > 3;
    const visibleFunctions = serviceFunctions.slice(0, hasMoreFunctions ? 2 : serviceFunctions.length);

    return (
        <Node>
            <TopPortWidget port={model.getPort("in")!} engine={engine} />
            <Box hovered={isHovered}>
                <ServiceBox
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={handleOnClick}
                >
                    <Icon>{getNodeIcon()}</Icon>
                    <Header hovered={isHovered} onClick={handleOnClick}>
                        <Title hovered={isHovered}>{getNodeTitle()}</Title>
                        <Description>{getNodeDescription()}</Description>
                    </Header>
                    <MenuButton appearance="icon" onClick={handleOnMenuClick}>
                        <MoreVertIcon />
                    </MenuButton>
                </ServiceBox>
                {visibleFunctions.map((serviceFunction) => (
                    <FunctionBox
                        key={getEntryNodeFunctionPortName(serviceFunction)}
                        func={serviceFunction}
                        model={model}
                        engine={engine}
                    />
                ))}
                {hasMoreFunctions && (
                    <ViewAllButton onClick={handleOnClick}>
                        View all resources ({serviceFunctions.length})
                    </ViewAllButton>
                )}
            </Box>
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
            <BottomPortWidget port={model.getPort("out")!} engine={engine} />
        </Node>
    );
}

function FunctionBox(props: { func: CDFunction | CDResourceFunction; model: EntryNodeModel; engine: DiagramEngine }) {
    const { func, model, engine } = props;
    const [isHovered, setIsHovered] = useState(false);
    const { onFunctionSelect } = useDiagramContext();
    const isGraphQL = (model.node as CDService)?.type === "graphql:Service";

    const handleOnClick = () => {
        onFunctionSelect(func);
    };

    const getAccessorDisplay = (accessor: string, isGraphQL: boolean): string => {
        if (!isGraphQL) {
            return accessor;
        }

        if (accessor === "get") return "Query";
        if (accessor === "subscribe") return "Subscription";
        return accessor;
    };

    return (
        <FunctionBoxWrapper>
            <StyledServiceBox
                hovered={isHovered}
                onClick={() => handleOnClick()}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {(func as CDResourceFunction).accessor && (
                    <Accessor>{getAccessorDisplay((func as CDResourceFunction).accessor, isGraphQL)}</Accessor>
                )}
                {isGraphQL && !(func as CDResourceFunction).accessor && (func as CDFunction).name && (
                    <Accessor>Mutation</Accessor>
                )}
                {(func as CDResourceFunction).path && (
                    <Title hovered={isHovered}>/{(func as CDResourceFunction).path}</Title>
                )}
                {(func as CDFunction).name && <Title hovered={isHovered}>{(func as CDFunction).name}</Title>}
            </StyledServiceBox>
            <FunctionPortWidget port={model.getPort(getEntryNodeFunctionPortName(func))!} engine={engine} />
        </FunctionBoxWrapper>
    );
}
