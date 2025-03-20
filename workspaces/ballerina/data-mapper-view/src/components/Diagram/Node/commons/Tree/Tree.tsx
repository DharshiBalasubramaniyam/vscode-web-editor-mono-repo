import styled from "@emotion/styled";
import {
    GAP_BETWEEN_FIELDS,
    GAP_BETWEEN_NODE_HEADER_AND_BODY,
    IO_NODE_DEFAULT_WIDTH,
    IO_NODE_HEADER_HEIGHT
} from "../../../utils/constants";

export const TreeContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${GAP_BETWEEN_NODE_HEADER_AND_BODY}px;
    background: var(--vscode-sideBar-background);
    border: 1px solid var(--vscode-welcomePage-tileBorder);
    font-style: normal;
    font-weight: 600;
    font-size: 13px;
    line-height: 24px;
    width: ${IO_NODE_DEFAULT_WIDTH}px;
`;

export const TreeHeader = styled.div((
    { isSelected, isDisabled }: { isSelected?: boolean, isDisabled?: boolean }
) => ({
    height: `${IO_NODE_HEADER_HEIGHT}px`,
    padding: '8px',
    background: 'none',
    borderRadius: '3px',
    width: '100%',
    display: 'flex',
        cursor: `${isDisabled ? 'not-allowed' : 'pointer'}`,
    '&:hover': {
        backgroundColor: `${isDisabled ? 'var(--vscode-tab-inactiveBackground)' : 'var(--vscode-list-hoverBackground)'}`
    },
    color: 'var(--vscode-inputOption-activeForeground)'
}));

export const TreeBody = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 1px;
    gap: ${GAP_BETWEEN_FIELDS}px;
    background: none;
    border-radius: 3px;
    flex: none;
    flex-grow: 0;
    width: 100%;
    cursor: pointer;
    color: var(--vscode-foreground);
`;
