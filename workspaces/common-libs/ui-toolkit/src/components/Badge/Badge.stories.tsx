import React from "react";
import { ComponentStory } from "@storybook/react";
import { Badge, BadgeProps } from "./Badge";

const Template: ComponentStory<typeof Badge> = (args: BadgeProps) =>
    <Badge {...args}> 
        {args.children}
    </Badge>
;

export const informationalBadge = Template.bind();
informationalBadge.args = { color: "#6C757D", children: "100" };

export const SuccessfulBadge = Template.bind();
SuccessfulBadge.args = { color: "#28A745", children: "200" };

export const RedirectionBadge = Template.bind();
RedirectionBadge.args = { color: "#007aff", children: "200" };

export const ClientErrorBadge = Template.bind();
ClientErrorBadge.args = { color: "#FFC107", children: "200" };

export const ServerErrorBadge = Template.bind();
ServerErrorBadge.args = { color: "#f93E3E", children: "500" };

export default { component: Badge, title: "Badge" };
