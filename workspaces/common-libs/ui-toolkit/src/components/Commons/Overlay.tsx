import styled from "@emotion/styled";
import React from "react";
export interface OverlayProps {
    id?: string;
    className?: string;
    onClose?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
    sx?: any;
}

const OverlayContainer = styled.div<OverlayProps>`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1000;
    ${(props: OverlayProps) => props.sx};
`;

export const Overlay: React.FC<OverlayProps> = (props: OverlayProps) => {
    const { id, className, sx, onClose } = props;

    return (
        <OverlayContainer id={id} className={className} sx={sx} onClick={onClose} />
    );
};
