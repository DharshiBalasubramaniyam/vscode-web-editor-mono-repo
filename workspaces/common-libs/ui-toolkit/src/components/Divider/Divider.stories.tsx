import React from "react";
import { ComponentStory } from "@storybook/react";
import { Divider, DeviderProps } from "./Divider";

const Template: ComponentStory<typeof Divider> = (args: DeviderProps) => <Divider {...args} />;

export const DividerComp = Template.bind();
DividerComp.args = {};

export default { component: DividerComp, title: "Divider" };
