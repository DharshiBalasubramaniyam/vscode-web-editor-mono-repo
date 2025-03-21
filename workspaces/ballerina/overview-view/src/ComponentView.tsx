import React from "react";
import { ComponentViewInfo } from "./ComponentListView";
import { ComponentCard, Icon, Typography } from "@dharshi/ui-toolkit";
import { iconNameTranslator } from "./util/icon";
// import styled from "@emotion/styled";

interface ComponentViewProps {
    type?: string;
    info: ComponentViewInfo;
    updateSelection: (info: ComponentViewInfo) => void;
}


export function ComponentView(props: ComponentViewProps) {
    const { info, type, updateSelection } = props;

    const handleComponentClick = () => {
        updateSelection(info);
    };

    const isComponentAllowed = () => {
        switch (type) {
            case 'objects':
            case 'listeners':
                return false;
            default:
                return true;
        }
    }

    return (

        <ComponentCard
            id="Test"
            onClick={isComponentAllowed() ? handleComponentClick : undefined}
            sx={{
                '&:hover, &.active': {
                    '.icon svg g': {
                        fill: 'var(--vscode-editor-foreground)'
                    },
                    backgroundColor: 'var(--vscode-editor-hoverHighlightBackground)',
                    borderColor: 'var(--vscode-focusBorder)'
                },
                alignItems: 'center',
                border: '1px solid var(--vscode-editor-foreground)',
                borderRadius: 1,
                cursor: isComponentAllowed() ? 'cursor' : 'not-allowed',
                display: 'flex',
                height: 40,
                justifyContent: 'space-between',
                marginBottom: 16,
                marginRight: 16,
                padding: 10,
                width: 200
            }}
        >
            <Icon name={iconNameTranslator(type)} />
            <Typography variant="h3">
                {info.name.length ? info.name : '/'}
            </Typography>
        </ComponentCard>
    )
}
