
import styled from "@emotion/styled";

export const ViewWrapper = styled.div`
    padding: 16px;
`;

export const Text = styled.p`
    font-size: 14px;
    color: var(--vscode-sideBarTitle-foreground);
`;

export const BodyText = styled(Text)`
    color: var(--vscode-sideBarTitle-foreground);
    margin: 0 0 8px;
    opacity: 0.5;
`;

export const BodyTinyInfo = styled(Text)`
    color: var(--vscode-sideBarTitle-foreground);
    margin: 0 0 8px;
    opacity: 0.5;
    font-weight: normal;
    font-size: 12px;
    letter-spacing: 0.39px;
`;

export const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    flex-direction: column;
`;
