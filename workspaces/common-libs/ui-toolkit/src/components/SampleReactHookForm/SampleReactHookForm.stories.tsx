import React from "react";
import { ComponentStory } from "@storybook/react";
import { SampleReactHookForm, SampleReactHookFormProps } from "./SampleReactHookForm";

const Template: ComponentStory<typeof SampleReactHookForm> = (args: SampleReactHookFormProps) => <SampleReactHookForm {...args} />;

export const SampleReactForm = Template.bind();
SampleReactForm.args = { id: "sample-react-form", args: { name: "WSO2", products: "pro2", address: "123, Main Street", isRegistered: true, password: "pass", words: "foo" } };

export default { component: SampleReactForm, title: "Sample React Hook Form" };
