import React from "react";
import Lottie from "react-lottie";

import animationData from "./data.json";
import { useStyles } from "./style";

export interface TextPreloaderVerticalProps {
    position: "relative" | "absolute";
}

export function TextPreloaderVertical(props: TextPreloaderVerticalProps) {
    const { position } = props;
    const classes = useStyles();

    const loaderPosition =
        position === "relative"
            ? classes.textVerticalPreloaderWrapperRelative
            : classes.textVerticalPreloaderWrapperAbsolute;

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };

    return (
        <div className={loaderPosition} data-testid={"test-preloader-vertical"}>
            <Lottie options={defaultOptions} height={`100%`} width={`100%`} />
        </div>
    );
}
