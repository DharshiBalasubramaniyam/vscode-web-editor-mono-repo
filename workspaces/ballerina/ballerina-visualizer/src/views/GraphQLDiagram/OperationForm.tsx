import React, { useState, useEffect } from 'react';
import { FunctionModel, LineRange, ParameterModel, ConfigProperties, Type } from '@dharshi/ballerina-core';
import { FormGeneratorNew } from '../Forms/FormGeneratorNew';
import { FormField, FormValues, Parameter } from '@dharshi/ballerina-side-panel';

interface OperationFormProps {
    model: FunctionModel;
    filePath: string;
    lineRange: LineRange;
    isGraphqlView: boolean;
    isServiceClass?: boolean;
    onSave: (model: FunctionModel) => void;
    onClose: () => void;
}

export function OperationForm(props: OperationFormProps) {
    console.log("OperationForm props: ", props);
    const { model, onSave, onClose, filePath, lineRange, isGraphqlView, isServiceClass } = props;
    const [fields, setFields] = useState<FormField[]>([]);

    const handleParamChange = (param: Parameter) => {
        const name = `${param.formValues['variable']}`;
        const type = `${param.formValues['type']}`;
        const hasDefaultValue = Object.keys(param.formValues).includes('defaultable') &&
            param.formValues['defaultable'] !== undefined &&
            param.formValues['defaultable'] !== '';

        const defaultValue = hasDefaultValue ? `${param.formValues['defaultable']}`.trim() : '';
        let value = `${type} ${name}`;
        if (defaultValue) {
            value += ` = ${defaultValue}`;
        }
        return {
            ...param,
            key: name,
            value: value
        }
    };

    const getFunctionParametersList = (params: Parameter[]) => {
        const paramList: ParameterModel[] = [];
        const paramFields = convertSchemaToFormFields(model.schema);

        params.forEach(param => {
            // Find matching field configurations from schema
            const typeField = paramFields.find(field => field.key === 'type');
            const nameField = paramFields.find(field => field.key === 'variable');
            const defaultField = paramFields.find(field => field.key === 'defaultable');

            paramList.push({
                kind: 'REQUIRED',
                enabled: typeField?.enabled ?? true,
                editable: typeField?.editable ?? true,
                advanced: typeField?.advanced ?? false,
                optional: typeField?.optional ?? false,
                type: {
                    value: param.formValues['type'] as string,
                    valueType: typeField?.type,
                    isType: true,
                    optional: typeField?.optional,
                    advanced: typeField?.advanced,
                    addNewButton: false,
                    enabled: typeField?.enabled,
                    editable: typeField?.editable,
                },
                name: {
                    value: param.formValues['variable'] as string,
                    valueType: nameField?.type,
                    isType: false,
                    optional: nameField?.optional,
                    advanced: nameField?.advanced,
                    addNewButton: false,
                    enabled: nameField?.enabled,
                    editable: nameField?.editable
                },
                defaultValue: {
                    value: param.formValues['defaultable'],
                    valueType: defaultField?.type || 'string',
                    isType: false,
                    optional: defaultField?.optional,
                    advanced: defaultField?.advanced,
                    addNewButton: false,
                    enabled: defaultField?.enabled,
                    editable: defaultField?.editable
                }
            });
        });
        return paramList;
    }

    // Initialize form fields
    useEffect(() => {
        const initialFields = [
            {
                key: 'name',
                label: model.name.metadata?.label || 'Operation Name',
                type: 'IDENTIFIER',
                optional: model.name.optional,
                editable: model.name.editable,
                advanced: model.name.advanced,
                enabled: model.name.enabled,
                documentation: model.name.metadata?.description || '',
                value: model.name.value,
                valueTypeConstraint: model.name.valueTypeConstraint || '',
                lineRange: model?.name?.codedata?.lineRange
            },
            {
                key: 'parameters',
                label: isServiceClass ? 'Parameters' : (isGraphqlView ? 'Arguments' : 'Parameters'),
                type: 'PARAM_MANAGER',
                optional: true,
                editable: true,
                enabled: true,
                documentation: '',
                value: model.parameters || "",
                paramManagerProps: {
                    paramValues: model.parameters.map((param, index) => convertParameterToParamValue(param, index)),
                    formFields: convertSchemaToFormFields(model.schema),
                    handleParameter: handleParamChange
                },
                valueTypeConstraint: ''
            },
            {
                key: 'returnType',
                label: model.returnType.metadata?.label || 'Return Type',
                type: 'TYPE',
                optional: model.returnType.optional,
                enabled: model.returnType.enabled,
                editable: model.returnType.editable,
                advanced: model.returnType.advanced,
                documentation: model.returnType.metadata?.description || '',
                value: model.returnType.value,
                valueTypeConstraint: model.returnType.valueTypeConstraint || ''
            }
        ];
        setFields(initialFields);
    }, [model]);

    const handleFunctionCreate = (data: FormValues) => {
        console.log("Function create with data:", data);
        const { name, returnType, parameters: params } = data;
        const paramList = params ? getFunctionParametersList(params) : [];
        const newFunctionModel = { ...model };
        newFunctionModel.name.value = name;
        newFunctionModel.returnType.value = returnType;
        newFunctionModel.parameters = paramList;
        onSave(newFunctionModel);
    };

    return (
        <>
            {fields.length > 0 && (
                <FormGeneratorNew
                    fileName={filePath}
                    targetLineRange={lineRange}
                    fields={fields}
                    onSubmit={handleFunctionCreate}
                    onBack={onClose}
                    submitText="Save"
                    isGraphqlEditor={isGraphqlView}
                    helperPaneSide="left"
                />
            )}
        </>
    );
}

export function convertSchemaToFormFields(schema: ConfigProperties): FormField[] {
    const formFields: FormField[] = [];

    // Get the parameter configuration if it exists
    const parameterConfig = schema["parameter"] as ConfigProperties;
    if (parameterConfig) {
        // Iterate over each parameter field in the parameter config
        for (const key in parameterConfig) {
            if (parameterConfig.hasOwnProperty(key)) {
                const parameter = parameterConfig[key];
                if (parameter.metadata && parameter.metadata.label) {
                    const formField = convertParameterToFormField(key, parameter as ParameterModel);
                    console.log("Form Field: ", formField);
                    formFields.push(formField);
                }
            }
        }
    }

    return formFields;
}

export function convertParameterToFormField(key: string, param: ParameterModel): FormField {
    return {
        key: key === "defaultValue" ? "defaultable" : key === "name" ? "variable" : key,
        label: param.metadata?.label,
        type: param.valueType || 'string',
        optional: param.optional || false,
        editable: param.editable || false,
        advanced: key === "defaultValue" ? true : param.advanced,
        documentation: param.metadata?.description || '',
        value: param.value || '',
        valueTypeConstraint: param?.valueTypeConstraint || '',
        enabled: param.enabled ?? true,
        lineRange: param?.codedata?.lineRange
    };
}

function convertParameterToParamValue(param: ParameterModel, index: number) {
    return {
        id: index,
        key: param.name.value,
        value: `${param.type.value} ${param.name.value}${param.defaultValue?.value ? ` = ${param.defaultValue.value}` : ''}`,
        formValues: {
            variable: param.name.value,
            type: param.type.value,
            defaultable: param.defaultValue?.value || ''
        },
        icon: 'symbol-variable',
        identifierEditable: param.name?.editable,
        identifierRange: param.name.codedata?.lineRange
    };
}
