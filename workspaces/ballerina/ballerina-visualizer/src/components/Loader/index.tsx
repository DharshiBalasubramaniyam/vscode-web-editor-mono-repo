import React from "react";
import styled from "@emotion/styled";
import { ProgressRing, ThemeColors } from "@dharshi/ui-toolkit";
import { Typography } from "@dharshi/ui-toolkit";
interface LoadingRingProps {
    message?: string;
}

export const LoadingRing = ({ message }: LoadingRingProps) => {
    const ProgressContainer = styled.div`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 16px;
    `;

    const LoadingText = styled(Typography)`
        margin-top: 16px;
        color: var(--vscode-descriptionForeground);
        font-size: 14px;
    `;

    return (
        <ProgressContainer>
            <ProgressRing color={ThemeColors.PRIMARY}/>
            {message && (
                <LoadingText variant="body2">
                    {message}
                </LoadingText>
            )}
        </ProgressContainer>
    );
};
