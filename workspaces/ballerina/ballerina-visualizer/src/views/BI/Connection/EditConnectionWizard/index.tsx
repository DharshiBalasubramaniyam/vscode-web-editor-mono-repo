
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { EVENT_TYPE, FlowNode, MACHINE_VIEW, SubPanel, SubPanelView } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import ConnectionConfigView from "../ConnectionConfigView";
import { getFormProperties } from "../../../../utils/bi";
import { ExpressionFormField, PanelContainer } from "@dharshi/ballerina-side-panel";
import { ProgressRing, ThemeColors } from "@dharshi/ui-toolkit";
import { InlineDataMapper } from "../../../InlineDataMapper";
import { HelperView } from "../../HelperView";

const Container = styled.div`
    width: 100%;
    height: 100%;
`;

const SpinnerContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
`;

interface EditConnectionWizardProps {
    fileName: string; // file path of `connection.bal`
    connectionName: string;
    onClose?: () => void;
}

export function EditConnectionWizard(props: EditConnectionWizardProps) {
    const { fileName, connectionName, onClose } = props;
    const { rpcClient } = useRpcContext();

    const [connection, setConnection] = useState<FlowNode>();
    const [subPanel, setSubPanel] = useState<SubPanel>({ view: SubPanelView.UNDEFINED });
    const [showSubPanel, setShowSubPanel] = useState(false);
    const [updatingContent, setUpdatingContent] = useState(false);
    const [updatedExpressionField, setUpdatedExpressionField] = useState<ExpressionFormField>(undefined);

    useEffect(() => {
        rpcClient
            .getBIDiagramRpcClient()
            .getModuleNodes()
            .then((res) => {
                console.log(">>> moduleNodes", { moduleNodes: res });
                if (!res.flowModel.connections || res.flowModel.connections.length === 0) {
                    return;
                }
                const connector = res.flowModel.connections.find(
                    (node) => node.properties.variable.value === connectionName
                );
                if (!connector) {
                    console.error(">>> Error finding connector", { connectionName });
                    return;
                }
                setConnection(connector);
                const formProperties = getFormProperties(connector);
                console.log(">>> Connector form properties", formProperties);
            });
    }, [connectionName]);

    const handleOnFormSubmit = async (node: FlowNode) => {
        console.log(">>> on form submit", node);
        if (connection) {
            setUpdatingContent(true);

            if (fileName === "") {
                console.error(">>> Error updating source code. No connections.bal file found");
                setUpdatingContent(false);
                return;
            }

            rpcClient
                .getBIDiagramRpcClient()
                .getSourceCode({
                    filePath: fileName,
                    flowNode: node,
                    isConnector: true,
                })
                .then((response) => {
                    console.log(">>> Updated source code", response);
                    if (response.textEdits) {
                        // clear memory
                        if (onClose) {
                            onClose();
                        } else {
                            gotoHome();
                        }
                    } else {
                        console.error(">>> Error updating source code", response);
                        // handle error
                    }
                })
                .finally(() => {
                    setUpdatingContent(false);
                });
        }
    };

    const gotoHome = () => {
        rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: {
                view: MACHINE_VIEW.Overview,
            },
        });
    };

    const handleSubPanel = (subPanel: SubPanel) => {
        setShowSubPanel(subPanel.view !== SubPanelView.UNDEFINED);
        setSubPanel(subPanel);
    };

    const updateExpressionField = (data: ExpressionFormField) => {
        setUpdatedExpressionField(data);
    };

    const findSubPanelComponent = (subPanel: SubPanel) => {
        switch (subPanel.view) {
            case SubPanelView.INLINE_DATA_MAPPER:
                return (
                    <InlineDataMapper
                        onClosePanel={handleSubPanel}
                        updateFormField={updateExpressionField}
                        {...subPanel.props?.inlineDataMapper}
                    />
                );
            case SubPanelView.HELPER_PANEL:
                return (
                    <HelperView
                        filePath={subPanel.props.sidePanelData.filePath}
                        position={subPanel.props.sidePanelData.range}
                        updateFormField={updateExpressionField}
                        editorKey={subPanel.props.sidePanelData.editorKey}
                        onClosePanel={handleSubPanel}
                        configurePanelData={subPanel.props.sidePanelData?.configurePanelData}
                    />
                );
            default:
                return null;
        }
    };

    const handleResetUpdatedExpressionField = () => {
        setUpdatedExpressionField(undefined);
    };

    return (
        <Container>
            {!connection && (
                <SpinnerContainer>
                    <ProgressRing color={ThemeColors.PRIMARY} />
                </SpinnerContainer>
            )}
            {connection && (
                <PanelContainer
                    show={true}
                    title={`Configure ${connection.codedata.module || ''} Connector`}
                    onClose={onClose ? onClose : gotoHome}
                    width={400}
                    onBack={onClose ? onClose : gotoHome}
                    subPanelWidth={subPanel?.view === SubPanelView.INLINE_DATA_MAPPER ? 800 : 400}
                    subPanel={findSubPanelComponent(subPanel)}
                >
                    {updatingContent ? (
                        <SpinnerContainer>
                            <ProgressRing color={ThemeColors.PRIMARY} />
                        </SpinnerContainer>
                    ) : (
                        <ConnectionConfigView
                            fileName={fileName}
                            selectedNode={connection}
                            onSubmit={handleOnFormSubmit}
                            updatedExpressionField={updatedExpressionField}
                            resetUpdatedExpressionField={handleResetUpdatedExpressionField}
                            openSubPanel={handleSubPanel}
                        />
                    )}
                </PanelContainer>
            )}
        </Container>
    );
}

export default EditConnectionWizard;
