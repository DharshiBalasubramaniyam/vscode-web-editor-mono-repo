import React from "react";

import { Button, Codicon } from "@dharshi/ui-toolkit"

interface CloseButtonProps {
    onCancel: () => void;
}

export function CloseButton(props: CloseButtonProps) {
    const { onCancel } = props;
    return (
        <Button
            appearance="icon"
            className="panel-close-button"
            onClick={onCancel}
        >
            <Codicon name="close" />
        </Button>
    );
}
