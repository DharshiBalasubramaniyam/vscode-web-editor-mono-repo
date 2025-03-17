
import React from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/react";
import "./../resources/assets/font/fonts.css";
import { ThemeColors } from "@dharshi/ui-toolkit";
export interface DiagramCanvasProps {
    color?: string;
    background?: string;
    children?: React.ReactNode;
}

export namespace DiagramStyles {
    export const Container = styled.div<{ color: string; background: string }>`
        height: 100%;
        background-size: 50px 50px;
        display: flex;

        > * {
            height: 100%;
            min-height: 100%;
            width: 100%;
        }

        background-image: radial-gradient(${ThemeColors.SURFACE_CONTAINER} 10%, transparent 0px);
        background-size: 16px 16px;
        background-color: ${ThemeColors.SURFACE_BRIGHT};
        font-family: "GilmerRegular";
    `;

    export const Expand = css`
        html,
        body,
        #root {
            height: 100%;
        }
    `;
}

export function DiagramCanvas(props: DiagramCanvasProps) {
    const { color, background, children } = props;
    return (
        <>
            <Global styles={DiagramStyles.Expand} />
            <DiagramStyles.Container
                background={background || ThemeColors.SURFACE_BRIGHT}
                color={color || ThemeColors.ON_SURFACE}
            >
                {children}
            </DiagramStyles.Container>
        </>
    );
}
