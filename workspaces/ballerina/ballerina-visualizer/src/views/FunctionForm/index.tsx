import { useEffect, useRef, useState } from "react";
import { EVENT_TYPE, MACHINE_VIEW, FunctionNode, LineRange, NodeKind, NodeProperties, BINodeTemplateResponse } from "@dharshi/ballerina-core";
import { View, ViewContent } from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { FormField, FormValues } from "@dharshi/ballerina-side-panel";
import FormGeneratorNew from "../Forms/FormGeneratorNew";
import { TitleBar } from "../../components/TitleBar";
import { TopNavigationBar } from "../../components/TopNavigationBar";
import { FormHeader } from "../../components/FormHeader";
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

interface FunctionFormProps {
    filePath: string;
    projectPath: string;
    functionName: string;
    isDataMapper?: boolean;
    isNpFunction?: boolean;
    isAutomation?: boolean;
}

export function FunctionForm(props: FunctionFormProps) {
    const { rpcClient } = useRpcContext();
    const { projectPath, functionName, filePath, isDataMapper, isNpFunction, isAutomation } = props;

    const [functionFields, setFunctionFields] = useState<FormField[]>([]);
    const [functionNode, setFunctionNode] = useState<FunctionNode>(undefined);
    const [targetLineRange, setTargetLineRange] = useState<LineRange>();
    const [titleSubtitle, setTitleSubtitle] = useState<string>("");
    const [formSubtitle, setFormSubtitle] = useState<string>("");

    const formType = useRef("Function");

    useEffect(() => {
        let nodeKind: NodeKind;
        if (isAutomation || functionName === "main") {
            nodeKind = 'AUTOMATION';
            formType.current = "Automation";
            setTitleSubtitle('An automation that can be invoked periodically or manually');
            setFormSubtitle('Periodic invocation should be scheduled in an external system such as cronjob, k8s, or Devant');
        } else if (isDataMapper) {
            nodeKind = 'DATA_MAPPER_DEFINITION';
            formType.current = 'Data Mapper';
            setTitleSubtitle('Transform data between different data types');
            setFormSubtitle('Create mappings on how to convert the inputs into a single output');
        } else if (isNpFunction) {
            nodeKind = 'NP_FUNCTION_DEFINITION';
            formType.current = 'Natural Programming Function';
            setTitleSubtitle('Build a flow using a natural language description');
            setFormSubtitle('Describe what you need in a prompt and let AI handle the implementation');
        } else {
            nodeKind = 'FUNCTION_DEFINITION';
            formType.current = 'Function';
            setTitleSubtitle('Build reusable custom flows');
            setFormSubtitle('Define a flow that can be used within your integration');
        }

        if (functionName) {
            getExistingFunctionNode();
        } else {
            getFunctionNode(nodeKind);
        }
    }, [isDataMapper, isNpFunction, isAutomation, functionName]);

    useEffect(() => {
        let fields = functionNode ? convertConfig(functionNode.properties) : [];
        console.log("All fields: ", fields);
        // TODO: Remove this once the hidden flag is implemented 
        if (isAutomation || functionName === "main") {
            formType.current = "Automation";
            const automationFields = fields.filter(field => field.key !== "functionName" && field.key !== "type");
            fields = automationFields;
            console.log("filtered fields: ", automationFields)
        }

        setFunctionFields(fields);
    }, [functionNode]);

    const getFunctionNode = async (kind: NodeKind) => {
        const res = await rpcClient
            .getBIDiagramRpcClient()
            .getNodeTemplate({
                position: { line: 0, offset: 0 },
                filePath: filePath,
                id: { node: kind },
            });
        const flowNode = res.flowNode;
        setFunctionNode(flowNode);
        console.log("Function Node: ", flowNode);

        // if (isAutomation) {
        //     handleMainFunction(res);
        // }
    }

    const getExistingFunctionNode = async () => {
        const res = await rpcClient
            .getBIDiagramRpcClient()
            .getFunctionNode({
                functionName,
                fileName: filePath,
                projectPath
            });
        const flowNode = res.functionDefinition;
        setFunctionNode(flowNode);
        console.log("Existing Function Node: ", flowNode);
    }

    const handleMainFunction = async (flowNodeRes: BINodeTemplateResponse) => {
        console.log("handling main function: ", flowNodeRes)
        const properties = flowNodeRes.flowNode.properties
        properties.functionName.value = "main";
        await rpcClient.getBIDiagramRpcClient().getSourceCode({ filePath, flowNode: flowNodeRes.flowNode, isFunctionNodeUpdate: true });
        rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
                location: {
                    view: MACHINE_VIEW.Overview,
                },
            });

    }

    const handleSubmit = async (data: FormValues) => {
        console.log("Function Form Data: ", data);
    
        const functionNodeCopy = { ...functionNode };
        for (const [dataKey, dataValue] of Object.entries(data)) {
            const properties = functionNodeCopy.properties as NodeProperties;
            for (const [key, property] of Object.entries(properties)) {
                if (dataKey === key) {
                    if (property.valueType === "REPEATABLE_PROPERTY") {
                        const baseConstraint = property.valueTypeConstraint;
                        property.value = {};
                        // Go through the parameters array
                        for (const [repeatKey, repeatValue] of Object.entries(dataValue)) {
                            // Create a deep copy for each iteration
                            const valueConstraint = JSON.parse(JSON.stringify(baseConstraint));
                            // Fill the values of the parameter constraint
                            for (const [paramKey, param] of Object.entries((valueConstraint as any).value as NodeProperties)) {
                                param.value = (repeatValue as any).formValues[paramKey];
                            }
                            (property.value as any)[(repeatValue as any).key] = valueConstraint;
                        }
                    } else {
                        property.value = dataValue;
                    }
                }
            }
        }
        console.log("Updated function node: ", functionNodeCopy);
        await rpcClient.getBIDiagramRpcClient().getSourceCode({ filePath, flowNode: functionNodeCopy, isFunctionNodeUpdate: true });
    };

    useEffect(() => {
        console.log("getting end fo file...")
        if (filePath && rpcClient) {
            rpcClient
                .getBIDiagramRpcClient()
                .getEndOfFile({ filePath })
                .then((res) => {
                    console.log("end of file: ", res)
                    setTargetLineRange({
                        startLine: res,
                        endLine: res,
                    });
                });
        }
    }, [filePath, rpcClient]);

    return (
        <View>
            <TopNavigationBar />
            <TitleBar 
                title={formType.current} 
                subtitle={titleSubtitle} 
            />
            <ViewContent padding>
                <Container>
                    <FormHeader 
                        title={`${functionName ? 'Edit' : 'Create New'} ${formType.current}`}
                        subtitle={formSubtitle} 
                    />
                    <FormContainer>
                        {filePath && targetLineRange && functionFields.length > 0 &&
                            <FormGeneratorNew
                                fileName={filePath}
                                targetLineRange={targetLineRange}
                                fields={functionFields}
                                onSubmit={handleSubmit}
                                submitText={functionName ? "Save" : "Create"}
                                selectedNode={functionNode?.codedata?.node}
                            />
                        }
                    </FormContainer>
                </Container>
            </ViewContent>
        </View>
    );
}
