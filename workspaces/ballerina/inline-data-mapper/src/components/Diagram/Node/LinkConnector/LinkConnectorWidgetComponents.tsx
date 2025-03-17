// tslint:disable: jsx-no-multiline-js
import * as React from 'react';
import { DiagramEngine } from '@projectstorm/react-diagrams-core';
import { Button, Codicon } from '@dharshi/ui-toolkit';

import { DataMapperPortWidget, IntermediatePortModel } from '../../Port';

export const renderPortWidget = (engine: DiagramEngine, port: IntermediatePortModel, label: string) => (
    <DataMapperPortWidget
        engine={engine}
        port={port}
        dataTestId={`link-connector-node-${label}`}
    />
);

export const renderEditButton = (onClick: () => void, nodeValue: string) => (
    <Button
        appearance="icon"
        onClick={onClick}
        data-testid={`link-connector-edit-${nodeValue}`}
        tooltip='edit'
    >
        <Codicon name="code" iconSx={{ color: "var(--vscode-input-placeholderForeground)" }} />
    </Button>
);

export const renderDeleteButton = (onClick: () => void, nodeValue: string) => (
    <Button
        appearance="icon"
        onClick={onClick}
        data-testid={`link-connector-delete-${nodeValue}`}
        tooltip='delete'
    >
        <Codicon name="trash" iconSx={{ color: "var(--vscode-errorForeground)" }} />
    </Button>
);
