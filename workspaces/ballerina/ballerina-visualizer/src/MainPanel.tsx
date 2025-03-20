import React, { useEffect, useState } from "react";
import {
    KeyboardNavigationManager,
    MachineStateValue,
    STModification,
    MACHINE_VIEW,
    PopupMachineStateValue,
    EVENT_TYPE,
} from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
import { Global, css } from "@emotion/react";
import styled from "@emotion/styled";
import { NavigationBar } from "./components/NavigationBar";
import { LoadingRing } from "./components/Loader";
import { ServiceDesigner } from "./views/ServiceDesigner";
import { FunctionForm } from "./views/FunctionForm";
import { handleRedo, handleUndo } from "./utils/utils";
import { URI } from "vscode-uri";
import { PanelType, useVisualizerContext } from "./Context";
import { ConstructPanel } from "./views/ConstructPanel";
import PopupPanel from "./PopupPanel";
import { ConnectorList } from "./views/Connectors/ConnectorWizard";
import { EndpointList } from "./views/Connectors/EndpointList";
import { getSymbolInfo } from "@dharshi/ballerina-low-code-diagram";
import ViewConfigurableVariables from "./views/Configurables/ViewConfigurableVariables";
import { ServiceWizard } from "./views/ServiceDesigner/ServiceWizard";
import { ServiceEditView } from "./views/ServiceDesigner/ServiceEditView";
import { ListenerEditView } from "./views/ServiceDesigner/ListenerEditView";
import { TypeDiagram } from "./views/TypeDiagram";
import { EditPanel } from "./views/EditPanel";
// import { RecordEditor } from "./views/RecordEditor/RecordEditor";
import { SequenceDiagram } from "./views/SequenceDiagram";
import { Overview } from "./views/Overview";
import TriggerPanel from "./views/Connectors/TriggerWizard";
import { GraphQLDiagram } from "./views/GraphQLDiagram";
import { DataMapper } from "./views/DataMapper";
import { FunctionDefinition } from "@dharshi/syntax-tree";

const globalStyles = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`;

const VisualizerContainer = styled.div`
    width: 100%;
    height: 100%;
    overflow: auto;
`;

const ComponentViewWrapper = styled.div`
    height: calc(100vh - 24px);
`;

const PopUpContainer = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2000;
`;

const MainPanel = () => {
    const { rpcClient } = useRpcContext();
    const { sidePanel, setSidePanel, popupMessage, setPopupMessage, activePanel, setActivePanel, setStatementPosition, setComponentInfo } = useVisualizerContext();
    const [viewComponent, setViewComponent] = useState<React.ReactNode>();
    const [navActive, setNavActive] = useState<boolean>(true);
    const [showHome, setShowHome] = useState<boolean>(true);
    const [popupState, setPopupState] = useState<PopupMachineStateValue>("initialize");

    rpcClient?.onStateChanged((newState: MachineStateValue) => {
        if (typeof newState === "object" && "viewActive" in newState && newState.viewActive === "viewReady") {
            fetchContext();
        }
    });

    rpcClient?.onPopupStateChanged((newState: PopupMachineStateValue) => {
        setPopupState(newState);
    });

    rpcClient?.onBreakpointChanges((state: boolean) => {
        fetchContext();
        console.log("Breakpoint changes");
    });

    const applyModifications = async (modifications: STModification[], isRecordModification?: boolean) => {
        const langServerRPCClient = rpcClient.getLangClientRpcClient();
        let filePath;
        let m: STModification[];
        if (isRecordModification) {
            filePath = (await rpcClient.getVisualizerLocation()).metadata?.recordFilePath;
            if (modifications.length === 1) {
                m = [
                    {
                        ...modifications[0],
                        startLine: 0,
                        startColumn: 0,
                        endLine: 0,
                        endColumn: 0,
                    },
                ];
            }
        } else {
            filePath = (await rpcClient.getVisualizerLocation()).documentUri;
            m = modifications;
        }
        const {
            parseSuccess,
            source: newSource,
            syntaxTree,
        } = await langServerRPCClient?.stModify({
            astModifications: m,
            documentIdentifier: {
                uri: URI.parse(filePath).toString(),
            },
        });
        if (parseSuccess) {
            rpcClient.getVisualizerRpcClient().addToUndoStack(newSource);
            await langServerRPCClient.updateFileContent({
                content: newSource,
                filePath,
            });
        }
    };

    const fetchContext = () => {
        rpcClient.getVisualizerLocation().then((value) => {
            console.log("visualizer type value: ", value);
            if (!value?.view) {
                setViewComponent(<LoadingRing />);
            } else {
                const projectUri = value.projectUri
                switch (value?.view) {
                    case MACHINE_VIEW.Overview:
                        setNavActive(false);
                        setViewComponent(<Overview visualizerLocation={value} />);
                        break;
                    case MACHINE_VIEW.ServiceDesigner:
                        setNavActive(false);
                        setViewComponent(
                            <ServiceDesigner filePath={value.documentUri} position={value?.position} />
                        );
                        break;
                    case MACHINE_VIEW.TypeDiagram:
                        setNavActive(false);
                        setViewComponent(
                            <TypeDiagram selectedTypeId={value?.identifier} projectUri={value?.projectUri} />
                        );
                        break;
                    case MACHINE_VIEW.SequenceDiagram:
                        setNavActive(true);
                        setViewComponent(
                            <SequenceDiagram syntaxTree={value?.syntaxTree} applyModifications={applyModifications} />
                        );
                        break;
                    case MACHINE_VIEW.BIServiceWizard:
                        setViewComponent(<ServiceWizard type={value.serviceType} />);
                        break;
                    case MACHINE_VIEW.BIServiceConfigView:
                        setViewComponent(<ServiceEditView filePath={value.documentUri} position={value?.position} />);
                        break;
                    case MACHINE_VIEW.BIListenerConfigView:
                        setViewComponent(<ListenerEditView filePath={value.documentUri} position={value?.position} />);
                        break;
                    case MACHINE_VIEW.AddConnectionWizard:
                        if (value.serviceType && value.serviceType === "connector") {
                            setActivePanel({ isActive: false });
                            setSidePanel("ADD_CONNECTION");
                        } else if (value.serviceType && value.serviceType === "trigger") {
                            setActivePanel({ isActive: false });
                            setSidePanel("ADD_TRIGGER");
                        }
                        break;
                    case MACHINE_VIEW.EditConnectionWizard:
                        setActivePanel({ isActive: false });
                        setSidePanel("EDIT_CONNECTION");
                        break;
                    case MACHINE_VIEW.BIMainFunctionForm:
                        setViewComponent(<FunctionForm projectPath={value.projectUri} filePath={value.documentUri} functionName={value?.identifier} isAutomation={true} />);
                        break;
                    case MACHINE_VIEW.BIFunctionForm:
                        setViewComponent(
                            <FunctionForm
                                projectPath={value.projectUri}
                                filePath={value.documentUri}
                                functionName={value?.identifier}
                                isDataMapper={value.serviceType === "data_mapper"}
                                isAutomation={value.serviceType === "automation"}
                            />
                        );
                        break;
                    case MACHINE_VIEW.GraphQLDiagram:
                        setViewComponent(
                            <GraphQLDiagram projectUri={value.projectUri} filePath={value.documentUri} position={value.position} />
                        );
                        break;
                    case MACHINE_VIEW.DataMapper:
                        setViewComponent(
                            <DataMapper
                                filePath={value.documentUri}
                                isBI={value.isBI}
                                model={value?.syntaxTree as FunctionDefinition}
                                applyModifications={applyModifications}
                            />
                        );
                        break;
                    case MACHINE_VIEW.ViewConfigVariables:
                        setViewComponent(
                            <ViewConfigurableVariables
                                fileName={value.documentUri}
                            />
                        );
                        break;
                    case MACHINE_VIEW.EditConfigVariables:
                        rpcClient.getBIDiagramRpcClient().getConfigVariables().then((variables) => {
                            if (variables.configVariables.length > 0) {
                                const variableIndex = variables.configVariables.findIndex(
                                    (v) => {
                                        const bindingPattern = value.syntaxTree.typedBindingPattern.bindingPattern;
                                        if (bindingPattern.kind === "CaptureBindingPattern") {
                                            return v.properties.variable.value === (bindingPattern as any).variableName.value;
                                        }
                                        return false;
                                    }
                                );

                                setViewComponent(
                                    <ViewConfigurableVariables
                                        variableIndex={variableIndex}
                                        isExternallauncher={true}
                                        fileName={value.documentUri} />
                                );
                            }
                        });
                        break;
                    default:
                        setNavActive(false);
                        setViewComponent(<LoadingRing />);
                }
            }
        });
    };

    useEffect(() => {
        fetchContext();
    }, []);

    useEffect(() => {
        const mouseTrapClient = KeyboardNavigationManager.getClient();

        mouseTrapClient.bindNewKey(["command+z", "ctrl+z"], () => handleUndo(rpcClient));
        mouseTrapClient.bindNewKey(["command+shift+z", "ctrl+y"], async () => handleRedo(rpcClient));

        return () => {
            mouseTrapClient.resetMouseTrapInstance();
        };
    }, [viewComponent]);

    const handleOnCloseMessage = () => {
        setPopupMessage(false);
    };

    const handleOnClose = () => {
        rpcClient
            .getVisualizerRpcClient()
            .openView({ type: EVENT_TYPE.CLOSE_VIEW, location: { view: null }, isPopup: true });
    };

    return (
        <>
            <Global styles={globalStyles} />
            <VisualizerContainer>
                {navActive && <NavigationBar showHome={showHome} />}
                {viewComponent && <ComponentViewWrapper>{viewComponent}</ComponentViewWrapper>}
                {sidePanel !== "EMPTY" && sidePanel === "ADD_CONNECTION" && (
                    <ConnectorList applyModifications={applyModifications} />
                )}
                {sidePanel !== "EMPTY" && sidePanel === "EDIT_CONNECTION" && (
                    <ConnectorList applyModifications={applyModifications} edit={true} />
                )}
                {sidePanel !== "EMPTY" && sidePanel === "ADD_TRIGGER" && (
                    <TriggerPanel />
                )}

                {/* {popupMessage && (
                    <PopupMessage onClose={handleOnCloseMessage}>
                        <Typography variant="h3">This feature is coming soon!</Typography>
                    </PopupMessage>
                )} */}
                {/* {sidePanel === "RECORD_EDITOR" && (
                    <RecordEditor
                        isRecordEditorOpen={sidePanel === "RECORD_EDITOR"}
                        onClose={() => setSidePanel("EMPTY")}
                        rpcClient={rpcClient}
                    />
                )} */}
                {activePanel?.isActive && activePanel.name === PanelType.CONSTRUCTPANEL && (
                    <ConstructPanel applyModifications={applyModifications} />
                )}
                {activePanel?.isActive && activePanel.name === PanelType.STATEMENTEDITOR && (
                    <EditPanel applyModifications={applyModifications} />
                )}
                {typeof popupState === "object" && "open" in popupState && (
                    <PopUpContainer>
                        <PopupPanel onClose={handleOnClose} formState={popupState} />
                    </PopUpContainer>
                )}
                {sidePanel !== "EMPTY" && sidePanel === "ADD_ACTION" && (
                    <EndpointList stSymbolInfo={getSymbolInfo()} applyModifications={applyModifications} />
                )}
            </VisualizerContainer>
        </>
    );
};

export default MainPanel;
