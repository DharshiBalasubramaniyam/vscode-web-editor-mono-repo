import React from "react";
import styled from "@emotion/styled";

const BadgeContainer = styled.div`
    display: inline-block;
    padding: 2px 6px;
    border-radius: 8px;
    color: white;
    font-size: 11px;
`;

export interface BadgeProps {
    color?: string;
    children?: React.ReactNode;
    sx?: any;
}

export const Badge: React.FC<BadgeProps> = (props: BadgeProps) => {
    return <BadgeContainer style={{ backgroundColor: props.color }}>{props.children}</BadgeContainer>;
};
