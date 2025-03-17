import { css } from "@emotion/css";

export const useStyles = () => ({
    formSave: css({
        width: "100%",
        height: "auto",
        display: "inline-flex",
    }),
    buttonWrapper: css({
        display: "flex",
        justifyContent: "flex-end",
        width: "50%",
        gap: "8px"
    }),
    stmtEditorToggle: css({
        width: "50%",
    }),
});
