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

interface ToggleContainerProps {
    sx?: any;
    active?: boolean;
    disabled?: boolean;
}

const ToggleContainer = styled.div<ToggleContainerProps>`
    display: flex;
    align-items: center;
    justify-content: ${(props: ToggleContainerProps) => (props.active ? "flex-end" : "flex-start")};
    height: 22px;
    width: 40px;
    background-color: var(--vscode-input-background);
    border: 1px solid var(--vscode-dropdown-border);
    padding: 2px;
    cursor: ${(props: ToggleContainerProps) => (props.disabled ? "not-allowed" : "pointer")};
    opacity: ${(props: ToggleContainerProps) => (props.disabled ? 0.5 : 1)};
    transition: background-color 0.3s ease, justify-content 0.3s ease;
    ${(props: ToggleContainerProps) => props.sx};
`;

interface TogglePillProps {
    active?: boolean;
}

const TogglePill = styled.div<TogglePillProps>`
    height: 16px;
    width: 16px;
    background-color: ${(props: TogglePillProps) =>
        props.active ? "var(--vscode-button-background)" : "var(--vscode-dropdown-border)"};
    transition: transform 0.5s ease;
`;

export interface ToggleProps {
    id?: string;
    className?: string;
    sx?: any;
    checked: boolean;
    disabled?: boolean;
    readonly?: boolean;
    onChange: (state: boolean) => void;
}

export const Toggle: React.FC<ToggleProps> = (props: ToggleProps) => {
    const { id, className, sx, checked, disabled, readonly, onChange } = props;

    const [active, setActive] = useState(checked);

    const handleClick = () => {
        if (disabled || readonly) return;
        const newState = !active;
        onChange(newState);
        setActive(newState);
    };

    return (
        <ToggleContainer
            id={id}
            className={className}
            sx={sx}
            active={active}
            disabled={disabled}
            onClick={handleClick}
        >
            <TogglePill active={active} />
        </ToggleContainer>
    );
};
