import { css } from "@emotion/css";

export const useStyles = () => ({
    warningContainer: css({
        marginTop: 20,
        marginLeft: 16,
        marginRight: 16,
        backgroundColor: 'var(--vscode-editorWidget-background)',
        color: 'var(--vscode-sideBarSectionHeader-foreground)',
        padding: 10,
        minWidth: 120,
        width: 'fit-content',
        textAlign: 'left',
        display: 'flex',
        flexDirection: 'row',
        height: 'fit-content',
    }),
    warningIcon: css({
        display: 'flex',
        alignItems: 'center',
        position: 'absolute',
        top: '50%',
        color: 'var(--vscode-editorWarning-foreground)'
    }),
    warningBody: css({
        marginLeft: 35
    })
});
