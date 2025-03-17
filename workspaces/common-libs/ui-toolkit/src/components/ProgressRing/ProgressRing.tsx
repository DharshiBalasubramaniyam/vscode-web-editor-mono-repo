import React from "react";
import "@dharshi/font-wso2-vscode/dist/wso2-vscode.css";
import { VSCodeProgressRing } from "@vscode/webview-ui-toolkit/react";
import styled from "@emotion/styled";

interface ProgressRingProps {
    sx?: React.CSSProperties;
    color?: string;
}

const StyledProgressRing = styled(VSCodeProgressRing)<{ color?: string }>`
    &::part(indeterminate-indicator-1) {
        stroke: ${(props: { color: string }) => props.color || "var(--vscode-progressBar-background)"};
    }
`;

export const ProgressRing: React.FC<ProgressRingProps> = (props: ProgressRingProps) => (
    <StyledProgressRing style={props.sx} color={props.color} />
);

export default ProgressRing;
