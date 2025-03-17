import React from "react";

import { Codicon } from "@dharshi/ui-toolkit";

import { useIONodesStyles } from "../../../styles";

export function OutputBeforeInputNotification() {
    const classes = useIONodesStyles();
    
    return (
        <div className={classes.outputBeforeInputNotification}>
            <span style={{ display: 'flex', alignItems: 'center' }}>
                <Codicon name="info" sx={{ marginRight: "7px" }} />
                Click on input field first to create a mapping
            </span>
        </div>
    );
}
