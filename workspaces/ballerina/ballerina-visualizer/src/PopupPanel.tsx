
import styled from "@emotion/styled";
import React, { useEffect, useState } from "react";
import { URI, Utils } from "vscode-uri";
import { MACHINE_VIEW, PopupMachineStateValue, PopupVisualizerLocation } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";
// import AddConnectionWizard from "./views/BI/Connection/AddConnectionWizard";
import { ThemeColors, Overlay } from "@dharshi/ui-toolkit";
// import EditConnectionWizard from "./views/BI/Connection/EditConnectionWizard";

const ViewContainer = styled.div`
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    z-index: 2000;
    background-color: ${ThemeColors.SURFACE_BRIGHT};
`;

const TopBar = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px 16px;
`;

interface PopupPanelProps {
    formState: PopupMachineStateValue;
    onClose: () => void;
}

const PopupPanel = (props: PopupPanelProps) => {
    const { formState, onClose } = props;
    const { rpcClient } = useRpcContext();
    const [viewComponent, setViewComponent] = useState<React.ReactNode>();

    useEffect(() => {
        if (typeof formState === "object" && "open" in formState) {
            fetchContext();
        }
    }, [formState]);

    useEffect(() => {
        fetchContext();
    }, []);

    const fetchContext = () => {
        rpcClient.getPopupVisualizerState().then((machineState: PopupVisualizerLocation) => {
            switch (machineState?.view) {
                case MACHINE_VIEW.AddConnectionWizard:
                    console.log("in pop up panel");
                    // rpcClient.getVisualizerLocation().then((location) => {
                    //     setViewComponent(
                    //         <AddConnectionWizard
                    //             fileName={Utils.joinPath(URI.file(location.projectUri), "connections.bal").fsPath}
                    //             target={machineState.metadata?.target || undefined}
                    //             onClose={onClose}
                    //         />
                    //     );
                    // });
                    break;
                case MACHINE_VIEW.EditConnectionWizard:
                    console.log("in pop up panel")
                    // rpcClient.getVisualizerLocation().then((location) => {
                    //     setViewComponent(
                    //         <>
                    //             <EditConnectionWizard
                    //                 fileName={Utils.joinPath(URI.file(location.projectUri), "connections.bal").fsPath}
                    //                 connectionName={machineState?.identifier}
                    //                 onClose={onClose}
                    //             />
                    //             <Overlay sx={{ background: `${ThemeColors.SURFACE_CONTAINER}`, opacity: `0.3`, zIndex: 1000 }} />
                    //         </>
                    //     );
                    // });
                    break;
                default:
                    setViewComponent(null);
            }
        });
    };

    return <ViewContainer>{viewComponent}</ViewContainer>;
};

export default PopupPanel;
