import React from "react";
import "@dharshi/font-wso2-vscode/dist/wso2-vscode.css";

import styled from "@emotion/styled";

interface IconContainerProps {
    sx?: any;
}

const IconContainer = styled.div<IconContainerProps>`
    height: 16px;
    width: 14px;
    cursor: pointer;
    ${(props: IconContainerProps) => props.sx};
`;

export interface IconProps {
    id?: string;
    className?: string;
	name: string; // Identifier for the icon
    sx?: any;
    iconSx?: any;
    isCodicon?: boolean;
    onClick?: () => void;
}

export const Icon: React.FC<IconProps> = (props: IconProps) => {
    const { id, className, name, sx, iconSx, isCodicon, onClick } = props;
    const handleComponentClick = () => {
        onClick && onClick();
    }
    const icon = isCodicon ? <i style= {iconSx} className={`codicon codicon-${name}`} /> : <i style={iconSx} className={`fw-${name}`} />;
    return (
        <IconContainer id={id} className={className} sx={sx} onClick={handleComponentClick}>
            {icon}
        </IconContainer>
    );
};
