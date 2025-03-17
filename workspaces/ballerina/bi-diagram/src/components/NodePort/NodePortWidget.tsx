
import React from 'react';
import { PortWidget } from '@projectstorm/react-diagrams-core';
import { NodePortModel } from './NodePortModel';

interface NodePortWidgetProps {
    port: NodePortModel;
    engine: any;
}

export const NodePortWidget: React.FC<NodePortWidgetProps> = ({ port, engine }) => {
    return (
        <PortWidget engine={engine} port={port}>
            <div style={{
                width: '10px',
                height: '10px',
                backgroundColor: '#000',
                borderRadius: '50%',
            }} />
        </PortWidget>
    );
};
