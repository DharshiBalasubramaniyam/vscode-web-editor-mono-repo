import React from "react";
import { ComponentStory } from "@storybook/react";
import { WebAppCreation, WebAppCreationProps } from "./WebAppCreation";

const Template: ComponentStory<typeof WebAppCreation> = (args: WebAppCreationProps) => <WebAppCreation {...args} />;

export const WebAppCreationForm = Template.bind();
WebAppCreationForm.args = { sx: { width: 600 } };

export default { component: WebAppCreationForm, title: "Sample Form" };
