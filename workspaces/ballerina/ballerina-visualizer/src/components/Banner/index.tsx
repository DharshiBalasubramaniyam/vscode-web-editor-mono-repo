
import React, { ReactNode } from 'react';
import styled from '@emotion/styled';
import { Typography, ThemeColors } from '@dharshi/ui-toolkit';

const BannerContainer = styled.div<{ variant?: 'info' | 'warning' | 'success' | 'error' }>`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-radius: 6px;
    background-color: ${({ variant }: { variant?: 'info' | 'warning' | 'success' | 'error' }) => {
        switch (variant) {
            case 'warning':
                return 'var(--vscode-inputValidation-warningBackground)';
            case 'error':
                return 'var(--vscode-inputValidation-errorBackground)';
            case 'success':
                return 'var(--vscode-testing-iconPassed)';
            case 'info':
            default:
                return ThemeColors.SURFACE_DIM;
        }
    }};
`;

const ContentWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    flex: 1;
`;

const Message = styled(Typography)`
    color: var(--vscode-foreground);
    margin: 0;
`;

const ActionContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

interface BannerProps {
    message: string | ReactNode;
    variant?: 'info' | 'warning' | 'success' | 'error';
    actions?: ReactNode;
}

export function Banner({ message, variant = 'info', actions }: BannerProps) {
    return (
        <BannerContainer variant={variant}>
            <ContentWrapper>
                <Message variant="body2">{message}</Message>
            </ContentWrapper>
            {actions && <ActionContainer>{actions}</ActionContainer>}
        </BannerContainer>
    );
} 
