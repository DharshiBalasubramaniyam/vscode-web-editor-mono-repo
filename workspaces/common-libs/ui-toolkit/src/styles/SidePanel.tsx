import styled from "@emotion/styled";

interface SidePanelProps {
    sx?: any;
}

export const SidePanelBody = styled.div`
    height: calc(100% - 87px); // 87px is the height of the title container and top and down paddings (55px + 16px + 16px)
    padding: 16px;
    overflow-y: scroll;
`;

export const SidePanelTitleContainer = styled.div<SidePanelProps>`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px;
    border-bottom: 1px solid var(--vscode-panel-border);
    font: inherit;
    font-weight: bold;
    color: var(--vscode-editor-foreground);
    ${(props: SidePanelProps) => props.sx};
`;
