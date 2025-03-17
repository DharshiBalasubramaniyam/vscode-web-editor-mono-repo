
import React from "react";
import { PortWidget } from "@projectstorm/react-diagrams-core";
import { NodePortModel } from "./NodePortModel";
import styled from "@emotion/styled";

export namespace NodePortStyles {
    export const Port = styled.div`
        width: "10px";
        height: "10px";
        background-color: "#000";
        border-radius: "50%";
    `;
}

interface NodePortWidgetProps {
    port: NodePortModel;
    engine: any;
}

export const NodePortWidget: React.FC<NodePortWidgetProps> = ({ port, engine }) => {
    return (
        <PortWidget engine={engine} port={port}>
            <NodePortStyles.Port />
        </PortWidget>
    );
};
