
import React from "react";
import styled from "@emotion/styled";
import { DiagramEngine } from "@projectstorm/react-diagrams-core";
import { ButtonNodeModel } from "./ButtonNodeModel";
import { BUTTON_NODE_HEIGHT, BUTTON_NODE_WIDTH, NODE_PADDING } from "../../../resources/constants";
import { useDiagramContext } from "../../DiagramContext";
import { Button, ThemeColors } from "@dharshi/ui-toolkit";

export namespace PopupStyles {
    export const Container = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: ${BUTTON_NODE_WIDTH}px;
        height: ${BUTTON_NODE_HEIGHT}px;
        padding: 0 ${NODE_PADDING}px;
        border-radius: 4px;
        background-color: ${ThemeColors.SURFACE};
        color: ${ThemeColors.ON_SURFACE};
    `;

    export const Row = styled.div`
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: center;
        gap: 4px;
        width: 100%;
    `;

    export const ButtonTitle = styled.div`
        font-size: 12px;
    `;
}

interface ButtonNodeWidgetProps {
    model: ButtonNodeModel;
    engine: DiagramEngine;
}

export interface NodeWidgetProps extends Omit<ButtonNodeWidgetProps, "children"> {}

export function ButtonNodeWidget(props: ButtonNodeWidgetProps) {
    const { suggestions } = useDiagramContext();

    const handleOnAcceptClick = () => {
        if (suggestions?.onAccept) {
            suggestions.onAccept();
        }
    };
    const handleOnDiscardClick = () => {
        if (suggestions?.onDiscard) {
            suggestions.onDiscard();
        }
    };

    return (
        <PopupStyles.Container>
            <PopupStyles.Row>
                <Button
                    appearance="secondary"
                    onClick={handleOnAcceptClick}
                    buttonSx={{
                        height: 18,
                    }}
                >
                    <PopupStyles.ButtonTitle>Accept</PopupStyles.ButtonTitle>
                </Button>
                <Button
                    appearance="secondary"
                    onClick={handleOnDiscardClick}
                    buttonSx={{
                        height: 18,
                    }}
                >
                    <PopupStyles.ButtonTitle>Discard</PopupStyles.ButtonTitle>
                </Button>
            </PopupStyles.Row>
        </PopupStyles.Container>
    );
}
