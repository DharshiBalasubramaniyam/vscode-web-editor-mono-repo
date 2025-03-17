import React from "react";
import { ComponentStory } from "@storybook/react";
import { RadioButtonGroup, RadioButtonGroupProps } from "./RadioButtonGroup";

const Template: ComponentStory<typeof RadioButtonGroup> = (args: RadioButtonGroupProps) => <RadioButtonGroup {...args} ref={null}/>;

export const ButtonGroup = Template.bind();
ButtonGroup.args = { name: "radio-button-group", value: "option1", orientation: "vertical", options: [{ content: "Option 1", value: "option1" }, { content: "Option 2", value: "option2" }], onChange: (e: any) => console.log("Radio button clicked", e.target.value)};

export default { component: RadioButtonGroup, title: "Radio Button Group" };
