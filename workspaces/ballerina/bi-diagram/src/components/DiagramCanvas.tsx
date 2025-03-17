
import React from "react";
import { css, Global } from "@emotion/react";
import styled from "@emotion/styled";
import "../resources/assets/font/fonts.css";
import { useDiagramContext } from "./DiagramContext";
import { ThemeColors } from "@dharshi/ui-toolkit";

export interface DiagramCanvasProps {
    color?: string;
    background?: string;
    children?: React.ReactNode;
}

export namespace DiagramStyles {
    export const Container = styled.div<{ color: string; background: string; locked?: boolean }>`
        height: 100%;
        background-size: 50px 50px;
        display: flex;
        pointer-events: ${(props) => (props.locked ? "none" : "auto")};

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
    const { lockCanvas } = useDiagramContext();

    return (
        <>
            <Global styles={DiagramStyles.Expand} />
            <DiagramStyles.Container
                id="bi-diagram-canvas"
                background={background || ThemeColors.SURFACE_BRIGHT}
                color={color || ThemeColors.ON_SURFACE}
                locked={lockCanvas}
            >
                {children}
            </DiagramStyles.Container>
        </>
    );
}
