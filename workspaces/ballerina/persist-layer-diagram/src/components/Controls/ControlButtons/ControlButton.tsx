
import React, { ReactNode } from 'react';
import { useStyles } from './style';
import { Button, Tooltip } from '@dharshi/ui-toolkit';

interface ControlButtonProps {
    children: ReactNode;
    onClick: () => void;
    tooltipTitle: string;
}

export function CanvasControlButton(props: ControlButtonProps) {
    const { children, onClick, tooltipTitle } = props;
    const styles = useStyles();

    return (
        <Tooltip
            content={tooltipTitle}
            position="bottom"
            sx={{ padding: '4px' }} >
            <Button
                onClick={onClick}
                appearance='icon'
                className={styles.controlButton}
            >
                {children}
            </Button>
        </Tooltip>
    );
}
