import React from "react";
import { ComponentStory } from "@storybook/react";
import { HorizontalIconsWithSeparator as IconsWrapper, IconContainerProps } from "./HorizontalIconsWithSeparator";

const Template: ComponentStory<typeof IconsWrapper> = (args: IconContainerProps) => <IconsWrapper {...args} />;

export const HorizontalIconsWithSeparator = Template.bind();
HorizontalIconsWithSeparator.args = { sx: { width: 600 }, leftIconName: "ballerina", rightIconName: "ellipsis", title: "Sample", description: "Sample Description" };

export default { component: HorizontalIconsWithSeparator, title: "Sample Form" };
