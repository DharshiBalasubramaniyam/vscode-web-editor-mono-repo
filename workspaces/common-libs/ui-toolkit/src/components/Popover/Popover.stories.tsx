import React, { useState } from "react";
import { ComponentStory } from "@storybook/react";
import { Popover, PopoverProps } from "./Popover";
import styled from "@emotion/styled";

const popOverStyle = {
    backgroundColor: "white",
    border: "1px solid black",
    padding: "10px",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    maxWidth: "280px",
    gap: "8px",
};

const TextContainer = styled.div`
    width: fit-content;
    padding: 16px;
    border: 1px solid black;
`;

const Template: ComponentStory<typeof Popover> = (args: PopoverProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [anchorEvent, setAnchorEvent] = useState<null | HTMLElement>(null);
    const openPanel = (event: React.MouseEvent<HTMLElement>) => {
        setIsOpen(true);
        setAnchorEvent(event.currentTarget);
    };
    const closePanel = () => {
        setIsOpen(false);
        setAnchorEvent(null);
    };
    return (
        <>
            <TextContainer onMouseOver={openPanel} onMouseLeave={closePanel}> Hover Over </TextContainer>
            <Popover {...args} open={isOpen} anchorEl={anchorEvent}>
                <div>Test Content</div>
            </Popover>
        </>
    );
};

export const PopoverDefault = Template.bind();
PopoverDefault.args = {
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "center",
    },
    transformOrigin: {
        vertical: "center",
        horizontal: "left",
    },
    sx: popOverStyle,
};

export default { component: Popover, title: "Popover" };
