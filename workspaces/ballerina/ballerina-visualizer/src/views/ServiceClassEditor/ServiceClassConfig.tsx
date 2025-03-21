import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { ProgressRing, Typography, View, ViewContent } from "@dharshi/ui-toolkit";
import { FormField, FormValues } from "@dharshi/ballerina-side-panel";
import { ModelFromCodeRequest, NodePosition, PropertyModel, ServiceClassModel } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { FormGeneratorNew } from "../Forms/FormGeneratorNew";
import { FormHeader } from "../../components/FormHeader";
import { TopNavigationBar } from "../../components/TopNavigationBar";
import { TitleBar } from "../../components/TitleBar";

const Container = styled.div`
    max-width: 600px;
    height: 100%;
    > div:last-child {
        > div:last-child {
            justify-content: flex-start;
        }
    }
`;

const FormContainer = styled.div`
    padding-bottom: 15px;
`;

const LoadingContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80vh;
    flex-direction: column;
`;

interface ServiceClassConfigProps {
    filePath: string;
    position: NodePosition;
    projectUri: string;
}

export function ServiceClassConfig(props: ServiceClassConfigProps) {
    const { filePath, position } = props;
    const { rpcClient } = useRpcContext();
    const [serviceClassModel, setServiceClassModel] = useState<ServiceClassModel | null>(null);
    const [serviceClassFields, setServiceClassFields] = useState<FormField[]>([]);

    const editTitle = `Update the configuration details for the Service Class as needed.`

    useEffect(() => {
        getServiceClassModel();
    }, [filePath, position]);


    const getServiceClassModel = async () => {
        if (!filePath || !position) return;

        const currentFilePath = filePath;
        const serviceClassModelRequest: ModelFromCodeRequest = {
            filePath: currentFilePath,
            codedata: {
                lineRange: {
                    startLine: { line: position.startLine, offset: position.startColumn },
                    endLine: { line: position.endLine, offset: position.endColumn }
                }
            },
            context: "TYPE_DIAGRAM"
        }
        const serviceClassModelResponse = await rpcClient.getBIDiagramRpcClient().getServiceClassModel(serviceClassModelRequest);
        const property = serviceClassModelResponse.model.properties["name"];
        const serviceClassFields = convertToFormField(property);
        setServiceClassFields(serviceClassFields);
        setServiceClassModel(serviceClassModelResponse.model);
    }

    const convertToFormField = (property: PropertyModel): FormField[] => {
        const fields: FormField[] = [
            {
                key: 'name',
                label: property.metadata.label || 'Service Class Name',
                type: 'IDENTIFIER',
                optional: property.optional,
                editable: property.editable,
                advanced: property.advanced,
                documentation: property.metadata?.description,
                value: property.value || '',
                valueTypeConstraint: property.valueTypeConstraint || '',
                lineRange: property.codedata?.lineRange
            }];
        return fields;
    }

    const handleOnSubmit = async (data: FormValues) => {
        rpcClient.getVisualizerRpcClient()?.goBack();
    }

    return (
        <View>
            <TopNavigationBar />
            <TitleBar title="Service Class" subtitle="Edit Service Class" />
            <ViewContent padding>
                {!serviceClassModel &&
                    <LoadingContainer>
                        <ProgressRing />
                        <Typography variant="h3" sx={{ marginTop: '16px' }}>Loading...</Typography>
                    </LoadingContainer>
                }
                {serviceClassModel &&
                    <Container>
                        {serviceClassModel && (
                            <>
                                {serviceClassFields?.length > 0 && (
                                    <FormContainer>
                                        <FormHeader title={`Service Class Configuration`} subtitle={editTitle} />
                                        {filePath &&
                                            <FormGeneratorNew
                                                fileName={filePath}
                                                targetLineRange={{ startLine: { line: 0, offset: 0 }, endLine: { line: 0, offset: 0 } }}
                                                fields={serviceClassFields}
                                                onSubmit={handleOnSubmit}
                                            />
                                        }
                                    </FormContainer>
                                )}
                            </>
                        )}
                    </Container>
                }
            </ViewContent>
        </View >
    );
}
