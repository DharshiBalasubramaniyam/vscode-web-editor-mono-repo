import React from "react";
import { ComponentStory } from "@storybook/react";
import { Codicon, CodiconProps } from "./Codicon";

const Template: ComponentStory<typeof Codicon> = (args: CodiconProps) => <Codicon {...args} />;

export const SampleIcon = Template.bind();
SampleIcon.args = { name: "add" };

export default { component: Codicon, title: "Codicon" };
