import { css } from "@emotion/css";

export const useStyles = () => ({
    root: css({
        position: 'relative',
        flexGrow: 1,
        margin: '25vh auto',
        width: 'fit-content'
    }),
    errorContainer: css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column" 
    }),
    errorTitle: css({
        color: "var(--vscode-badge-background)",
        textAlign: "center"
    }),
    errorMsg: css({
        paddingTop: "16px",
        color: "var(--vscode-checkbox-border)",
        textAlign: "center"
    }),
    closeButtonContainer: css({
        position: 'absolute',
        top: '16px',
        right: '16px'
    }),
    errorImg: css({
        display: 'flex',
        justifyContent: 'center',
        width: '100%'
    }),
    gridContainer: css({
        height: "100%"
    }),
    link: css({
        color: "var(--vscode-editor-selectionBackground)",
        textDecoration: "underline",
        "&:hover, &:focus, &:active": {
            color: "var(--vscode-editor-selectionBackground)",
            textDecoration: "underline",
        }
    })
});
