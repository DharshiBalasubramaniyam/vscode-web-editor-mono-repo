import React from "react";
import { ComponentStory } from "@storybook/react";
import { Icon, IconProps } from "./Icon";

const Template: ComponentStory<typeof Icon> = (args: IconProps) => <Icon {...args} />;

export const SampleIcon = Template.bind();
SampleIcon.args = { name: "ballerina" };

export const SampleCodicon = Template.bind();
SampleCodicon.args = { name: "plus", isCodicon: true };

export default { component: Icon, title: "Icon" };
