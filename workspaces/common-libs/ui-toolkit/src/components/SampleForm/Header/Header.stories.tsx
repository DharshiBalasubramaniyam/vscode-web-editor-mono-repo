import React from "react";
import { ComponentStory } from "@storybook/react";
import { Header as HeaderWrapper, HeaderContainerProps } from "./Header";

const Template: ComponentStory<typeof HeaderWrapper> = (args: HeaderContainerProps) => <HeaderWrapper {...args} />;

export const Header = Template.bind();
Header.args = { sx: { width: 600 } };

export default { component: Header, title: "Sample Form" };
