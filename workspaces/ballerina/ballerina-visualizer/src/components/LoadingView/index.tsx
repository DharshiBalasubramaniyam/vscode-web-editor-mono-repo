
import React from 'react';
import styled from '@emotion/styled';
import { ProgressRing, ThemeColors } from '@dharshi/ui-toolkit';

const LoadingContainer = styled.div<{ fullHeight?: boolean }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: ${(props: { fullHeight: any; }) => props.fullHeight ? '100vh' : '100%'};
    min-height: 200px;
`;

const LoadingText = styled.div`
    margin-top: 16px;
    color: var(--vscode-descriptionForeground);
    font-size: 14px;
`;

interface LoadingViewProps {
    message?: string;
    fullHeight?: boolean;
}

export function LoadingView({ message = 'Loading...', fullHeight = false }: LoadingViewProps) {
    return (
        <LoadingContainer fullHeight={fullHeight}>
             <ProgressRing color={ThemeColors.PRIMARY} />
            <LoadingText>{message}</LoadingText>
        </LoadingContainer>
    );
} 
