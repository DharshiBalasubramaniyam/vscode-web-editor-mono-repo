
import React from 'react';
import styled from '@emotion/styled';
import { Typography } from '@dharshi/ui-toolkit';

const HeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 0;
    padding: 0 16px;
`;

const Title = styled(Typography)`
    margin-bottom: 0;
    color: var(--vscode-foreground);
`;

const Description = styled(Typography)`
    color: var(--vscode-descriptionForeground);
`;

interface FormHeaderProps {
    title: string;
    subtitle?: string;
}

export function FormHeader({ title, subtitle }: FormHeaderProps) {
    return (
        <HeaderContainer>
            <Title variant="h3">{title}</Title>
            {subtitle && (
                <Description variant="body2">
                    {subtitle}
                </Description>
            )}
        </HeaderContainer>
    );
} 
