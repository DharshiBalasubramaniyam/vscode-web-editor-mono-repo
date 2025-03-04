import React from "react";
import { ComponentStory } from "@storybook/react";
import { AutoComplete, AutoCompleteProps } from "./AutoComplete";

const Template: ComponentStory<typeof AutoComplete> = (args: AutoCompleteProps) => <div style={{ width: 300 }}><AutoComplete {...args} ref={null}/></div>;

export const Select = Template.bind();
const args: AutoCompleteProps = { id: "autoComplete", label: "Words", required: true, nullable: true, onValueChange: (value: string) => { console.log(value); }, items: ["foo", "boo"] };
Select.args = args;

export default { component: Select, title: "AutoComplete" };
