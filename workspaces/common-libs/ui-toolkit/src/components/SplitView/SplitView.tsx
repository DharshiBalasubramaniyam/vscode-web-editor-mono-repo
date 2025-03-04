/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */

import styled from "@emotion/styled";
import React from "react";
import { ReactNode, useState, useRef } from "react";

interface SplitViewProps {
    children: ReactNode[];
    sx?: any;
    dynamicContainerSx?: any;
    defaultWidths?: number[];
}

const Container = styled.div<SplitViewProps>`
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
    ${(props: SplitViewProps) => props.sx};
`;

const DynamicDiv = styled.div<{ width: number, lastChild: boolean, sx: any }>`
    width: ${(props: { width: number; }) => props.width}%;
    overflow: auto;
    border-right: ${(props: { lastChild: boolean; }) => props.lastChild ? "none" : "1px solid var(--vscode-editorWidget-border)"};
    ${(props: SplitViewProps) => props.sx};
`;

const Resizer = styled.div`
    cursor: ew-resize;
    width: 2px;
    &:hover {
        background-color: var(--vscode-button-hoverBackground);
    }
`;

export function SplitView(props: SplitViewProps) {
    const { children, sx, dynamicContainerSx, defaultWidths } = props;
    const initialWidths = defaultWidths || new Array(children.length).fill(100 / children.length); // Use default widths if provided

    const [widths, setWidths] = useState<number[]>(initialWidths);
    const resizingRef = useRef<{ index: number; startX: number; initialWidths: number[] } | null>(null);

    const handleMouseDown = (index: number, e: React.MouseEvent) => {
        // Store initial values
        resizingRef.current = {
            index,
            startX: e.clientX,
            initialWidths: [...widths],
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (resizingRef.current) {
                const { startX, index, initialWidths } = resizingRef.current;
                const deltaX = e.clientX - startX;
                const deltaWidth = (deltaX / window.innerWidth) * 100;

                const newWidths = [...initialWidths];
                newWidths[index] = Math.min(Math.max(initialWidths[index] + deltaWidth, 10), 90); // Min 10%, Max 90%
                newWidths[index + 1] = Math.min(Math.max(initialWidths[index + 1] - deltaWidth, 10), 90);

                // Use requestAnimationFrame to sync with the browser's repaint cycle
                requestAnimationFrame(() => {
                    setWidths(newWidths);
                });
            }
        };

        const handleMouseUp = () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
            resizingRef.current = null;
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <Container sx={sx}>
            {children.map((child, index) => (
                <>
                    <DynamicDiv key={index} sx={dynamicContainerSx} width={widths[index]} lastChild={index === children.length - 1}>
                        {child}
                    </DynamicDiv>
                    {index < children.length - 1 && (
                        <Resizer key={`resizer-${index}`} onMouseDown={e => handleMouseDown(index, e)} />
                    )}
                </>
            ))}
        </Container>
    );
}
