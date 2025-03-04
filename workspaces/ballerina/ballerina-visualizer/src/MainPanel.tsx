/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content."
 */

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
// import { DataMapper } from "./views/DataMapper";
// import { ERDiagram } from "./views/ERDiagram";
// import { GraphQLDiagram } from "./views/GraphQLDiagram";
// import { SequenceDiagram } from "./views/SequenceDiagram";
import { Overview } from "./views/Overview";
// import { ServiceDesigner } from "./views/BI/ServiceDesigner";
// import {
//     WelcomeView,
//     ProjectForm,
//     ComponentListView,
//     PopupMessage,
//     MainForm,
//     FunctionForm,
//     SetupView,
//     TestFunctionForm
// } from "./views/BI";
import { handleRedo, handleUndo } from "./utils/utils";
import { FunctionDefinition, ServiceDeclaration } from "@dharshi/syntax-tree";
import { URI, Utils } from "vscode-uri";
import { Typography } from "@dharshi/ui-toolkit";
import { PanelType, useVisualizerContext } from "./Context";
// import { ConstructPanel } from "./views/ConstructPanel";
// import { EditPanel } from "./views/EditPanel";
// import { RecordEditor } from "./views/RecordEditor/RecordEditor";
import PopupPanel from "./PopupPanel";
// import { ConnectorList } from "../../ballerina-visualizer/src/views/Connectors/ConnectorWizard";
// import { EndpointList } from "./views/Connectors/EndpointList";
// import { getSymbolInfo } from "@dharshi/ballerina-low-code-diagram";
// import DiagramWrapper from "./views/BI/DiagramWrapper";
// import AddConnectionWizard from "./views/BI/Connection/AddConnectionWizard";
// import { TypeDiagram } from "./views/TypeDiagram";
// import { Overview as OverviewBI } from "./views/BI/Overview/index";
// import EditConnectionWizard from "./views/BI/Connection/EditConnectionWizard";
// import ViewConfigurableVariables from "./views/BI/Configurables/ViewConfigurableVariables";
// import { ServiceWizard } from "./views/BI/ServiceDesigner/ServiceWizard";
// import { ServiceEditView } from "./views/BI/ServiceDesigner/ServiceEditView";
// import { ListenerEditView } from "./views/BI/ServiceDesigner/ListenerEditView";
// import { ServiceClassDesigner } from "./views/BI/ServiceClassEditor/ServiceClassDesigner";
// import { ServiceClassConfig } from "./views/BI/ServiceClassEditor/ServiceClassConfig";

const globalStyles = css`
    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }
`;

const VisualizerContainer = styled.div`
    width: 100%;
    /* height: 100%; */
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
    const { sidePanel, setSidePanel, popupMessage, setPopupMessage, activePanel } = useVisualizerContext();
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

    // TODO: Need to refactor this function. use util apply modifications function
    const applyModifications = async (modifications: STModification[], isRecordModification?: boolean) => {
        const langServerRPCClient = rpcClient.getLangClientRpcClient();
        let filePath;
        let m: STModification[];
        if (isRecordModification) {
            filePath = (await rpcClient.getVisualizerLocation()).metadata?.recordFilePath;
            if (modifications.length === 1) {
                // Change the start position of the modification to the beginning of the file
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
                uri: URI.file(filePath).toString(),
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
        setNavActive(true);
        rpcClient.getVisualizerLocation().then((value) => {
            if (!value?.view) {
                setViewComponent(<LoadingRing />);
            } else {
                switch (value?.view) {
                    case MACHINE_VIEW.Overview:
                        if (value.isBI) {
                            // setViewComponent(<OverviewBI />);
                            break;
                        }
                        setViewComponent(<Overview visualizerLocation={value} />);
                        break;
                    case MACHINE_VIEW.ServiceDesigner:
                        // setViewComponent(
                        //     <ServiceDesigner
                        //         filePath={value.documentUri}
                        //         position={value?.position}
                        //     />
                        // );
                        break;
                    case MACHINE_VIEW.BIDiagram:
                        // setViewComponent(
                        //     <DiagramWrapper syntaxTree={value?.syntaxTree} projectPath={value.projectUri} />
                        // );
                        break;
                    case MACHINE_VIEW.ERDiagram:
                        // setViewComponent(<ERDiagram />);
                        break;
                    case MACHINE_VIEW.TypeDiagram:
                        // setViewComponent(<TypeDiagram selectedTypeId={value?.identifier} projectUri={value?.projectUri} />);
                        break;
                    case MACHINE_VIEW.DataMapper:
                        // setViewComponent(
                        //     <DataMapper
                        //         filePath={value.documentUri}
                        //         model={value?.syntaxTree as FunctionDefinition}
                        //         isBI={value.isBI}
                        //         applyModifications={applyModifications}
                        //     />
                        // );
                        break;
                    case MACHINE_VIEW.BIDataMapperForm:
                        rpcClient.getVisualizerLocation().then((location) => {
                            // setViewComponent(
                            //     <FunctionForm
                            //         projectPath={value.projectUri}
                            //         fileName={"data_mappings.bal"}
                            //         functionName={value?.identifier}
                            //         isDataMapper={true}
                            //     />
                            // );
                        });
                        break;
                    case MACHINE_VIEW.GraphQLDiagram:
                        // setViewComponent(<GraphQLDiagram filePath={value?.documentUri} position={value?.position} projectUri={value?.projectUri} />);
                        break;
                    case MACHINE_VIEW.SequenceDiagram:
                        // setViewComponent(
                        //     <SequenceDiagram syntaxTree={value?.syntaxTree} applyModifications={applyModifications} />
                        // );
                        break;
                    case MACHINE_VIEW.BIWelcome:
                        setNavActive(false);
                        // setViewComponent(<WelcomeView />);
                        break;
                    case MACHINE_VIEW.SetupView:
                        setNavActive(false);
                        // setViewComponent(<SetupView haveLS={value.metadata.haveLS} />);
                        break;
                    case MACHINE_VIEW.BIProjectForm:
                        setShowHome(false);
                        // setViewComponent(<ProjectForm />);
                        break;
                    case MACHINE_VIEW.BIComponentView:
                        // setViewComponent(<ComponentListView />);
                        break;
                    case MACHINE_VIEW.BIServiceWizard:
                        // setViewComponent(<ServiceWizard type={value.serviceType} />);
                        break;
                    case MACHINE_VIEW.BIServiceClassDesigner:
                        // setViewComponent(
                        //     <ServiceClassDesigner
                        //         type={value?.type}
                        //         isGraphql={value?.isGraphql}
                        //         projectUri={value?.projectUri}
                        //     />
                        // );
                        break;
                    case MACHINE_VIEW.BIServiceConfigView:
                        // setViewComponent(<ServiceEditView filePath={value.documentUri} position={value?.position} />);
                        break;
                    case MACHINE_VIEW.BIServiceClassConfigView:
                        // setViewComponent(
                        //     <ServiceClassConfig
                        //         fileName={value.documentUri}
                        //         position={value?.position}
                        //         projectUri={value?.projectUri} />
                        // );
                        break;
                    case MACHINE_VIEW.BIListenerConfigView:
                        // setViewComponent(<ListenerEditView filePath={value.documentUri} position={value?.position} />);
                        break;
                    case MACHINE_VIEW.AddConnectionWizard:
                        rpcClient.getVisualizerLocation().then((location) => {
                            // setViewComponent(
                            //     <AddConnectionWizard
                            //         fileName={Utils.joinPath(URI.file(location.projectUri), 'connections.bal').fsPath}
                            //     />
                            // );
                        });
                        break;
                    case MACHINE_VIEW.EditConnectionWizard:
                        rpcClient.getVisualizerLocation().then((location) => {
                            // setViewComponent(
                            //     <EditConnectionWizard
                            //         fileName={Utils.joinPath(URI.file(location.projectUri), 'connections.bal').fsPath}
                            //         connectionName={value?.identifier}
                            //     />
                            // );
                        });
                        break;
                    case MACHINE_VIEW.BIMainFunctionForm:
                        // setViewComponent(<MainForm />);
                        break;
                    case MACHINE_VIEW.BIFunctionForm:
                        const fileName = value?.documentUri ? URI.parse(value.documentUri).path.split('/').pop() : 'functions.bal';
                        // setViewComponent(<FunctionForm projectPath={value.projectUri} fileName={fileName} functionName={value?.identifier} />);
                        break;
                    case MACHINE_VIEW.BITestFunctionForm:
                        // setViewComponent(<TestFunctionForm
                        //     functionName={value?.identifier}
                        //     filePath={value?.documentUri}
                        //     serviceType={value?.serviceType}
                        // />);
                        break;
                    case MACHINE_VIEW.ViewConfigVariables:
                        rpcClient.getVisualizerLocation().then((location) => {
                            // setViewComponent(
                            //     <ViewConfigurableVariables
                            //         fileName={Utils.joinPath(URI.file(location.projectUri), 'config.bal').fsPath}
                            //     />
                            // );
                        });
                        break;
                    case MACHINE_VIEW.EditConfigVariables:
                        rpcClient.getVisualizerLocation().then((location) => {
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

                                    // setViewComponent(
                                    //     <ViewConfigurableVariables
                                    //         variableIndex={variableIndex}
                                    //         isExternallauncher={true}
                                    //         fileName={Utils.joinPath(URI.file(location.projectUri), 'config.bal').fsPath} />
                                    // );
                                }
                            });
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
                {/* {navActive && <NavigationBar showHome={showHome} />} */}
                {viewComponent && <ComponentViewWrapper>{viewComponent}</ComponentViewWrapper>}
                {/* {sidePanel !== "EMPTY" && sidePanel === "ADD_CONNECTION" && (
                    <ConnectorList applyModifications={applyModifications} />
                )}

                {popupMessage && (
                    <PopupMessage onClose={handleOnCloseMessage}>
                        <Typography variant="h3">This feature is coming soon!</Typography>
                    </PopupMessage>
                )}
                {sidePanel === "RECORD_EDITOR" && (
                    <RecordEditor
                        isRecordEditorOpen={sidePanel === "RECORD_EDITOR"}
                        onClose={() => setSidePanel("EMPTY")}
                        rpcClient={rpcClient}
                    />
                )}
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
                )} */}
            </VisualizerContainer>
        </>
    );
};

export default MainPanel;
