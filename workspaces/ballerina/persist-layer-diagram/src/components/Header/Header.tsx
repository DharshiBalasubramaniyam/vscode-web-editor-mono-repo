
import React from 'react';
import styled from '@emotion/styled';
import { NodeCollapser } from '../Controls/NodeCollapser';
import { ThemeColors } from '@dharshi/ui-toolkit';

interface HeaderProps {
    collapsedMode: boolean;
    setIsCollapsedMode: (collapsedMode: boolean) => void;
}

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

export const Title = styled.div(() => ({
    color: ThemeColors.ON_SURFACE
}));

export function HeaderWidget(props: HeaderProps) {
    const {collapsedMode, setIsCollapsedMode} = props;

    return (
        <HeaderContainer>
            <Title>Entity Relationship Diagram</Title>
            <NodeCollapser collapsedMode={collapsedMode} setIsCollapsedMode={setIsCollapsedMode} />
        </HeaderContainer>
    );
}
