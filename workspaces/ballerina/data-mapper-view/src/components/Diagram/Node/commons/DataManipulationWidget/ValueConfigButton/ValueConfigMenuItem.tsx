// tslint:disable: jsx-no-multiline-js
import React from 'react';

import { Icon, Item, MenuItem, Tooltip } from '@dharshi/ui-toolkit';
import { css } from '@emotion/css';

const useStyles = () => ({
    itemContainer: css({
        display: 'flex',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center'
    }),
    symbol: css({
        alignSelf: 'flex-end',
    }),
    warning: css({
        color: 'var(--vscode-editorError-foreground)',
        fontSize: '16px',
        marginLeft: '5px'
    })
});

export interface ValueConfigMenuItem {
    title: string;
    onClick: () => void;
    onClose?: () => void;
    warningMsg?: string;
    level?: number;
}

export function ValueConfigMenuItem(props: ValueConfigMenuItem) {
    const { title, onClick, onClose, warningMsg } = props;
    const classes = useStyles();

    const onClickMenuItem = () => {
        onClick();
        onClose();
    }

    const itemElement = (
        <div className={classes.itemContainer}>
            <div>{title}</div>
            {warningMsg && (
                <Tooltip
                    content={warningMsg}
                >
                    <Icon name="error-icon" iconSx={{ color: "var(--vscode-errorForeground)" }} />
                </Tooltip>
            )}
        </div>
    );

    const menuItem: Item = { id: title, label: itemElement, onClick: onClickMenuItem }

    return (
        <MenuItem
            key={title}
            item={menuItem}
        />
    );
}
