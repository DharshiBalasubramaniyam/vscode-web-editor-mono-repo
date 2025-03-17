import React from "react";
import { ComponentStory } from "@storybook/react";
import { ActionButtons, ActionButtonsProps } from "./ActionButtons";

const Template: ComponentStory<typeof ActionButtons> = (args: ActionButtonsProps) =>
    <ActionButtons {...args}/> 
;

export const PrimaryButton = Template.bind();
PrimaryButton.args = { primaryButton: { tooltip: "Primary Tooltip", text: "Save", onClick: () => console.log("Primary Clicked")}, secondaryButton: { tooltip: "Secondary Tooltip", text: "Cancel", onClick: () => console.log("Secondary Clicked")  } };

export default { component: ActionButtons, title: "ActionButtons" };
