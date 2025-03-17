import React from "react";
import { ComponentStory } from "@storybook/react";
import { LinkButton, LinkButtonProps } from "./LinkButton";
import { Codicon } from "../Codicon/Codicon";

const Template: ComponentStory<typeof LinkButton> = (args: LinkButtonProps) => 
    <LinkButton {...args} >
        <Codicon name="add"/>
        <>Sample Link Button</>
    </LinkButton>
;

export const SampleLinkButton = Template.bind();
SampleLinkButton.args = { onClick: () => { console.log("Button Clicked"); } };

export default { component: LinkButton, title: "Link Button" };
