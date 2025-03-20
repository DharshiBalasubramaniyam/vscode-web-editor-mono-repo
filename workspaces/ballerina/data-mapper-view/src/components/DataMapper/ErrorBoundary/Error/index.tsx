import * as React from "react";

import { useStyles } from "./style";
import { Typography } from "@dharshi/ui-toolkit";

export default function Default() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.errorImg}>
                <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--vscode-editor-foreground)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
            </div>
            <Typography variant="h4" className={classes.errorTitle}>
                A problem occurred while rendering the Data Mapper.
            </Typography>
            <Typography variant="body2" className={classes.errorMsg}>
                Please raise an issue with the sample code in our <a href="https://github.com/wso2/ballerina-plugin-vscode/issues">issue tracker</a>
            </Typography>
        </div>
    );
}
