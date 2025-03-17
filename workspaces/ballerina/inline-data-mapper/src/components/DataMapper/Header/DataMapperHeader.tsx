// tslint:disable: jsx-no-multiline-js
import React from "react";
import styled from "@emotion/styled";
import { Button, Codicon } from "@dharshi/ui-toolkit";

import HeaderSearchBox from "./HeaderSearchBox";

export interface DataMapperHeaderProps {
    hasEditDisabled: boolean;
    onClose: () => void;
}

export function DataMapperHeader(props: DataMapperHeaderProps) {
    const { hasEditDisabled, onClose } = props;

    return (
        <HeaderContainer>
            <Title>Data Mapper</Title>
            <RightSection>
                {!hasEditDisabled && (
                    <IOFilterBar>
                        <HeaderSearchBox />
                    </IOFilterBar>
                )}
                <Button appearance="icon" onClick={onClose}>
                    <Codicon name="close" />
                </Button>
            </RightSection>
        </HeaderContainer>
    );
}

const HeaderContainer = styled.div`
    height: 56px;
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 12px;
    background-color: var(--vscode-editorWidget-background);
`;

const Title = styled.h3`
    margin: 0;
    color: var(--vscode-foreground);
    font-size: var(--vscode-font-size);
`;

const RightSection = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    margin-left: auto;
`;

const IOFilterBar = styled.div`
    display: flex;
    align-items: center;
    max-width: 300px;
    min-width: 200px;
`;
