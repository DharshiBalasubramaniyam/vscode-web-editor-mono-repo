/* eslint-disable react-hooks/exhaustive-deps */

import styled from '@emotion/styled';
import { ConfigVariable } from '@dharshi/ballerina-core';
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { PanelContainer, FormValues } from '@dharshi/ballerina-side-panel';
import FormGenerator from '../../Forms/FormGenerator';


namespace S {
    export const FormContainer = styled.div`
        display: flex;
        flex-direction: column;
        gap: 4px;
        width: inherit;
    `;
}

export interface ConfigFormProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    filename: string;
}

export function AddForm(props: ConfigFormProps) {
    const { isOpen, onClose, title, filename } = props;

    const { rpcClient } = useRpcContext();

    const variable: ConfigVariable = {
        "id": "",
        "metadata": {
            "label": "Config",
            "description": "Create a configurable variable"
        },
        "codedata": {
            "node": "CONFIG_VARIABLE",
            "lineRange": {
                "fileName": "config.bal",
                "startLine": {
                    "line": 0,
                    "offset": 0
                },
                "endLine": {
                    "line": 0,
                    "offset": 0
                }
            }
        },
        "returning": false,
        "properties": {
            "type": {
                "metadata": {
                    "label": "Type",
                    "description": "Type of the variable"
                },
                "valueType": "TYPE",
                "value": "",
                "optional": false,
                "advanced": false,
                "editable": true
            },
            "variable": {
                "metadata": {
                    "label": "Variable",
                    "description": "Name of the variable"
                },
                "valueType": "IDENTIFIER",
                "value": "",
                "optional": false,
                "advanced": false,
                "editable": true,
            },
            "defaultable": {
                "metadata": {
                    "label": "Default value",
                    "description": "Default value for the config, if empty your need to provide a value at runtime"
                },
                "valueType": "EXPRESSION",
                "value": "",
                "optional": true,
                "advanced": true,
                "editable": true
            }
        },
        branches: []
    };

    const handleSave = async (data: FormValues) => {
        variable.properties.defaultable.value =
            data.properties.defaultable.value === "" || data.properties.defaultable.value === null ?
                "?"
                : data.properties.defaultable.value;
        variable.properties.defaultable.optional = true;

        variable.properties.type.value = data.properties.type.value;
        variable.properties.variable.value = data.properties.variable.value;
        
        rpcClient
            .getBIDiagramRpcClient()
            .updateConfigVariables({
                configVariable: variable,
                configFilePath: filename
            })
            .then((response: any) => {
                console.log(">>> Config variables------", response);
            })
            .finally(() => {
                onClose();
            });
    };

    return (
        <>
            <PanelContainer
                title={title}
                show={isOpen}
                onClose={onClose}
            >
                <FormGenerator
                    fileName={filename}
                    node={variable}
                    targetLineRange={{
                        startLine: variable.codedata.lineRange.startLine,
                        endLine: variable.codedata.lineRange.endLine
                    }}
                    onSubmit={handleSave}
                />

            </PanelContainer>
        </>
    );
}

export default AddForm;
