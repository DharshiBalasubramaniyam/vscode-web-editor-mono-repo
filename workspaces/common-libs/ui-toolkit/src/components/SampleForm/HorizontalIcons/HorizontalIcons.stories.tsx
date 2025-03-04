import React from "react";
import { ComponentStory } from "@storybook/react";
import { HorizontalIcons as IconsWrapper, HorizontalIconProps } from "./HorizontalIcons";

const Template: ComponentStory<typeof IconsWrapper> = (args: HorizontalIconProps) => <IconsWrapper {...args} />;

export const HorizontalIcons = Template.bind();
HorizontalIcons.args = { sx: { width: 800 }, leftIconName: "ballerina", rightIconName: "plus", title: "Sample", description: "Sample Description"  };

export default { component: HorizontalIcons, title: "Sample Form" };
