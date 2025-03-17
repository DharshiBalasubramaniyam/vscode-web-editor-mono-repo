import { css } from "@emotion/css";

export const useStyles = () => ({
    root: css({
        display: "flex",
    }),
    checkbox: css({
        color: "#2FA86C",
        "&$checked": {
            color: "#2FA86C",
            "&:hover": {
                background: "transparent",
            },
        },
    }),
    checkFormControl: css({
        margin: "8px",
        marginTop: 0,
    }),
    disabled: css({
        backgroundColor: "#afb9f6 !important",
        color: "#FFF !important",
    }),
    labelWrapper: css({
        display: 'flex',
        marginRight: 'auto'
    }),
    inputLabelForRequired: css({
        padding: 0,
        color: '#1D2028',
        fontSize: 13,
        textTransform: 'capitalize',
        display: 'inline-block',
        lineHeight: '35px',
        fontWeight: 300,
    }),
    starLabelForRequired: css({
        padding: 0,
        color: '#DC143C',
        fontSize: "13px",
        textTransform: 'capitalize',
        display: 'inline-block'
    })
});
