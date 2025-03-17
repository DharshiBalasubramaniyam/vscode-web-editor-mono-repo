// tslint:disable: jsx-no-multiline-js
import React from "react";

import { css } from "@emotion/css";
import { Codicon, Divider } from "@dharshi/ui-toolkit";

import { IO_NODE_DEFAULT_WIDTH } from "../../utils/constants";

const useStyles = () => ({
    treeContainer: css({
        width: `${IO_NODE_DEFAULT_WIDTH}px`,
        cursor: "default",
        padding: "16px",
        backgroundColor: "var(--vscode-input-background)",
        border: "1px dashed var(--vscode-input-border)",
        borderRadius: "4px"
    }),
    unsupportedIOBanner: css({
        padding: "12px"
    }),
    infoContainer: css({
        display: 'flex',
        alignItems: 'center',
        lineHeight: '1.4',
        fontSize: '13.5px',
        marginBottom: '8px'
    }),
    warningIcon: css({
        color: 'var(--vscode-notificationsWarningIcon-foreground)',
        fontSize: '16px',
        marginRight: '8px'
    }),
    messageTitle: css({
        fontWeight: 500
    }),
    divider: css({
        margin: '12px 0'
    }),
    messageBody: css({
        color: 'var(--vscode-foreground)',
        opacity: 0.8,
        fontSize: '13px',
        lineHeight: '1.4'
    })
});

export function EmptyInputsWidget() {
    const classes = useStyles();

    return (
        <div className={classes.treeContainer}>
            <span className={classes.unsupportedIOBanner}>
                <div className={classes.infoContainer}>
                    <Codicon name="warning" className={classes.warningIcon} />
                    <span className={classes.messageTitle}>No Input Sources Available</span>
                </div>
                <Divider className={classes.divider} />
                <div className={classes.messageBody}>
                    No mappable constructs were found in the current scope.
                    Please ensure you have defined input sources for mapping.
                </div>
            </span>
        </div>
    );
}
