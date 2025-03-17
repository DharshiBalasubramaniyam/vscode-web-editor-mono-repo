import React from "react";
import { ComponentStory } from "@storybook/react";
import { Button, ButtonProps } from "./Button";
import { colors } from "../Commons/Colors";
import { Icon } from "../Icon/Icon";

const Template: ComponentStory<typeof Button> = (args: ButtonProps) =>
    <Button {...args}> 
        <div style={{color: colors.editorForeground}}>Test</div>
    </Button>
;

export const PrimaryButton = Template.bind();
PrimaryButton.args = { appearance: "primary", tooltip: "Primary Button" };

const IconTemplate: ComponentStory<typeof Button> = (args: ButtonProps) =>
    <Button {...args}>
        <Icon sx={{marginTop: 2, marginRight: 5}} name="ballerina"/>
        <div style={{color: colors.editorForeground}}>Test</div>
    </Button>
;

export const IconButton = IconTemplate.bind();
IconButton.args = { appearance: "icon", tooltip: "Icon Button" };

export default { component: Button, title: "Button" };
