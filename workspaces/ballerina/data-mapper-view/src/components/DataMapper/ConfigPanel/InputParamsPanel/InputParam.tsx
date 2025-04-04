// tslint:disable: jsx-no-multiline-js
import React from "react";

import styled from "@emotion/styled";

import { DataMapperInputParam } from "./types";
import { Button, Codicon } from "@dharshi/ui-toolkit";

interface InputParamItemProps {
    index: number;
    inputParam: DataMapperInputParam;
    onDelete?: (index: number, inputParam: DataMapperInputParam) => void;
    onEditClick?: (index: number, inputParam: DataMapperInputParam) => void;
}

export function InputParamItem(props: InputParamItemProps) {
    const { index, inputParam, onDelete, onEditClick } = props;

    const label = (
        <>
            <TypeName isInvalid={inputParam.isUnsupported}>{inputParam.isArray ? `${inputParam.type}[]` : inputParam.type}</TypeName>
            <span>{" " + inputParam.name}</span>
        </>
    );

    const handleDelete = () => {
        onDelete(index, inputParam);
    };
    const handleEdit = () => {
        onEditClick(index, inputParam);
    };
    return (
        <InputParamContainer >
            <ClickToEditContainer isInvalid={inputParam.isUnsupported} onClick={!inputParam.isUnsupported && handleEdit}>
                {label}
            </ClickToEditContainer>
            <Box>
                {!inputParam.isUnsupported && (
                    <EditButton
                        onClick={handleEdit}
                        appearance="icon"
                        data-testid={`data-mapper-config-edit-input-${index}`}
                    >
                        <Codicon name="edit" iconSx={{ color: "var(--vscode-input-placeholderForeground)" }} />
                    </EditButton>
                )}
                <DeleteButton
                    onClick={handleDelete}
                    appearance="icon"
                    data-testid={`data-mapper-config-delete-input-${index}`}
                >
                    <Codicon name="trash" iconSx={{ color: "var(--vscode-errorForeground)" }} />
                </DeleteButton>
            </Box>
        </InputParamContainer>
    );
}

const ClickToEditContainer = styled.div(({ isInvalid }: { isInvalid?: boolean }) => ({
    cursor: isInvalid ? 'auto' : 'pointer',
    width: '100%'
}));

const DeleteButton = styled(Button)`
    padding: 0;
    color: var(--vscode-errorForeground);
`;

const EditButton = styled(Button)`
    padding: 0;
    margin-right: 5px;
    color: #36B475;
`;

const InputParamContainer = styled.div(() => ({
    background: 'var(--vscode-sideBar-background)',
    color: 'inherit',
    padding: 10,
    margin: '1rem 0 0.25rem',
    justifyContent: 'space-between',
    display: 'flex',
    width: '100%',
    alignItems: 'center'
}));

const TypeName = styled.span(({ isInvalid }: { isInvalid?: boolean }) => ({
    fontWeight: 500,
    color: `${isInvalid ? 'var(--vscode-errorForeground)' : 'inherit'}`,
}));

const Box = styled.div`
    display: flex;
`;
