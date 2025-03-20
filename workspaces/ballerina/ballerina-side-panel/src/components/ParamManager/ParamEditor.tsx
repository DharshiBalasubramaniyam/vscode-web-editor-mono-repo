// tslint:disable: jsx-no-multiline-js

import React, { useEffect, useState } from 'react';

import { EditorContainer } from './styles';
import { Parameter } from './ParamManager';
import Form from '../Form';
import { FormField, FormValues } from '../Form/types';
import { useFormContext } from '../../context';

export interface ParamProps {
    parameter: Parameter;
    paramFields: FormField[];
    filePath?: string;
    onSave: (param: Parameter) => void;
    onCancelEdit: (param?: Parameter) => void;
    openRecordEditor?: (open: boolean) => void;
}

export function ParamEditor(props: ParamProps) {
    const { parameter, paramFields, onSave, onCancelEdit, openRecordEditor, filePath } = props;
    const { expressionEditor } = useFormContext();

    const [fields, setFields] = useState<FormField[]>(paramFields);

    useEffect(() => {
        setFields(paramFields);
    }, [paramFields]);

    const handleOnSave = (data: FormValues) => {
        setFields([]);
        parameter.formValues = data;
        onSave(parameter);
    }

    return (
        <EditorContainer>
            <Form
                formFields={fields}
                openRecordEditor={openRecordEditor}
                onSubmit={handleOnSave}
                fileName={filePath}
                onCancelForm={() => onCancelEdit(parameter)}
                expressionEditor={expressionEditor}
                submitText={parameter.key ? 'Save' : 'Add'}
                nestedForm={true}
            />
        </EditorContainer >
    );
}
