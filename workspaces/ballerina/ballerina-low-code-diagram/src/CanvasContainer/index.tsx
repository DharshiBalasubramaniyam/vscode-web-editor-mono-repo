import React from "react";

export interface CanvasDiagramProps {
    children?: React.ReactElement | React.ReactElement[],
}

export function CanvasDiagram(props: CanvasDiagramProps) {
    const { children } = props;

    return (
        <div style={{display: 'flex', flexDirection: 'column'}}>
            {children}
        </div>
    );
}
