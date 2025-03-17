
import React from 'react';
import { useStyles } from './style';
import { Button, Codicon } from '@dharshi/ui-toolkit';

export interface PromptScreenProps {
    userMessage: string;
    showProblemPanel: (() => void) | undefined;
}

export function PromptScreen(props: PromptScreenProps) {
    const { showProblemPanel, userMessage } = props;
    const styles = useStyles();

    return (
        <div className={styles.container}>
            <h3 className={styles.messageBox}>{userMessage}</h3>
            {showProblemPanel &&
                <Button
                    aria-label='add'
                    id={'add-component-btn'}
                    appearance="icon"
                    onClick={showProblemPanel}
                >
                    <Codicon name='search' iconSx={{ marginRight: '5px' }} />
                    View Diagnostics
                </Button>
            }
        </div>
    );
}
