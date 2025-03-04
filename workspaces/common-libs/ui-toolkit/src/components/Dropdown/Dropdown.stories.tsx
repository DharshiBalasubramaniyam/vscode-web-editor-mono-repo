import React from "react";
import { ComponentStory } from "@storybook/react";
import { Dropdown, DropdownProps } from "./Dropdown";

const Template: ComponentStory<typeof Dropdown> = (args: DropdownProps) => <div style={{width: 300}}><Dropdown {...args} ref={undefined}/></div>;

export const Select = Template.bind();
Select.args = { id: "drop-down", label: "Test Dropdown", isLoading: false, value: "", items: [{ id: "option-1", content: "Option 1", value: "op1" }, { id: "option-2", content: "Option 2", value: "op2" }, { id: "option-3", content: "Option 3", value: "op3" }], description: "Test", onValueChange: (value: string) => { console.log(value); }, errorMsg: "Error", disabled: false, isRequired: true };

export default { component: Select, title: "Dropdown" };
