
import React, { useState, useEffect } from 'react';
import { FieldType, LineRange, Type } from '@dharshi/ballerina-core';
import { FormGeneratorNew } from '../Forms/FormGeneratorNew';
import { FormField, FormValues } from '@dharshi/ballerina-side-panel';

interface VariableFormProps {
    model: FieldType;
    filePath: string;
    lineRange: LineRange;
    onSave: (model: FieldType) => void;
    onClose: () => void;
}

export function VariableForm(props: VariableFormProps) {
    const { model, onSave, onClose, filePath, lineRange } = props;
    const [fields, setFields] = useState<FormField[]>([]);

    // Initialize form fields
    useEffect(() => {
        const initialFields = [
            {
                key: 'name',
                label: model.name.metadata?.label || 'Variable Name',
                type: 'IDENTIFIER',
                optional: model.name.optional,
                editable: model.name.editable,
                advanced: model.name.advanced,
                documentation: model.name.metadata?.description,
                value: model?.name.value || '',
                valueTypeConstraint: model.name?.valueTypeConstraint || '',
                lineRange: model?.name?.codedata?.lineRange
            },
            {
                key: 'returnType',
                label: model.type.metadata?.label || 'Type',
                type: 'TYPE',
                optional: model.type.optional,
                editable: model.type.editable,
                advanced: model.type.advanced,
                documentation: model.type.metadata?.description,
                value: model?.type.value || '',
                valueTypeConstraint: model.type?.valueTypeConstraint || ''
            },
            {
                key: 'expression',
                label: 'Default Value',
                type: 'EXPRESSION',
                optional: true, // TODO: need to fix for LS
                editable: model.defaultValue?.editable || false,
                advanced: model.defaultValue?.advanced || false,
                documentation: model.defaultValue?.metadata?.description,
                value: model?.defaultValue?.value || '',
                valueTypeConstraint: model.defaultValue?.valueTypeConstraint || ''
            }
        ];
        setFields(initialFields);
    }, [model]);

    const handleVariableSave = (data: FormValues) => {
        const updatedVariable: FieldType = {
            ...model,
            name: { ...model.name, value: data.name },
            type: { ...model.type, value: data.returnType },
            defaultValue: { ...model.defaultValue, value: data.expression }
        };
        onSave(updatedVariable);
    };

    return (
        <>
            {fields.length > 0 && (
                <FormGeneratorNew
                    isGraphqlEditor={true}
                    fileName={filePath}
                    targetLineRange={lineRange}
                    fields={fields}
                    onSubmit={handleVariableSave}
                    onBack={onClose}
                    submitText="Save"
                />
            )}
        </>
    );
}
