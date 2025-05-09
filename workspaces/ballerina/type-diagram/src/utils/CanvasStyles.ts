
import styled from "@emotion/styled";

import { css } from "@emotion/css";

export const useStyles = () => ({
    canvas: css({
        backgroundImage: "radial-gradient(var(--vscode-editor-inactiveSelectionBackground) 10%, transparent 0px)",
        backgroundColor: "var(--vscode-editor-background)",
        backgroundSize: "16px 16px",
        minHeight: "calc(100vh - 50px)",
        minWidth: "100vw",
    }),
});

export const Container: React.FC<any> = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100vh;
    justify-content: center;
    width: 100vw;
`;

export const DiagramContainer: React.FC<any> = styled.div`
    align-items: center;
    backgroundImage: 'radial-gradient(circle at 0.5px 0.5px, var(--vscode-textBlockQuote-border) 1px, transparent 0)',
    backgroundColor: 'var(--vscode-input-background)',
    backgroundSize: '8px 8px',
    display: flex;
    flex-direction: column;
    height: calc(100vh - 50px);
    justify-content: center;
    width: 100vw;
    svg:not(:root) {
        overflow: visible;
    }
`;
