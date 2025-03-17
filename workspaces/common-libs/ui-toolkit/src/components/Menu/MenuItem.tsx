import React from "react";
import styled from "@emotion/styled";
import { Item } from "./Menu";

export interface MenuItemProps {
    item: Item;
    sx?: any;
    onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

interface ContainerProps {
    sx: any;
}

const Container = styled.div<ContainerProps>`
    text-align: left;
    display: flex;
    align-items: center;
    padding: 6px 10px;
    cursor: pointer;
    &:hover, &.active {
        color: var(--vscode-button-foreground);
        background: var(--vscode-button-background);
    };
    ${(props: ContainerProps) => props.sx};
`;

export const MenuItem: React.FC<MenuItemProps> = (props: MenuItemProps) => {
    const { sx, item, onClick } = props;

    const handleItemClick = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (item?.onClick) {
            event.stopPropagation();
            item.onClick();
        }
        if (onClick) {
            onClick(event);
        }
    }

    return (
        <Container
            key={item.id}
            onClick={handleItemClick}
            sx={sx}
            id={`menu-item-${item.id}`}
        >
            {item.label}
        </Container>
    );
};
