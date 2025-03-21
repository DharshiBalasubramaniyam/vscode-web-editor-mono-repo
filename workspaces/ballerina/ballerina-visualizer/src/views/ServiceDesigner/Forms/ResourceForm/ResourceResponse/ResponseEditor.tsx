// tslint:disable: jsx-no-multiline-js

import { useEffect, useState } from 'react';

import { CheckBox, Divider, Typography } from '@dharshi/ui-toolkit';
import { EditorContainer } from '../../../styles';
import { LineRange, StatusCodeResponse, responseCodes } from '@dharshi/ballerina-core';
import { getTitleFromResponseCode } from '../../../utils';
import { FormField } from '@dharshi/ballerina-side-panel';
import FormGeneratorNew from '../../../../Forms/FormGeneratorNew';
import { useRpcContext } from '@dharshi/ballerina-rpc-client';
import { URI, Utils } from 'vscode-uri';

export interface ParamProps {
    index: number;
    response: StatusCodeResponse;
    isEdit: boolean;
    schema: StatusCodeResponse;
    onChange: (param: StatusCodeResponse) => void;
    onSave: (param: StatusCodeResponse, index: number) => void;
    onCancel?: (id?: number) => void;
}

export function ResponseEditor(props: ParamProps) {
    const { index, response, isEdit, onSave, onChange, onCancel, schema } = props;

    const { rpcClient } = useRpcContext();

    const [filePath, setFilePath] = useState<string>('');

    const [targetLineRange, setTargetLineRange] = useState<LineRange>();

    useEffect(() => {
        rpcClient.getVisualizerLocation().then(res => { setFilePath(res.documentUri ? res.documentUri : Utils.joinPath(URI.parse(res.projectUri), 'main.bal').toString()) });
    }, []);

    useEffect(() => {
        if (!response.createStatusCodeResponse) {
            response.createStatusCodeResponse = schema.createStatusCodeResponse;
        }
    }, [response]);

    const handleCodeChange = (value: string) => {
        const code = responseCodes.find(code => code.title === value).code;
        response.statusCode.enabled = !!value;
        response.statusCode.value = String(code);
        onChange(response);
    };

    const handleNTypeChange = (value: string, isArray: boolean) => {
        response.type.enabled = !!value;
        response.type.value = isArray ? `${value}[]` : value;
        onChange(response);
    };

    const handleTypeChange = (value: string, isArray: boolean) => {
        response.body.enabled = !!value;
        response.body.value = isArray ? `${value}[]` : value;
        onChange(response);
    };

    const handleNamedTypeChange = (checked: boolean) => {
        response.createStatusCodeResponse.value = checked ? "true" : "false";
        response.createStatusCodeResponse.enabled = checked;
        onChange(response);
    };

    const handleNameValueChange = (value: string) => {
        response.name.value = value;
        response.name.enabled = response.createStatusCodeResponse.enabled;
        onChange(response);
    };

    const handleOnCancel = () => {
        onCancel(index);
    };

    const handleOnSave = () => {
        onSave(response, index);
    };

    const currentFields: FormField[] = [
        {
            key: `code`,
            label: schema.statusCode.metadata.label,
            type: 'SINGLE_SELECT',
            optional: false,
            editable: true,
            documentation: '',
            value: getTitleFromResponseCode(Number(response.statusCode.value)),
            items: responseCodes.map(code => code.title),
            valueTypeConstraint: "",
            addNewButton: false
        },
        {
            key: `typeVal`,
            label: schema.body.metadata.label,
            type: 'TYPE',
            optional: false,
            editable: true,
            documentation: '',
            value: response.body.value,
            valueTypeConstraint: ""
        },
        {
            key: `namedType`,
            label: schema.name.metadata.label,
            type: 'string',
            optional: false,
            advanced: false,
            editable: true,
            documentation: '',
            value: response.name.value,
            valueTypeConstraint: ""
        }
    ];


    const typeField: FormField[] = [
        {
            key: `typeVal`,
            label: schema.type.metadata.label,
            type: 'TYPE',
            optional: false,
            editable: true,
            documentation: '',
            value: response.type.value,
            valueTypeConstraint: ""
        }
    ];

    const onTypeNameSubmit = (dataValues: any) => {
        console.log("Type name values", dataValues);

        const code = responseCodes.find(code => code.title === dataValues.code).code;
        response.statusCode.enabled = !!dataValues.code;
        response.statusCode.value = String(code);

        response.body.enabled = !!dataValues.typeVal;
        response.body.value = dataValues.typeVal;

        response.name.value = dataValues.namedType;
        response.name.enabled = response.createStatusCodeResponse.enabled;
        onSave(response, index);

    }

    const onTypeValueSubmit = (dataValues: any) => {
        response.type.enabled = !!dataValues.typeVal;
        response.type.value = dataValues.typeVal;
        onSave(response, index);
    }

    useEffect(() => {
        if (rpcClient) {
            rpcClient
                .getBIDiagramRpcClient()
                .getEndOfFile({ filePath })
                .then((res) => {
                    setTargetLineRange({
                        startLine: res,
                        endLine: res,
                    });
                });
        }
    }, [filePath, rpcClient]);

    return (
        <EditorContainer>
            <Typography sx={{ marginBlockEnd: 10 }} variant="h4">Response Configuration</Typography>
            <Divider />
            {!isEdit && filePath && targetLineRange &&
                <>
                    <CheckBox
                        label={schema.createStatusCodeResponse?.metadata.description}
                        value={response.createStatusCodeResponse?.metadata.description}
                        checked={response.createStatusCodeResponse?.value === "true"}
                        onChange={handleNamedTypeChange}
                        sx={{ paddingLeft: "16px" }}
                    />
                    <>
                        {response.createStatusCodeResponse?.value === "true" &&
                            <>
                                <FormGeneratorNew
                                    fileName={filePath}
                                    targetLineRange={targetLineRange}
                                    fields={currentFields}
                                    onBack={handleOnCancel}
                                    onSubmit={onTypeNameSubmit}
                                    submitText={"Add"}
                                    nestedForm={true}
                                />
                            </>
                        }
                        {(!response.createStatusCodeResponse.value || response.createStatusCodeResponse.value === "false") &&
                            <FormGeneratorNew
                                fileName={filePath}
                                targetLineRange={targetLineRange}
                                fields={typeField}
                                onBack={handleOnCancel}
                                onSubmit={onTypeValueSubmit}
                                submitText={"Add"}
                                nestedForm={true}
                            />
                        }
                    </>
                </>
            }
            {isEdit && filePath && targetLineRange &&
                <>
                    <FormGeneratorNew
                        fileName={filePath}
                        targetLineRange={targetLineRange}
                        fields={typeField}
                        onBack={handleOnCancel}
                        onSubmit={onTypeValueSubmit}
                        submitText={"Save"}
                        nestedForm={true}
                    />
                </>
            }
        </EditorContainer >
    );
}
