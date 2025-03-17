import styled from "@emotion/styled";
import React, { forwardRef, PropsWithChildren } from "react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

export interface ButtonWrapperProps {
    sx?: React.CSSProperties;
}

export interface ButtonProps {
    id?: string;
    className?: string;
    appearance?: "primary" | "secondary" | "icon";
    tooltip?: string;
    disabled?: boolean;
    sx?: React.CSSProperties;
    buttonSx?: React.CSSProperties;
    onClick?: (() => void) | ((event: React.MouseEvent<HTMLElement | SVGSVGElement>) => void);
}

export const IconLabel = styled.div`
    // To hide label in small screens
    margin-left: 2px;
    @media (max-width: 320px) {
      display: none;
    }
`;

export const ButtonWrapper = styled.div<ButtonWrapperProps>`
    display: flex;
    height: fit-content;
    width: fit-content;
    ${(props: ButtonWrapperProps) => props.sx}
`;

export const Button = forwardRef<HTMLDivElement, PropsWithChildren<ButtonProps>>((props, ref) => {
    const { id, className, disabled, appearance = "primary", tooltip, children, onClick, sx, buttonSx, ...rest } = props;

    return (
        // Workaround for button not being disabled when disabled prop is passed
        <ButtonWrapper ref={ref} id={id} className={className} sx={sx}>
            <VSCodeButton style={buttonSx} appearance={appearance} onClick={onClick} title={tooltip} disabled={(disabled ? true : undefined)} {...rest}>
                {children}
            </VSCodeButton>
        </ButtonWrapper>
    );
});
Button.displayName = "Button";
