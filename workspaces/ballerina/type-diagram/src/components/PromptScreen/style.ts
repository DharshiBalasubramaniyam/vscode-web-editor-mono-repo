import { css } from '@emotion/css';
import { ThemeColors } from '@dharshi/ui-toolkit';

export const useStyles = () => ({
    button: css({
        backgroundColor: ThemeColors.PRIMARY,
        borderRadius: '5px',
        color: 'white',
        fontSize: '12px',
        marginInline: '5px',
        minWidth: '140px',
        '&:hover': {
            backgroundColor: ThemeColors.PRIMARY_CONTAINER
        }
    }),
    container: css({
        alignItems: 'center',
        backgroundImage: 'radial-gradient(circle at 0.5px 0.5px, var(--vscode-textBlockQuote-border) 1px, transparent 0)',
        backgroundRepeat: 'repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw'
    }),
    messageBox: css({
        color: `${ThemeColors.ON_SURFACE}`,
        fontFamily: 'GilmerRegular',
        fontSize: '16px',
        padding: '10px'
    })
});
