// tslint:disable: jsx-no-multiline-js

import React, { useState } from 'react';

import { Codicon, Divider, LinkButton, Typography } from '@dharshi/ui-toolkit';
import styled from '@emotion/styled';
import { ParamEditor } from './ParamEditor';
import { ParamItem } from './ParamItem';
import { ConfigProperties, ParameterModel } from '@dharshi/ballerina-core';

export interface ParametersProps {
    parameters: ParameterModel[];
    onChange?: (parameters: ParameterModel[]) => void,
    readonly?: boolean;
}

const AddButtonWrapper = styled.div`
	margin: 8px 0;
`;


export function Parameters(props: ParametersProps) {
    const { parameters, readonly, onChange } = props;

    const enabledParameters = parameters.filter(param => param.enabled);

    const [editModel, setEditModel] = useState<ParameterModel>(undefined);
    const [isNew, setIsNew] = useState<boolean>(false);

    const onEdit = (parameter: ParameterModel) => {
        // Handle parameter edit
    };

    const onAddParamClick = () => {
        // Handle adding new parameter
    };

    const onDelete = (param: ParameterModel) => {
        // Handle deleting parameter
    };

    const onChangeParam = (param: ParameterModel) => {
        setEditModel(param);
    };

    const onSaveParam = (param: ParameterModel) => {
        // Handle saving parameter
    };

    const onParamEditCancel = () => {
        // Handle parameter edit cancel
    };

    return (
        <div>
            <Typography sx={{ marginBlockEnd: 10 }} variant="h4">Parameters</Typography>
            {enabledParameters.map((param: ParameterModel, index) => (
                <ParamItem
                    key={index}
                    readonly={readonly}
                    param={param}
                    onDelete={onDelete}
                    onEditClick={onEdit}
                />
            ))}
            {!readonly && editModel &&
                <ParamEditor
                    param={editModel}
                    onChange={onChangeParam}
                    onSave={onSaveParam}
                    onCancel={onParamEditCancel}
                />
            }
            <AddButtonWrapper >
                <LinkButton sx={readonly && { color: "var(--vscode-badge-background)" } || editModel && { opacity: 0.5, pointerEvents: 'none' }} onClick={editModel ? undefined : (!readonly && onAddParamClick)}>
                    <Codicon name="add" />
                    <>Add Parameter</>
                </LinkButton>
            </AddButtonWrapper>

        </div >
    );
}
