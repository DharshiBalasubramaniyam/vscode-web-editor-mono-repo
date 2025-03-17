/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import styled from '@emotion/styled';
import React from 'react';
import { Icon } from '../Icon/Icon';
import { Badge } from '../Badge/Badge';
export interface CardProps {
    id?: string;
    sx?: any;
    icon: string;
    iconSx?: any;
    title: string;
    isCodicon?: boolean;
    description?: string;
    badgeText?: string;
    onClick?: () => void;
}

export interface CardWrapperProps {
    sx?: any;
}

const CardWraper = styled.div<CardWrapperProps>`
    border: 1px solid var(--vscode-dropdown-border);
    background-color: var(--vscode-dropdown-background);
    padding: 10px;
    cursor: pointer;
    &:hover {
        background-color: var(--vscode-button-background);
    }
    display: flex;
    flex-direction: column;
    ${(props: CardProps) => props.sx};
`;

export interface CardState {
    isHovered: boolean;
}

const CardTitle = styled.div<CardState>`
    font-size: 1.2em;
    color: ${(props: CardState) => (props.isHovered ? 'var(--vscode-button-foreground)' : 'inherit')};
`;

const CardDescription = styled.div<CardState>`
    color: ${(props: CardState) => (props.isHovered ? 'var(--vscode-button-foreground)' : 'inherit')};
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: calc(2em * 1.2);
`;

export const Card: React.FC<CardProps> = (props: CardProps) => {
    const { icon, title, description, onClick, id, sx, isCodicon, iconSx, badgeText } = props;

    const [hovered, setHovered] = React.useState(false);
    const isUrl = (icon: string) => /^(https?:\/\/)/.test(icon);

    return (
        <CardWraper id={id} sx={sx} onClick={onClick} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                {isUrl(icon) ? (
                    <img
                        src={icon}
                        style={{ width: '40px', height: '40px', marginRight: '10px', ...iconSx }}
                        alt="icon"
                    />
                ) : (
                    <Icon
                        isCodicon={isCodicon}
                        name={icon}
                        iconSx={{ fontSize: '1.5em', color: hovered ? 'var(--vscode-button-foreground)' : 'inherit', ...iconSx }}
                        sx={{ marginRight: '10px' }}
                    />)
                }
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', width: '100%' }}>
                    <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <CardTitle isHovered={hovered}>{title}</CardTitle>
                        {badgeText &&
                            <Badge color='var(--vscode-scrollbarSlider-hoverBackground)'><span>{badgeText}</span></Badge>
                        }
                    </div>
                    {description && <CardDescription isHovered={hovered}>{description}</CardDescription>}
                </div>
            </div>
        </CardWraper>
    );
};
