import React, { useState } from "react";
import { storiesOf } from "@storybook/react";
import { Dialog } from "./Dialog";
import { Button } from "../Button/Button";

const DialogComponent = () => {
    const [isOpen, setIsOpen] = useState(false);
    const openDialog = () => {
        setIsOpen(!isOpen);
    };
    const handleOnClose = () => {
        setIsOpen(false);
        console.log("Dialog Closed");
    };
    return (
        <>
            <Button appearance="primary" onClick={openDialog}> Dialog </Button>
            <Dialog
                isOpen={isOpen}
                onClose={handleOnClose}
            >
                Hello World
            </Dialog>
        </>
    );
};
storiesOf("Dialog").add("DialogBox", () => <DialogComponent />);
