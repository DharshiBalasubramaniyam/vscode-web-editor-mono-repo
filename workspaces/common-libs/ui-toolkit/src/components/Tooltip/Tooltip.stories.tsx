import React from "react";
import { ComponentStory } from "@storybook/react";
import { Tooltip, TooltipProps } from "./Tooltip";
import styled from "@emotion/styled";

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const TextContainer = styled.div`
    border: 1px solid black;
    padding: 10px;
`;

const LargeTextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 90vw;
    height: 90vh;
    border: 1px solid black;
`;

const LargeTooltipContent = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 200px;
    height: 100px;
`;

const DefaultTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) =>
    <Container>
        <Tooltip {...args}>
            <TextContainer>Hover Over Me</TextContainer>
        </Tooltip>
    </Container>
;

export const Default = DefaultTemplate.bind();
Default.args = { content: "Tooltip Content", position: "bottom" };

const OverflowTemplate: ComponentStory<typeof Tooltip> = (args: TooltipProps) =>
    <Tooltip {...args}>
        <LargeTextContainer>Hover Over Me</LargeTextContainer>
    </Tooltip>
;

const TooltipContent = () => <LargeTooltipContent>Tooltip Content</LargeTooltipContent>

export const Overflow = OverflowTemplate.bind();
Overflow.args = { content: <TooltipContent />, position: "bottom" };

export default { component: Tooltip, title: "Tooltip" };
