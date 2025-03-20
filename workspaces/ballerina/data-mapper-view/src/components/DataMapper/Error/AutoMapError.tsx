// tslint:disable: jsx-no-multiline-js
import React from 'react';

import { Button, Typography } from '@dharshi/ui-toolkit';
import { css } from '@emotion/css';

const useStyles = (() => ({
    errorContainer: css({
        display: 'flex',
        flexDirection: 'column'
    }),
    closeButton: css({
        marginTop: '20px',
        textTransform: 'none',
        alignSelf: 'flex-end',
        justifySelf: 'flex-start',
    })
}))

export interface AutoMapError {
    code: number;
    onClose: () => void;
    message?: string;
}

export function AutoMapError(props: AutoMapError) {
    const { code, onClose, message } = props;
    const classes = useStyles();

    let errorMessage = "An unknown error occurred while performing automatic mapping";

    if (message) {
        errorMessage = message;
    }

    function shouldRenderGithubRepo(errorCode: number): boolean {
        switch (errorCode) {
            case 3:
            case 4:
            case 5:
                return true;
            default:
                return false;
        }
    }

    return (
        <div className={classes.errorContainer}>
            <Typography variant="body2">
                {errorMessage}
            </Typography>
            {shouldRenderGithubRepo(code) && (
                <Typography >
                    Please raise an issue with a sample code in our <a href="https://github.com/wso2/ballerina-plugin-vscode/issues">issue tracker.</a>
                </Typography>
            )}
            <Button
                onClick={onClose}
                className={classes.closeButton}
            >
                {'Close'}
            </Button>
        </div>
    )
}
