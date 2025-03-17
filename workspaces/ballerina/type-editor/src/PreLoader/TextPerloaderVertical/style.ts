
import { css } from "@emotion/css";

export const useStyles = () => ({
    textVerticalPreloaderWrapperRelative: css({
        position: "relative",
        height: "50px",
        width: "55px",
        margin: "50% auto",
    }),
    textVerticalPreloaderWrapperAbsolute: css({
        position: "absolute",
        height: "110px",
        width: "110px",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
    }),
});
