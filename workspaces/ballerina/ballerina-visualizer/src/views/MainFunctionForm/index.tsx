
import { useEffect, useState } from "react";
import { DIRECTORY_MAP, EVENT_TYPE, LineRange, ProjectStructureArtifactResponse, NodeProperties } from "@dharshi/ballerina-core";
import { View, ViewContent, Button } from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { getFunctionParametersList } from "../../utils/utils";
import { FormField, FormValues, Parameter } from "@dharshi/ballerina-side-panel";
import { TopNavigationBar } from "../../components/TopNavigationBar";
import { URI, Utils } from "vscode-uri";
import { TitleBar } from "../../components/TitleBar";
import { FormHeader } from "../../components/FormHeader";
import { Banner } from "../../components/Banner";
import FormGeneratorNew from "../Forms/FormGeneratorNew";
import { LoadingContainer } from "../styles";
import { LoadingRing } from "../../components/Loader";
import { convertConfig } from "../../utils/bi";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 600px;
    gap: 20px;
`;

const Container = styled.div`
    display: "flex";
    flex-direction: "column";
    gap: 10;
`;

const ButtonWrapper = styled.div`
    margin-top: 20px;
    width: 130px;
`;

const Link = styled.a`
    cursor: pointer;
    font-size: 12px;
    margin-left: auto;
    margin-right: 15px;
    margin-bottom: -5px;
    color: var(--button-primary-background);
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 20px;
    width: 100%;
`;

export function MainForm(props: { projectUri: string }) {
    const { rpcClient } = useRpcContext();
    const [isLoading, setIsLoading] = useState(true);
    const [automation, setAutomation] = useState<ProjectStructureArtifactResponse>(null);

    const [filePath, setFilePath] = useState<string>('');
    const [targetLineRange, setTargetLineRange] = useState<LineRange>();

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

    const handleFunctionCreate = async (data: FormValues) => {
        setIsLoading(true);
        console.log("form data", data);
        const paramList = data.params ? getFunctionParametersList(data.params) : [];
        const res = await rpcClient
            .getBIDiagramRpcClient()
            .createComponent({ type: DIRECTORY_MAP.AUTOMATION, functionType: { parameters: paramList } });
        setIsLoading(res.response);
    };

    const openAutomation = () => {
        rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: { documentUri: automation.path, position: automation.position },
        });
    };

    useEffect(() => {
        rpcClient
            .getBIDiagramRpcClient()
            .getProjectStructure()
            .then((res) => {
                if (res.directoryMap[DIRECTORY_MAP.AUTOMATION].length > 0) {
                    setAutomation(res.directoryMap[DIRECTORY_MAP.AUTOMATION][0]);
                }
                setIsLoading(false);
            });
        let functionFilePath = Utils.joinPath(URI.parse(props.projectUri), "main.bal").toString();
        setFilePath(functionFilePath)
    }, []);

    const paramFiels: FormField[] = [
        {
            key: `variable`,
            label: "Name",
            type: "string",
            optional: false,
            editable: true,
            documentation: "",
            value: "",
            valueTypeConstraint: "",
        },
        {
            key: `type`,
            label: "Type",
            type: 'SINGLE_SELECT',
            optional: false,
            editable: true,
            documentation: '',
            value: "",
            items: ["string", "int", "float", "decimal"],
            valueTypeConstraint: "",
            addNewButton: false
        }
    ];

    // Helper function to modify and set the visual information
    const handleParamChange = (param: Parameter) => {
        const name = `${param.formValues["variable"]}`;
        const type = `${param.formValues["type"]}`;
        const defaultValue =
            Object.keys(param.formValues).indexOf("defaultable") > -1 && `${param.formValues["defaultable"]}`;
        let value = `${type} ${name}`;
        if (defaultValue) {
            value += ` = ${defaultValue}`;
        }
        return {
            ...param,
            key: name,
            value: value,
        };
    };

    const currentFields: FormField[] = [
        {
            key: `params`,
            label: "Parameters",
            type: "PARAM_MANAGER",
            optional: true,
            advanced: true,
            editable: true,
            documentation: "Parameters allow dynamic input values, making automation adaptable to different execution needs.",
            valueTypeConstraint: "",
            value: "",
            paramManagerProps: {
                paramValues: [],
                formFields: paramFiels,
                handleParameter: handleParamChange,
            },
        },
    ];

    return (
        <View>
            <TopNavigationBar />
            <TitleBar title="Main function" subtitle="" />
            <ViewContent padding>
                <Container>
                    {isLoading && (
                        <LoadingContainer>
                            <LoadingRing message="Loading..." />
                        </LoadingContainer>
                    )}
                    {!isLoading && automation && (
                        <Banner
                            variant="info"
                            message="A project can only have one main function. You have already created an main function."
                            actions={
                                <>
                                    <Button onClick={openAutomation}>View function</Button>
                                </>
                            }
                        />
                    )}
                    {!isLoading && !automation && (
                        <>
                            <FormHeader
                                title="Create main function"
                                subtitle="Implement an automation for either scheduled or manual jobs."
                            />
                            <FormContainer>
                                {filePath && targetLineRange && currentFields.length > 0 &&
                                    <FormGeneratorNew
                                        fileName={filePath}
                                        targetLineRange={targetLineRange}
                                        fields={currentFields}
                                        onSubmit={handleFunctionCreate}
                                        submitText={"Create"}
                                    />
                                }
                            </FormContainer>
                        </>
                    )}
                </Container>
            </ViewContent>
        </View>
    );
}
