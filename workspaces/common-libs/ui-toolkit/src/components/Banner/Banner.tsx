/**
 * Copyright (c) 2025, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import React, { ReactNode } from "react";
import "@vscode/codicons/dist/codicon.css";

import styled from "@emotion/styled";
import { Codicon } from "../Codicon/Codicon";
import Typography from "../Typography/Typography";

interface ContainerProps {
    sx?: any;
    type?: "info" | "warning" | "error" | "success";
}

const BannerContainer = styled.div<ContainerProps>`
    display: flex;
    flex-direction: row;
    padding: 10px;
    background-color: ${(props: ContainerProps) => {
        switch (props.type) {
            case "info":
                return "var(--vscode-editorInfo-foreground)";
            case "warning":
                return "var(--vscode-editorWarning-foreground)";
            case "error":
                return "var(--vscode-charts-red)";
            case "success":
                return "var(--vscode-statusBarItem-remoteBackground)";
            default:
                return "var(--vscode-editorInfo-foreground)";
        }
    }};
    color: white;
    border-radius: 4px;
    ${(props: ContainerProps) => props.sx};
`;

const IconContainer = styled.div<ContainerProps>`
    margin-right: 12px;
    vertical-align: middle;
    ${(props: ContainerProps) => props.sx};
`;

const Msg = styled.div<ContainerProps>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    white-space: break-spaces;
    ${(props: ContainerProps) => props.sx};
`;

const CloseButton = styled.div<ContainerProps>`
    display: flex;
    margin-left: auto;
    ${(props: ContainerProps) => props.sx};
`;

export interface BannerProps {
    id?: string;
    className?: string;
	icon?: ReactNode;
    type?: "info" | "warning" | "error" | "success";
    message: string;
    title?: string;
    containerSx?: any;
    iconContainerSx?: any;
    msgSx?: any;
    messageTextSx?: any;
    titleSx?: any;
    closeBtnSx?: any;
    onClose?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Banner: React.FC<BannerProps> = (props: BannerProps) => {
    const { id, className, icon, title, message, type, containerSx, iconContainerSx, msgSx, closeBtnSx, titleSx, messageTextSx, onClose } = props;

    return (
        <BannerContainer id={id} className={className} sx={containerSx} type={type}>
            {icon && (<IconContainer sx={iconContainerSx}>{icon}</IconContainer>)}
            <Msg sx={msgSx}>
                {title && (<Typography variant="h3" sx={{margin: 0, ...titleSx}}>{title}</Typography>)}
                <Typography variant="body1" sx={{margin: 0, ...messageTextSx}}>{message}</Typography>
            </Msg>
            {onClose && (
                <CloseButton sx={closeBtnSx} onClick={onClose}>
                    <Codicon iconSx={{cursor: "ponter"}} name='close' />
                </CloseButton>
            )}
        </BannerContainer>
    );
};
