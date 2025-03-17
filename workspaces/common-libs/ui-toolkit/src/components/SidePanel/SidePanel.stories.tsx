import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { SidePanel } from "./SidePanel";
import { SidePanelBody, SidePanelTitleContainer } from "../../styles/SidePanel";
import { Button } from "../Button/Button";
import { Codicon } from "../Codicon/Codicon";
import { ActionButtons } from "../ActionButtons/ActionButtons";
import { colors } from "../Commons/Colors";

export default { component: SidePanel, title: "SidePanel" };

const SidePanelDefault = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openPanel = () => {
        setIsOpen(!isOpen);
    };
    const closePanel = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", cursor: "pointer", color: colors.editorForeground }} onClick={openPanel}>
                Click to Open Side Panel
            </div>
            <SidePanel
                isOpen={isOpen}
                alignment="right"
                onClose={closePanel}
            >
                <SidePanelTitleContainer>
                    <div>Side Panel Title</div>
                    <Button onClick={closePanel} appearance="icon"><Codicon name="close" /></Button>
                </SidePanelTitleContainer>
            </SidePanel>
        </>
    );
};
storiesOf("SidePanel").add("SidePanelDefaullt", () => <SidePanelDefault />);

const LeftSidePanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openPanel = () => {
        setIsOpen(!isOpen);
    };
    const closePanel = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", cursor: "pointer", color: colors.editorForeground }} onClick={openPanel}>
                Click to Open Side Panel
            </div>
            <SidePanel
                isOpen={isOpen}
                alignment="left"
                onClose={closePanel}
            >
                <SidePanelTitleContainer>
                    <div>Side Panel Title</div>
                    <Button onClick={closePanel} appearance="icon"><Codicon name="close" /></Button>
                </SidePanelTitleContainer>
            </SidePanel>
        </>
    );
};
storiesOf("SidePanel").add("LeftSidePanel", () => <LeftSidePanel />);

const SidePanelWithAnimation = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openPanel = () => {
        setIsOpen(!isOpen);
    };
    const closePanel = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div style={{ display: "flex", justifyContent: "center", cursor: "pointer", color: colors.editorForeground }} onClick={openPanel}>
                Click to Open Side Panel
            </div>
            <SidePanel
                isOpen={isOpen}
                alignment="right"
                sx={{ transition: "all 0.3s ease-in-out" }}
                onClose={closePanel}
            >
                <SidePanelTitleContainer>
                    <div>Side Panel Title</div>
                    <Button onClick={closePanel} appearance="icon"><Codicon name="close" /></Button>
                </SidePanelTitleContainer>
            </SidePanel>
        </>
    );
};
storiesOf("SidePanel").add("SidePanelWithAnimation", () => <SidePanelWithAnimation />);

const SidePanelWithContent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openPanel = () => {
        setIsOpen(!isOpen);
    };
    const closePanel = () => {
        setIsOpen(false);
    };
    return (
        <>
            <div style={{display: "flex", justifyContent: "center", cursor: "pointer", color: colors.editorForeground}} onClick={openPanel}>
                Click to Open Side Panel
            </div>
            <SidePanel
                isOpen={isOpen}
                alignment="right"
                sx={{transition: "all 0.3s ease-in-out"}}
                onClose={closePanel}
            >
                <SidePanelTitleContainer>
                    <div>Side Panel Title</div>
                    <Button onClick={closePanel} appearance="icon"><Codicon name="close"/></Button>
                </SidePanelTitleContainer>
                <SidePanelBody>
                    <ActionButtons
                        primaryButton={{ text : "Save", onClick: () => console.log("Save Button Clicked"), tooltip: "Save Button" }}
                        secondaryButton={{ text : "Cancel", onClick: closePanel, tooltip: "Cancel Button" }}
                        sx={{justifyContent: "flex-end"}}
                    />
                </SidePanelBody>
            </SidePanel>
        </>
    );
};

storiesOf("SidePanel").add("SidePanelWithContent", () => <SidePanelWithContent />);
