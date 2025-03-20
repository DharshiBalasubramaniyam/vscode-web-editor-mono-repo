// tslint:disable: jsx-no-multiline-js
import React from "react";

import { css } from "@emotion/css";
import { Icon, Typography } from "@dharshi/ui-toolkit";

const useStyles = () => ({
    menuItem: css({
        fontSize: '12px',
        height: '30px',
        cursor: "pointer",
        '&:hover': {
            backgroundColor: 'var(--vscode-list-hoverBackground)',
        }
    }),
    menuItemText: css({
        padding: '5px',
        fontSize: '12px'
    })
});

export interface RecordItemProps {
    recordName: string;
    onClickRecordItem: (recordName: string) => void;
}

export function RecordItem(props: RecordItemProps) {
    const { recordName, onClickRecordItem } = props;
    const classes = useStyles();

    const onClickOnListItem = () => {
        onClickRecordItem(recordName);
    };

    return (
        <>
            <div
                className={classes.menuItem}
                key={recordName}
                onClick={onClickOnListItem}
            >
                <Icon name="symbol-struct-icon" />
                <Typography className={classes.menuItemText}>{recordName}</Typography>
            </div>
        </>
    );
}
