import React, { useState } from 'react';
import { Button, CheckBox, Codicon } from '@dharshi/ui-toolkit';
import { Type } from '@dharshi/ballerina-core';

interface AdvancedOptionsProps {
    type: Type;
    onChange: (type: Type) => void;
}

export function AdvancedOptions({ type, onChange }: AdvancedOptionsProps) {
    const [closedRecord, setClosedRecord] = useState<boolean>(false);
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <div>
            <div
                style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '15px', marginBottom: '5px', cursor: 'pointer' }}
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <Button
                    appearance='icon'
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsExpanded(!isExpanded);
                    }}
                >
                    <Codicon name={isExpanded ? "chevron-up" : "chevron-down"} />
                </Button>
                <span>Advanced Options</span>
            </div>
            {isExpanded && (
                <CheckBox
                    sx={{ border: 'none' }}
                    label="Closed Record"
                    checked={closedRecord}
                    onChange={(e) => { }}
                />
            )}
        </div>
    );
}
