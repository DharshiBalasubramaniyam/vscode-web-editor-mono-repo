// tslint:disable: jsx-no-multiline-js
import React from "react";

import { Button, Codicon, Tooltip } from "@dharshi/ui-toolkit";

import { useMediaQuery } from "../utils";

interface AutoMapButtonProps {
    onClick: () => void;
}

export default function AutoMapButton(props: AutoMapButtonProps) {
    const { onClick } = props;
    const showText = useMediaQuery('(min-width:800px)');

    return (
        <Tooltip content={"Create mapping using AI"} position="bottom-start">
            <Button
                onClick={onClick}
                appearance="secondary"
            >
                <Codicon name="wand" sx={{ marginRight: 5 }} />
                {showText ? 'Auto Map' : null}
            </Button>
        </Tooltip>
    );
}
