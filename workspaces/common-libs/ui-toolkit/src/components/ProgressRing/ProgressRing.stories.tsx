import React from "react";
import { Meta, Story } from "@storybook/react";
import { ProgressRing } from "./ProgressRing";

export default { title: "ProgressRing", component: ProgressRing } as Meta;

const Template: Story = (args: any) => <ProgressRing {...args} />;

export const Default = Template.bind({});
