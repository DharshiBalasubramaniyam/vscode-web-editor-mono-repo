import React, { useEffect, useState } from "react";
import {
    Type,
    NodePosition,
    GetGraphqlTypeResponse,
    GetGraphqlTypeRequest,
    EVENT_TYPE,
    MACHINE_VIEW,
} from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { TypeDiagram as TypeDesignDiagram } from "@dharshi/type-diagram";
import {
    Button,
    Codicon,
    ProgressRing,
    ThemeColors,
    View,
    ViewContent,
    Typography,
    Icon,
} from "@dharshi/ui-toolkit";
import styled from "@emotion/styled";
import { GraphqlServiceEditor } from "./GraphqlServiceEditor";
import { PanelContainer } from "@dharshi/ballerina-side-panel";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TopNavigationBar } from "../../components/TopNavigationBar";
import { TitleBar } from "../../components/TitleBar";
import { GraphqlObjectViewer } from "./ObjectViewer";
import { FormTypeEditor } from "../TypeDiagram/typeEditor";

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

const ActionButton = styled(Button)`
    display: flex;
    align-items: center;
    gap: 4px;
`;


const SubTitleWrapper = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
`;

const Path = styled.span`
    color: var(--vscode-foreground);
    font-family: var(--vscode-editor-font-family);
    font-size: 13px;
`;

interface GraphQLDiagramProps {
    filePath: string;
    position: NodePosition;
    projectUri?: string;
}

export function GraphQLDiagram(props: GraphQLDiagramProps) {
    const { filePath, position, projectUri } = props;
    const { rpcClient } = useRpcContext();
    const queryClient = useQueryClient();
    const [isServiceEditorOpen, setIsServiceEditorOpen] = useState<boolean>(false);
    const [isTypeEditorOpen, setIsTypeEditorOpen] = useState(false);
    const [editingType, setEditingType] = useState<Type>();
    const [focusedNodeId, setFocusedNodeId] = useState<string | undefined>(undefined);

    const fetchGraphqlTypeModel = async () => {
        if (!filePath) return null;

        const typeModelRequest: GetGraphqlTypeRequest = {
            filePath: filePath,
            linePosition: { line: position?.startLine, offset: position?.startColumn },
        };

        const response = await rpcClient.getGraphqlDesignerRpcClient().getGraphqlTypeModel(typeModelRequest);
        console.log(">>> Graphql Type Model", response);
        if (!response) {
            throw new Error("Failed to fetch GraphQL type model");
        }
        return response;
    };

    const {
        data: graphqlTypeModel,
        isLoading,
        error,
    } = useQuery<GetGraphqlTypeResponse>({
        queryKey: ["graphqlTypeModel", filePath, position],
        queryFn: fetchGraphqlTypeModel,
        retry: 3,
        retryDelay: 2000,
        enabled: !!filePath && !!rpcClient,
    });

    rpcClient?.onProjectContentUpdated((state: boolean) => {
        if (state) {
            // Instead of calling getGraphqlDesignModel directly, invalidate the query
            queryClient.invalidateQueries({ queryKey: ["graphqlTypeModel"] });
        }
    });

    const handleOnGoToSource = (node: Type) => {
        if (!rpcClient || !node.codedata.lineRange) {
            return;
        }
        const targetPosition: NodePosition = {
            startLine: node.codedata.lineRange?.startLine?.line,
            startColumn: node.codedata.lineRange?.startLine?.offset,
            endLine: node.codedata.lineRange?.endLine?.line,
            endColumn: node.codedata.lineRange?.endLine?.offset,
        };

        rpcClient.getCommonRpcClient().goToSource({ position: targetPosition, filePath: filePath });
    };

    const onTypeEdit = async (typeId: string, isGraphqlRoot?: boolean) => {
        if (isGraphqlRoot) {
            setIsServiceEditorOpen(true);
            return;
        }

        // find the type by checking the references of graphqlTypeModel
        const type = graphqlTypeModel?.refs.find((type) => type.name === typeId);
        if (type) {
            setEditingType(type);
            setIsTypeEditorOpen(true);
        } else {
            console.error("Type not found");
        }
    };

    const onTypeChange = async () => {
        setIsTypeEditorOpen(false);
        setEditingType(undefined);
    };

    const onTypeEditorClosed = () => {
        setIsTypeEditorOpen(false);
        setEditingType(undefined);
    };

    const handleServiceEdit = async () => {
        await rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: {
                view: MACHINE_VIEW.ServiceConfigView,
                position: {
                    startLine: position?.startLine,
                    startColumn: position?.startColumn,
                    endLine: position?.endLine,
                    endColumn: position?.endColumn,
                },
                documentUri: filePath,
            },
        });
    };

    const handleOnImplementation = async (type: Type) => {
        await rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: {
                view: MACHINE_VIEW.ServiceClassDesigner,
                type: type,
                projectUri: projectUri,
                isGraphql: true
            },
        });
        setEditingType(undefined);
    };

    const handleFocusedNodeIdChange = (nodeId: string) => {
        setFocusedNodeId(nodeId);
    };

    return (
        <>
            <View>
                <TopNavigationBar />
                {!focusedNodeId && (
                    <TitleBar
                        title="GraphQL"
                        subtitleElement={
                            <SubTitleWrapper>
                                <Path>{graphqlTypeModel?.type.name}</Path>
                            </SubTitleWrapper>
                        }
                        actions={
                            <ActionButton appearance="secondary" onClick={handleServiceEdit}>
                                <Icon name="bi-edit" sx={{ marginRight: 5, width: 16, height: 16, fontSize: 14 }} />
                                Edit
                            </ActionButton>
                        }
                    />
                )}
                {focusedNodeId && (
                    <TitleBar
                        title={focusedNodeId}
                        subtitle="Type"
                        onBack={() => setFocusedNodeId(undefined)}
                    />
                )}
                <ViewContent>
                    {isLoading ? (
                        <SpinnerContainer>
                            <ProgressRing color={ThemeColors.PRIMARY} />
                        </SpinnerContainer>
                    ) : error ? (
                        <SpinnerContainer>
                            <Typography variant="body1">Error fetching GraphQL model. Retrying...</Typography>
                        </SpinnerContainer>
                    ) : graphqlTypeModel ? (
                        <TypeDesignDiagram
                            typeModel={graphqlTypeModel.refs}
                            rootService={graphqlTypeModel.type}
                            isGraphql={true}
                            goToSource={handleOnGoToSource}
                            onTypeEdit={onTypeEdit}
                            focusedNodeId={focusedNodeId}
                            updateFocusedNodeId={handleFocusedNodeIdChange}
                        />
                    ) : null}
                </ViewContent>
            </View>
            {isServiceEditorOpen && (
                <GraphqlServiceEditor
                    filePath={filePath}
                    lineRange={{
                        startLine: {
                            line: position?.startLine,
                            offset: position?.startColumn,
                        },
                        endLine: {
                            line: position?.endLine,
                            offset: position?.endColumn,
                        },
                    }}
                    onClose={() => setIsServiceEditorOpen(false)}
                />
            )}
            {isTypeEditorOpen && editingType && editingType.codedata.node !== "CLASS" && (
                <PanelContainer title={`Edit Type`} show={true} onClose={onTypeEditorClosed}>
                    <FormTypeEditor
                        type={editingType}
                        onTypeChange={onTypeChange}
                        newType={false}
                        isGraphql={true}
                    />
                </PanelContainer>
            )}
            {isTypeEditorOpen && editingType && editingType.codedata.node === "CLASS" && (
                <GraphqlObjectViewer
                    onClose={onTypeEditorClosed}
                    type={editingType}
                    filePath={filePath}
                    onImplementation={handleOnImplementation}
                />
            )}
        </>
    );
}
