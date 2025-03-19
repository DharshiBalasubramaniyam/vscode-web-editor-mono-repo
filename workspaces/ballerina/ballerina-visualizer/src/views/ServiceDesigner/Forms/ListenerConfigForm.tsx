
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Typography, ProgressRing } from "@dharshi/ui-toolkit";
import { FormField, FormValues } from "@dharshi/ballerina-side-panel";
import { ListenerModel, LineRange } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { URI, Utils } from "vscode-uri";
import FormGeneratorNew from "../../Forms/FormGeneratorNew";
import { FormHeader } from "../../../components/FormHeader";

const Container = styled.div`
    /* padding: 0 20px 20px; */
    max-width: 600px;
    > div:last-child {
        /* padding: 20px 0; */
        > div:last-child {
            justify-content: flex-start;
        }
    }
`;

const FormContainer = styled.div`
    /* padding-top: 15px; */
    padding-bottom: 15px;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    flex-direction: column;
`;

interface ListenerConfigFormProps {
    listenerModel: ListenerModel;
    onSubmit?: (data: ListenerModel) => void;
    onBack?: () => void;
    formSubmitText?: string;
}

export function ListenerConfigForm(props: ListenerConfigFormProps) {
    const { rpcClient } = useRpcContext();

    const [listenerFields, setListenerFields] = useState<FormField[]>([]);
    const { listenerModel, onSubmit, onBack, formSubmitText = "Next" } = props;
    const [filePath, setFilePath] = useState<string>('');
    const [targetLineRange, setTargetLineRange] = useState<LineRange>();

    useEffect(() => {
        listenerModel && setListenerFields(convertConfig(listenerModel));
        rpcClient.getVisualizerLocation().then(res => { 
            if (res.isBI) {
                setFilePath(Utils.join(URI.parse(res.projectUri), "main.bal").toString())
            } else {
                setFilePath(res.documentUri)
            }
         });
    }, [listenerModel]);

    const handleListenerSubmit = async (data: FormValues) => {
        console.log(">>>handle listener submit")
        listenerFields.forEach(val => {
            if (data[val.key]) {
                val.value = data[val.key]
            }
        })
        const response = updateConfig(listenerFields, listenerModel);
        onSubmit(response);
    };

    const createTitle = `Provide the necessary configuration details for the ${listenerModel.displayAnnotation.label} to complete the setup.`;
    const editTitle = `Update the configuration details for the ${listenerModel.displayAnnotation.label} as needed.`

    useEffect(() => {
        if (filePath && rpcClient) {
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
        <Container>

            {!listenerModel &&
                <LoadingContainer>
                    <ProgressRing />
                    <Typography variant="h3" sx={{ marginTop: '16px' }}>Loading Listener Configurations...</Typography>
                </LoadingContainer>
            }

            {listenerModel &&
                <>
                    {listenerFields.length > 0 &&
                        <FormContainer>
                            {/* <Typography variant="h2" sx={{ marginTop: '16px' }}>{listenerModel.displayAnnotation.label.charAt(0).toUpperCase() + listenerModel.displayAnnotation.label.slice(1)} Configuration</Typography>
                            <BodyText>
                                {formSubmitText === "Save" ? editTitle : createTitle}
                            </BodyText> */}
                            <FormHeader title={`${listenerModel.displayAnnotation.label.charAt(0).toUpperCase() + listenerModel.displayAnnotation.label.slice(1)} Configuration`} subtitle={`${formSubmitText === "Save" ? editTitle : createTitle}`} />
                            {filePath && targetLineRange &&
                                <FormGeneratorNew
                                    fileName={filePath}
                                    targetLineRange={targetLineRange}
                                    fields={listenerFields}
                                    onSubmit={handleListenerSubmit}
                                    onBack={onBack}
                                    submitText={formSubmitText}
                                />
                            }
                        </FormContainer>
                    }
                </>
            }
        </Container>
    );
}

export default ListenerConfigForm;

function convertConfig(listener: ListenerModel): FormField[] {
    const formFields: FormField[] = [];
    for (const key in listener.properties) {
        const expression = listener.properties[key];
        const formField: FormField = {
            key: key,
            label: expression?.metadata.label || key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, str => str.toUpperCase()),
            type: expression.valueType,
            documentation: expression?.metadata.description || "",
            valueType: expression.valueTypeConstraint,
            editable: expression.editable,
            optional: expression.optional,
            value: expression.value,
            valueTypeConstraint: expression.valueTypeConstraint,
            advanced: expression.advanced,
            diagnostics: [],
            items: expression.items,
            placeholder: expression.placeholder,
            lineRange: expression?.codedata?.lineRange
        }
        formFields.push(formField);
    }
    return formFields;
}

function updateConfig(formFields: FormField[], listener: ListenerModel): ListenerModel {
    formFields.forEach(field => {
        const value = field.value;
        if (field.type === "MULTIPLE_SELECT" || field.type === "EXPRESSION_SET") {
            listener.properties[field.key].values = value as string[];
        } else {
            listener.properties[field.key].value = value as string;
        }
        if (value && value.length > 0) {
            listener.properties[field.key].enabled = true;
        }
    })
    return listener;
}
