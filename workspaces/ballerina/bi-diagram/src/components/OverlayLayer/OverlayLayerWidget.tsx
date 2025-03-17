
import React from "react";
import { DiagramEngine } from "@projectstorm/react-diagrams";
import styled from "@emotion/styled";

import { OverlayLayerModel } from "./OverlayLayerModel";
import { ProgressRing, ThemeColors } from "@dharshi/ui-toolkit";
import { DiagramStyles } from "../DiagramCanvas";

export interface NodeLayerWidgetProps {
    layer: OverlayLayerModel;
    engine: DiagramEngine;
}

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    height: 100%;
    justify-content: center;
    width: 100%;
`;

export class OverlayLayerWidget extends React.Component<NodeLayerWidgetProps> {
    render() {
        return (
            <DiagramStyles.Container background={ThemeColors.SURFACE_BRIGHT} color={ThemeColors.ON_SURFACE}>
                <Container>
                    <ProgressRing />
                </Container>
            </DiagramStyles.Container>
        );
    }
}
