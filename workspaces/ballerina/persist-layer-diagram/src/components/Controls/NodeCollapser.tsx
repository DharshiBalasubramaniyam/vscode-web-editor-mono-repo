
import React from 'react';
import { Button, Icon } from '@dharshi/ui-toolkit';

interface NodeCollapserProps {
    collapsedMode: boolean;
    setIsCollapsedMode: (collapsedMode: boolean) => void;
}

export function NodeCollapser(props: NodeCollapserProps) {
    const { collapsedMode, setIsCollapsedMode } = props;

    return (
        <Button
            onClick={() => setIsCollapsedMode(!collapsedMode)}
            appearance='icon'
        >
            {collapsedMode ?
                <Icon name="unfold-more" sx={{ marginRight: '10px' }} /> :
                <Icon name='unfold-less' sx={{ marginRight: '10px' }} />
            }
            {collapsedMode ? 'Expand' : 'Collapse'}
        </Button>
    );
}
