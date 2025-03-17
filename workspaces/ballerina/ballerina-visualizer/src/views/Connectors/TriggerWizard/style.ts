

import { css } from "@emotion/css";
import { ThemeColors } from "@dharshi/ui-toolkit";
export const useStyles = () => ({
    balModule: css({
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        height: '140px',
        border: `1px solid ${ThemeColors.OUTLINE_VARIANT}`,
        backgroundColor: `${ThemeColors.PRIMARY_CONTAINER}`,
        borderRadius: '10px',
        padding: '16px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: `${ThemeColors.PRIMARY_CONTAINER}`,
            border: `1px solid ${ThemeColors.PRIMARY}`
        },
    }),
    balModuleName: css({
        fontSize: '13px',
        width: '120px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        fontWeight: 500,
        textAlign: 'center',
    }),
    orgName: css({
        fontSize: '13px',
        width: '120px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        textAlign: 'center',
    }),
});

export default useStyles;
