// tslint:disable: jsx-no-multiline-js
import React from "react";

import { Button, Icon, Tooltip } from "@dharshi/ui-toolkit";

import { useMediaQuery } from "../utils";

interface AutoMapButtonProps {
    onClick: () => void;
}

export default function EditButton(props: AutoMapButtonProps) {
    const { onClick } = props;
    const showText = useMediaQuery('(min-width:800px)');

    return (
        <Tooltip content={"Edit data mapping name, inputs and output"} position="bottom-start">
            <Button
                onClick={onClick}
                appearance="secondary"
            >
                <Icon name="bi-edit" sx={{ marginRight: 5, width: 16, height: 16, fontSize: 14 }} />
                {showText ? 'Edit' : null}
            </Button>
        </Tooltip>
    );
}
