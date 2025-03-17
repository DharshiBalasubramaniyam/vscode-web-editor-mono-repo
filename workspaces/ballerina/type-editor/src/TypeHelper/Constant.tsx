import { css } from "@emotion/css";

export const ANIMATION = {
    enter: css({
        transition: "all 0.3s ease-in",
    }),
    enterFrom: css({
        opacity: 0,
    }),
    enterTo: css({
        opacity: 1,
    }),
    leave: css({
        transition: "all 0s",
    }),
    leaveFrom: css({
        opacity: 1,
    }),
    leaveTo: css({
        opacity: 0,
    }),
};

export const HELPER_PANE_WIDTH = 350;
export const HELPER_PANE_HEIGHT = 400;

export const ARROW_HEIGHT = 16;
export const ARROW_OFFSET = 10;
