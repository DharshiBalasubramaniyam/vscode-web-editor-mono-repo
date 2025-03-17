import React from "react";
import { ComponentStory } from "@storybook/react";
import { ProgressIndicator, ProgressBarProps } from "./ProgressIndicator";

const Template: ComponentStory<typeof ProgressIndicator> = (args: ProgressBarProps) => <ProgressIndicator {...args} />;

export const ProgressBar = Template.bind();
ProgressBar.args = { 
    id: "progress-bar",
    barWidth: 2
};

export default { component: ProgressBar, title: "ProgressIndicator" };
