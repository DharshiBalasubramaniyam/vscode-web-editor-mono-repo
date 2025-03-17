// tslint:disable: jsx-no-multiline-js
import React from 'react';

import { ErrorNodeKind, RenderingError } from './RenderingError';
import { WarningBanner } from '../Warning/DataMapperWarning';

// Function to render WarningBanner with error message
const renderWarningBanner = (classes: any, message: React.ReactNode) => (
    <WarningBanner
        message={message}
        className={classes.errorBanner}
    />
);

// Function to render error message with overlay
const renderErrorMessage = (classes: any, errorMessage: React.ReactNode) => (
    <>
        <div className={classes.overlay} />
        <div className={classes.errorMessage}>
            {errorMessage}
        </div>
    </>
);

// Component to render error based on error kind
export const IOErrorComponent: React.FC<{ errorKind: ErrorNodeKind; classes: any }> = ({ errorKind, classes }) => {
    if (errorKind) {
        const errorMessage = <RenderingError errorNodeKind={errorKind} />;
        return renderErrorMessage(classes, renderWarningBanner(classes, errorMessage));
    }
    return null;
};
