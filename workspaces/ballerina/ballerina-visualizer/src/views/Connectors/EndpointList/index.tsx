// tslint:disable: jsx-no-multiline-js

// NOTE: This component contains three updates in the language server extension.
//      phase one - simple visibleEndpoint object ( GA Release)
//      phase two - update the visibleEndpoint object with package names and versions ( RC 1 patch)
//      phase three - update visibleEndpoint object with position and add visibleEndpoints to every blockStatement
// We need to remove these extra code blocks once VS Code plugin sync with latests changes.

import { ReactNode, useState } from "react";

import { ModuleIcon } from "@dharshi/ballerina-low-code-diagram";
import { STKindChecker, STNode, VisibleEndpoint } from "@dharshi/syntax-tree";

import { PanelContainer } from "@dharshi/ballerina-side-panel";
import { BallerinaConnectorInfo, FunctionDefinitionInfo, STModification, STSymbolInfo } from "@dharshi/ballerina-core";
import { Button, Typography, ThemeColors } from "@dharshi/ui-toolkit";
import { useVisualizerContext } from "../../../Context";
import { fetchConnectorInfo, getConnectorFromVisibleEp, getMatchingConnector, getTargetBlock } from "../ConnectorWizard/utils";
import styled from "@emotion/styled";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { ActionList } from "../ActionList";
import { ActionForm } from "../ActionForm";


namespace S {
    export const Container = styled.div<{}>`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
    `;
    export const AddConnectorContainer = styled.div<{}>`
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    `;
    export const Component = styled.div<{}>`
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 5px;
        padding: 5px;
        border: 1px solid ${ThemeColors.OUTLINE_VARIANT};
        border-radius: 5px;
        height: 36px;
        font-size: 14px;
        &:hover {    
                background-color: ${ThemeColors.PRIMARY_CONTAINER};
                border: 1px solid ${ThemeColors.PRIMARY};
        };
        cursor: 'pointer';
        margin: 5px;
    `;

    export const ComponentTitle = styled.div`
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
        width: 124px;
        word-break: break-all;
    `;

    export const IconContainer = styled.div`
        padding: 0 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        & svg {
            height: 16px;
            width: 16px;
            fill: ${ThemeColors.ON_SURFACE};
            stroke: ${ThemeColors.ON_SURFACE};
        }
    `;


}

enum WizardStep {
    EMPTY = "empty",
    ENDPOINT_LIST = "endpointList",
    ACTION_LIST = "actionList",
    ACTION_FROM = "actionFrom",
}


export interface EndpointListProps {
    stSymbolInfo: STSymbolInfo;
    applyModifications: (modifications: STModification[]) => Promise<void>;

}

const DEFAULT_ICON_SCALE = 0.35;
const ICON_WIDTH_SMALL = 16;

export function EndpointList(props: EndpointListProps) {
    const { setActivePanel, statementPosition, activeFileInfo, setSidePanel } = useVisualizerContext();
    const functionNode = activeFileInfo.activeSequence; // TODO: check if its function node
    const targetPosition = statementPosition;
    const { moduleEndpoints, localEndpoints } = props.stSymbolInfo;
    const { applyModifications } = props;

    const [selectedEndpoint, setSelectedEndpoint] = useState<string>();
    const [isClassField, setIsClassField] = useState(false);
    const [selectedAction, setSelectedAction] = useState<FunctionDefinitionInfo>();
    const [selectedConnector, setSelectedConnector] = useState<BallerinaConnectorInfo>();
    const [wizardStep, setWizardStep] = useState<string>(WizardStep.ENDPOINT_LIST);
    const [isLoadingActions, setIsLoadingActions] = useState<boolean>(false);

    const isHttp = selectedConnector?.moduleName === "http";

    const endpointElementList: ReactNode[] = [];
    const visitedEndpoints: string[] = [];
    let isEndpointExists = false;
    let executePhaseOne = false;

    const { rpcClient } = useRpcContext();


    const handleEndpointSelection = async (connector: BallerinaConnectorInfo, endpointName: string, classField?: boolean) => {
        console.log("handle endpoint selction");
        setIsLoadingActions(true);
        setSelectedEndpoint(endpointName);
        setIsClassField(classField ?? false);
        const connectorMetadata = await fetchConnectorInfo(connector, rpcClient, activeFileInfo?.filePath);
        setSelectedConnector(connectorMetadata);
        setWizardStep(WizardStep.ACTION_LIST);
        setIsLoadingActions(false);
    }

    const getListComponent = (connector: BallerinaConnectorInfo, name: string, isClassField?: boolean) => {
        console.log("get list component");
        const handleOnSelect = () => {
            handleEndpointSelection(connector, name, (isClassField ?? false));
        };
        return (
            <S.Component key={`endpoint-${name.toLowerCase()}`} onClick={() => handleOnSelect()}>
                <S.IconContainer>{<ModuleIcon module={connector} scale={DEFAULT_ICON_SCALE} width={ICON_WIDTH_SMALL} />}</S.IconContainer>
                <S.ComponentTitle>{name}</S.ComponentTitle>
            </S.Component>
        );
    };

    if (
        targetPosition &&
        functionNode &&
        (STKindChecker.isFunctionDefinition(functionNode) ||
            STKindChecker.isResourceAccessorDefinition(functionNode) ||
            STKindChecker.isObjectMethodDefinition(functionNode)) &&
        STKindChecker.isFunctionBodyBlock(functionNode.functionBody)
    ) {
        console.log(1)
        const targetBlock = getTargetBlock(targetPosition, functionNode.functionBody);
        console.log(targetBlock);
        if (
            targetBlock.VisibleEndpoints &&
            targetBlock.VisibleEndpoints.length > 0 &&
            targetBlock.VisibleEndpoints[0].position
        ) {
            const blockVisibleEndpoints: VisibleEndpoint[] = targetBlock?.VisibleEndpoints;
            blockVisibleEndpoints?.forEach((endpoint) => {
                const isTopLevelEndpoint = endpoint.isModuleVar || endpoint.isClassField;
                const isAboveTarget = endpoint.position && endpoint.position.endLine < targetPosition.startLine;
                if (isTopLevelEndpoint || isAboveTarget) {
                    const connector = getConnectorFromVisibleEp(endpoint);
                    endpointElementList.push(getListComponent(connector, endpoint.name, endpoint.isClassField));
                    isEndpointExists = true;
                }
            });
        }
    }

    // INFO: this code block use to work with phase two.
    if (STKindChecker.isFunctionDefinition(functionNode) || STKindChecker.isResourceAccessorDefinition(functionNode)) {
        console.log(2);
        functionNode.functionBody.VisibleEndpoints?.forEach((endpoint) => {
            if (endpoint.position) {
                // INFO: This is a phase three visible endpoint. This endpoint has already rendered by above code section
                return;
            }
            if (!(endpoint.packageName && endpoint.version)) {
                // INFO: enable phase one. phase two need package name and version information.
                executePhaseOne = true;
                return;
            }
            if (visitedEndpoints.indexOf(endpoint.name) < 0) {
                const connector = getConnectorFromVisibleEp(endpoint);
                endpointElementList.push(getListComponent(connector, endpoint.name, endpoint.isClassField));
            }
            visitedEndpoints.push(endpoint.name);
            isEndpointExists = true;
        });
    }

    // INFO: this code block use to work with phase one.
    if (executePhaseOne) {
        console.log(3)
        const getListComponentFromNode = (node: STNode, epName: string) => {
            const connector = getMatchingConnector(node);
            if (!connector) {
                return <></>;
            }
            return getListComponent(connector, epName);
        };

        moduleEndpoints?.forEach((node, name) => {
            endpointElementList.push(getListComponentFromNode(node, name));
            isEndpointExists = true;
        });

        localEndpoints?.forEach((node, name) => {
            if (
                functionNode.position &&
                node.position &&
                targetPosition &&
                functionNode.position.startLine < node.position.startLine &&
                node.position.endLine < targetPosition.startLine
            ) {
                endpointElementList.push(getListComponentFromNode(node, name));
                isEndpointExists = true;
            }
        });
    }

    const onSelectAction = (action: any) => {
        console.log("on selct action")
        setSelectedAction(action);
        setWizardStep(WizardStep.ACTION_FROM);
    }

    const onCancelActionList = () => {
        console.log("on cancel action list")
        setSidePanel("EMPTY");
        setSelectedConnector(undefined);
    }

    console.log(wizardStep);
    return (
        <PanelContainer title="Action" show={true} onClose={() => setSidePanel("EMPTY")}>
            <div style={{ width: '100%', flexDirection: "row", padding: '15px 20px' }}>
                {isLoadingActions && (
                    <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                        <Typography>Loading action...</Typography>
                    </div>
                )}
                {!isLoadingActions && isEndpointExists && wizardStep === WizardStep.ENDPOINT_LIST && (
                    <>
                        <Typography sx={{ padding: "10px" }}>
                            Select an existing connector endpoint
                        </Typography>
                        <S.Container>{endpointElementList}</S.Container>
                    </>
                )}
                {!isLoadingActions && isEndpointExists && wizardStep === WizardStep.ACTION_LIST && (
                    <>
                        <ActionList actions={selectedConnector?.functions} onSelect={onSelectAction} isHttp={isHttp} onCancel={onCancelActionList} />
                    </>
                )}
                {!isEndpointExists && !isLoadingActions && (
                    <>
                        <Typography sx={{ padding: "10px" }}>
                            No existing connectors found
                        </Typography>
                        <S.AddConnectorContainer>
                            <Button onClick={() => setSidePanel("ADD_CONNECTION")} appearance="primary">
                                Add Connector
                            </Button>
                        </S.AddConnectorContainer>

                    </>
                )}
                {wizardStep === WizardStep.ACTION_FROM && (
                    <ActionForm
                        action={selectedAction}
                        endpointName={selectedEndpoint}
                        isClassField={isClassField}
                        isHttp={isHttp}
                        functionNode={functionNode}
                        applyModifications={applyModifications}
                        selectedConnector={selectedConnector}
                    />
                )}
            </div>

        </PanelContainer>
    );
}
