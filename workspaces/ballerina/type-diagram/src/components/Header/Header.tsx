
import React, { useContext } from 'react';
import styled from '@emotion/styled';
import { Button, Codicon, ThemeColors } from '@dharshi/ui-toolkit';
import { DiagramContext } from '../common';


const HeaderContainer = styled.div`
    align-items: center;
    color: ${ThemeColors.ON_SURFACE};
    display: flex;
    flex-direction: row;
    font-family: GilmerBold;
    font-size: 16px;
    height: 50px;
    justify-content: space-between;
    min-width: 350px;
    padding-inline: 10px;
    width: calc(100vw - 20px);
`;

export const Title: React.FC<any> = styled.div`
    color: ThemeColors.ON_SURFACE
`;

interface HeaderWidgetProps {
    addNewType: () => void;
}

export function HeaderWidget(props: HeaderWidgetProps) {
    const { addNewType } = props;
    const { selectedNodeId, setSelectedNodeId } = useContext(DiagramContext);

    return (
        <HeaderContainer>
            {selectedNodeId ?
                <Title>Composition Diagram</Title> :
                <Title>Type Diagram</Title>
            }
            {selectedNodeId ? (
                <Button
                    appearance="primary"
                    onClick={() => setSelectedNodeId(undefined)}
                    tooltip="Open Type Diagram"
                >
                    Switch to Type Diagram
                </Button>
            ) : (
                <Button
                    appearance="primary"
                    onClick={addNewType}
                    tooltip="Add New Type"
                >
                    <Codicon name="add" sx={{ marginRight: 5 }} /> Add Type
                </Button>
            )}
        </HeaderContainer>
    );
}
