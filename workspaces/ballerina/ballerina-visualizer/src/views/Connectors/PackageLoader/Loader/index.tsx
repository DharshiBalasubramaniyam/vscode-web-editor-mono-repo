import React from "react";
import Lottie from "react-lottie";

import animationData from "./pulling-module-data.json";

export default function PullingModuleLoader() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
        },
    };
    return <Lottie options={defaultOptions} height={`96px`} width={`96px`} />;
}
