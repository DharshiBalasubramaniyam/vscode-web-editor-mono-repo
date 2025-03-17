
import React from "react";
import { Overview as OverviewComponent } from "@dharshi/overview-view";
import { VisualizerLocation } from "@dharshi/ballerina-core";
import { ViewWrapper } from "../styles";

export function Overview(props: { visualizerLocation: VisualizerLocation }) {
    return (
        <ViewWrapper>
            <h1>Overview</h1>
            <OverviewComponent visualizerLocation={props.visualizerLocation} />
        </ViewWrapper>
    );
}
