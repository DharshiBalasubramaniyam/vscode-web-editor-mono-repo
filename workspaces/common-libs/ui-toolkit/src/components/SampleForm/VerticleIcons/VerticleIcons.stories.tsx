import React from "react";
import { ComponentStory } from "@storybook/react";
import { VerticleIcons as IconsWrapper, Props } from "./VerticleIcons";

// const FORM_WIDTH = 600;

const Template: ComponentStory<typeof IconsWrapper> = (args: Props) => <IconsWrapper {...args} />;

const onClick = (type: string) => {
    console.log("Selected Type", type);
}

export const VerticleIcons = Template.bind();
VerticleIcons.args = { sx: { width: `1000px` }, onClick: onClick };

export default { component: VerticleIcons, title: "Sample Form" };
