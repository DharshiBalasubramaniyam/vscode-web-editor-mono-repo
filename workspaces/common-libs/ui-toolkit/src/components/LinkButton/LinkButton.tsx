import React, { PropsWithChildren } from "react";

import styled from "@emotion/styled";

interface LinkContainerProps {
    sx?: any;
}

const LinkContainer = styled.div<LinkContainerProps>`
    display: flex;
    flex-direction: row;
    height: 24px;
    align-items: center;
    width: fit-content;
    cursor: pointer;
    font-size: 0.875rem;
    min-width: 64px;
    box-sizing: border-box;
    font-weight: 500;
    border-radius: 4px;
    gap: 8px;
    color: var(--vscode-textLink-foreground);
    &:hover, &.active {
        background: var(--vscode-editor-lineHighlightBorder);
    };
    ${(props: LinkContainerProps) => props.sx};
`;

export interface LinkButtonProps {
    id?: string;
    className?: string;
    sx?: any;
    onClick?: () => void;
}

export const LinkButton: React.FC<PropsWithChildren<LinkButtonProps>> = 
    (props: PropsWithChildren<LinkButtonProps>) => {
        const { id, className, children, sx, onClick } = props;
        const handleComponentClick = () => {
            onClick();
        }
        return (
            <LinkContainer id={id} className={className} sx={sx} onClick={handleComponentClick}>
                {children}
            </LinkContainer>
        );
    };
