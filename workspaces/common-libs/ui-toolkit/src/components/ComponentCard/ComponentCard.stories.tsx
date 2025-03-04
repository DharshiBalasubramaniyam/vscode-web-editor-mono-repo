import React from "react";
import { ComponentStory } from "@storybook/react";
import { ComponentCard, ComponentCardProps } from "./ComponentCard";
import { Typography } from "../Typography/Typography";
import { Icon } from "../Icon/Icon";

const Template: ComponentStory<typeof ComponentCard> = (args: ComponentCardProps) => 
    <ComponentCard {...args}>
        <Icon name="ArchitectureViewIcon" sx={{marginRight: 5}} />
        <Typography variant="h4">Test Component</Typography>  
    </ComponentCard>
;

export const EditorCard = Template.bind();
EditorCard.args = { 
    id: "Test", 
    description: "Description", 
    isSelected: false, 
    sx: {
        display: "flex",
        height: 50,
        width: 200,
        cursor: "pointer",
        borderRadius: 5,
        alignItems: "center",
        padding: 10,
        justifyContent: "left",
        marginRight: 16,
        marginBottom: 16,
        transition: "0.3s",
        border: "1px solid var(--vscode-editor-foreground)",
        "&:hover, &.active": {
            border: "1px solid var(--vscode-focusBorder)",
            backgroundColor: "var(--vscode-pickerGroup-border)",
            ".icon svg g": {
                fill: "var(--vscode-editor-foreground)"
            }
        }
    }, 
    onClick: (e: any) => { console.log(e) } 
};

export const ChoreoCard = Template.bind();
ChoreoCard.args = { id: "Test", description: "Description", isSelected: false, sx: {width: 900, height: 50}, onClick: (e: any) => { console.log(e) } };

export default { component: ComponentCard, title: "ComponentCard" };
