import React from "react";
import "@vscode/codicons/dist/codicon.css";

import styled from "@emotion/styled";

interface CodiconContainerProps {
    sx?: any;
}

const CodiconContainer = styled.div<CodiconContainerProps>`
    height: 16px;
    width: 14px;
    cursor: pointer;
    ${(props: CodiconContainerProps) => props.sx};
`;

export interface CodiconProps {
    id?: string;
    className?: string;
	name: string; // Identifier for the icon
    sx?: any;
    iconSx?: any;
    onClick?: (event?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
}

export const Codicon: React.FC<CodiconProps> = (props: CodiconProps) => {
    const { id, className, name, sx, iconSx, onClick } = props;
    const handleComponentClick = (event?: React.MouseEvent<HTMLElement, MouseEvent>) => {
        onClick && onClick(event);
    }
    const icon = (<i style= {iconSx} className={`codicon codicon-${name}`} />);
    
    return (
        <CodiconContainer id={id} className={className} sx={sx} onClick={handleComponentClick}>
            {icon}
        </CodiconContainer>
    );
};
