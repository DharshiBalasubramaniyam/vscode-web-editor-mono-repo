import React from "react";
import { ComponentStory } from "@storybook/react";
import { TypeSelector as AppTypeSelector, TypeSelectorProps } from "./TypeSelector";

const Template: ComponentStory<typeof AppTypeSelector> = (args: TypeSelectorProps) => <AppTypeSelector {...args} />;

const onClick = (type: string) => {
    console.log("Selected Type", type);
}

export const TypeSelector = Template.bind();
TypeSelector.args = { onTypeSelected: onClick, sx: { width: 600 } };

export default { component: TypeSelector, title: "Sample Form" };
