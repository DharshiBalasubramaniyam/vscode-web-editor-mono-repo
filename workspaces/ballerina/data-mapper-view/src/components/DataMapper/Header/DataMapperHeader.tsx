// tslint:disable: jsx-no-multiline-js
import React from "react";

import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import styled from "@emotion/styled";
import { Button, Codicon, Icon, Typography } from "@dharshi/ui-toolkit";

import { SelectionState, ViewOption } from "../DataMapper";
import AutoMapButton from "./AutoMapButton";
import ConfigureButton from "./ConfigureButton";
import HeaderBreadcrumb from "./HeaderBreadcrumb";
import HeaderSearchBox from "./HeaderSearchBox";
import EditButton from "./EditButton";

export interface DataMapperHeaderProps {
    selection: SelectionState;
    hasEditDisabled: boolean;
    experimentalEnabled: boolean;
    isBI?: boolean;
    changeSelection: (mode: ViewOption, selection?: SelectionState, navIndex?: number) => void;
    onEdit: () => void;
    onClose?: () => void;
    autoMapWithAI: () => Promise<void>;
    onBack?: () => void;
}

export function DataMapperHeader(props: DataMapperHeaderProps) {
    const {
        selection,
        hasEditDisabled,
        experimentalEnabled,
        isBI,
        changeSelection,
        onEdit,
        onClose,
        autoMapWithAI,
        onBack
    } = props;

    const handleAutoMap = async () => {
        await autoMapWithAI();
    };

    return (
        <HeaderContainer>
            <IconButton onClick={onBack}>
                <Icon name="bi-arrow-back" iconSx={{ fontSize: "24px", color: "var(--vscode-foreground)" }} />
            </IconButton>
            <BreadCrumb>
                <Title>Data Mapper</Title>
                {!hasEditDisabled && (
                    <HeaderBreadcrumb
                        selection={selection}
                        changeSelection={changeSelection}
                    />
                )}
            </BreadCrumb>
            {!hasEditDisabled && !onClose && (
                <RightContainer>
                    <FilterBar>
                        <HeaderSearchBox selection={selection} />
                    </FilterBar>
                    <AutoMapButton onClick={handleAutoMap} />
                    <EditButton onClick={onEdit} />
                </RightContainer>
            )}
            {onClose && (
                <VSCodeButton 
                    appearance="icon"
                    onClick={onClose}
                    style={{ marginLeft: "15px" }}
                >
                    <Codicon name="chrome-close" />
                </VSCodeButton>
            )}
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    height: 56px;
    display: flex;
    padding: 15px;
    background-color: var(--vscode-editorWidget-background);
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    border-bottom: 1px solid rgba(102,103,133,0.15);
`;

const Title = styled.h2`
    margin: 0;
    font-size: 20px;
    font-weight: 600;
    color: var(--vscode-foreground);
`;

const BreadCrumb = styled.div`
    width: 60%;
    display: flex;
    align-items: baseline;
    gap: 12px;
    margin-left: 12px;
`;

const FilterBar = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: flex-end;
`;

const IconButton = styled.div`
    padding: 4px;
    cursor: pointer;
    border-radius: 4px;

    &:hover {
        background-color: var(--vscode-toolbar-hoverBackground);
    }

    & > div:first-child {
        width: 24px;
        height: 24px;
        font-size: 24px;
    }
`;

const LeftContainer = styled.div`
    gap: 12px;
`;

const RightContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
`;
