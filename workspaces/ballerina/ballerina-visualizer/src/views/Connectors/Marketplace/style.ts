
import { css } from "@emotion/css";

export const useStyles = () => ({
    balModuleListWrap: css({
        marginTop: '16px',
        height: '80vh',
        overflowY: 'scroll',
        scrollbarWidth: 'none',
    }),
    balModuleSectionWrap: css({
        marginTop: '48px',
        '&:first-of-type': {
            marginTop: 0,
        },
    }),
    pageLoadingText: css({
        marginLeft: '30px',
    }),
    container: css({
        width: '600px',
        height: '85vh',
        '& .MuiFormControl-marginNormal': {
            margin: '0 !important',
        },
        '& #module-list-container': {
            paddingRight: 0,
        },
    }),
    msgContainer: css({
        height: '80vh',
        display: 'flex',
        alignContent: 'center',
        alignItems: 'center',
    }),
    resultsContainer: css({
        marginTop: '16px',
        scrollbarWidth: 'none',
        display: 'flex',
        alignContent: 'flex-start',
    })
});

export default useStyles;
