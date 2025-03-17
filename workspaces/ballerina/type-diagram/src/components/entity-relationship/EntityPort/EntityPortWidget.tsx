
import React, { CSSProperties } from 'react';
import { DiagramEngine, PortModelAlignment, PortWidget } from '@projectstorm/react-diagrams';
import { EntityPortModel } from './EntityPortModel';
import { inclusionPortStyles, sidePortStyles } from './styles';

interface CustomPortProps {
    port: EntityPortModel;
    engine: DiagramEngine;
}

export function EntityPortWidget(props: CustomPortProps) {
    const { port, engine } = props;
    const portStyles: CSSProperties = port.getOptions().alignment === PortModelAlignment.LEFT ?
        { left: 0, ...sidePortStyles } : port.getOptions().alignment === PortModelAlignment.RIGHT ?
            { right: 0, ...sidePortStyles } : port.getOptions().alignment === PortModelAlignment.TOP ?
                { top: 0, ...inclusionPortStyles } : { bottom: 0, ...inclusionPortStyles };

    return (
        <PortWidget
            engine={engine}
            port={port}
            style={portStyles}
        />
    )
}
