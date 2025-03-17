
import React, { ReactNode } from 'react';

import { Codicon } from '@dharshi/ui-toolkit';
import classNames from "classnames";
import { useStyles } from './style';

export interface WarningBannerProps {
    message: ReactNode | string;
    testId?: string;
    className?: string;
}

export const WarningBanner = (props: WarningBannerProps) => {
    const classes = useStyles();
    const { message, testId, className } = props;

    return (
        <div className={classNames(classes.warningContainer, className)} data-testid="warning-banner">
            <div className={classes.warningIcon}>
                <Codicon iconSx={{ fontSize: 25 }} name="warning" />
            </div>
            <div data-test-id={testId} className={classes.warningBody} >
                {(typeof message === 'string' ? <p>{message}</p> : (message))}
            </div>
        </div>
    );
};
