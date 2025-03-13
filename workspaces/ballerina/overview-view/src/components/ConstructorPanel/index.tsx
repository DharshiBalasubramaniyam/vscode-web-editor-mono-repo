/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

import styled from "@emotion/styled";
import { Button, Codicon, Divider, SidePanel, Typography } from "@dharshi/ui-toolkit";
import { MACHINE_VIEW, EVENT_TYPE } from "@dharshi/ballerina-core";
import { useRpcContext } from "@dharshi/ballerina-rpc-client";

interface ConstructorPanelProps {
    isPanelOpen: boolean;
    setPanelOpen: (value: React.SetStateAction<boolean>) => void
}

enum PlusMenuCategories {
    MODULE_INIT,
    CONSTRUCT,
    ENTRY_POINT
}

interface Entry {
    name: string;
    category: PlusMenuCategories;
    view: MACHINE_VIEW;
    serviceType: string | undefined
}

export function ConstructorPanel(props: ConstructorPanelProps) {
    const { rpcClient } = useRpcContext();
    const closePanel = () => {
        props.setPanelOpen(false);
    };

    const SidePanelTitleContainer = styled.div`
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        padding: 4px 16px;
        border-bottom: 1px solid var(--vscode-panel-border);
        font: inherit;
        font-weight: bold;
        color: var(--vscode-editor-foreground);
    `;

    const SidePanelBody = styled.div`
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        padding: 16px;
        gap: 8px;
        overflow-y: scroll;
        height: 100%;
    `;

    const ButtonWrapper = styled.div`
        padding: 0 16px;
        border: 1px solid var(--vscode-editor-background);
        cursor: pointer;
        width: 100%;
        &:hover {
            background-color: var(--vscode-editor-hoverHighlightBackground);
            border-color: var(--vscode-focusBorder);
        }
    `;

    const handleClick = async (entry: Entry) => {
        console.log("add contruct: ", entry)
        await rpcClient.getVisualizerRpcClient().openView({
            type: EVENT_TYPE.OPEN_VIEW,
            location: {
                view: entry.view,
                serviceType: entry.serviceType,
            },
        });
    }

    const moduleLevelEntries: Entry[] = [
        { name: 'Main', category: PlusMenuCategories.ENTRY_POINT, view: MACHINE_VIEW.Overview, serviceType: undefined },
        { name: 'HTTP service', category: PlusMenuCategories.ENTRY_POINT, view: MACHINE_VIEW.BIServiceWizard, serviceType: "http" },
        { name: 'GraphQL service', category: PlusMenuCategories.ENTRY_POINT, view: MACHINE_VIEW.BIServiceWizard, serviceType: "graphql" },
        { name: 'Trigger', category: PlusMenuCategories.ENTRY_POINT, view: MACHINE_VIEW.Overview, serviceType: undefined },

        { name: 'Type', category: PlusMenuCategories.CONSTRUCT, view: MACHINE_VIEW.TypeDiagram, serviceType: undefined },
        { name: 'Function', category: PlusMenuCategories.CONSTRUCT, view: MACHINE_VIEW.BIFunctionForm, serviceType: undefined },
        { name: 'Class', category: PlusMenuCategories.CONSTRUCT, view: MACHINE_VIEW.BIServiceWizard, serviceType: undefined },
        { name: 'Data Mapper', category: PlusMenuCategories.CONSTRUCT, view: MACHINE_VIEW.BIDataMapperForm, serviceType: undefined },

        { name: 'Connector', category: PlusMenuCategories.MODULE_INIT, view: MACHINE_VIEW.AddConnectionWizard, serviceType: undefined },
        { name: 'Configurable', category: PlusMenuCategories.MODULE_INIT, view: MACHINE_VIEW.ViewConfigVariables, serviceType: undefined }
    ];

    const entryPoints: JSX.Element[] = [];
    const constructs: JSX.Element[] = [];
    const moduleInit: JSX.Element[] = [];

    moduleLevelEntries.forEach(entry => {
        switch (entry.category) {
            case PlusMenuCategories.CONSTRUCT:
                constructs.push((
                    <ButtonWrapper onClick={() => handleClick(entry)} >
                        <Typography variant="h4"> {entry.name} </Typography>
                    </ButtonWrapper>
                ));
                break;
            case PlusMenuCategories.ENTRY_POINT:
                entryPoints.push((
                    <ButtonWrapper onClick={() => handleClick(entry)} >
                        <Typography variant="h4"> {entry.name} </Typography>
                    </ButtonWrapper>
                ));
                break;
            case PlusMenuCategories.MODULE_INIT:
                moduleInit.push((
                    <ButtonWrapper onClick={() => handleClick(entry)} >
                        <Typography variant="h4"> {entry.name} </Typography>
                    </ButtonWrapper>
                ));
                break;
        }
    })

    console.log(moduleInit)

    return (
        <SidePanel
            isOpen={props.isPanelOpen}
            alignment="right"
            sx={{ transition: "all 0.3s ease-in-out" }}
        >
            <SidePanelTitleContainer>
                <Typography variant="h3">Add Constructs </Typography>
                <Button onClick={closePanel} appearance="icon"><Codicon name="close" /></Button>
            </SidePanelTitleContainer>
            <SidePanelBody>
                <Typography variant="h3">  Entry points </Typography>
                {entryPoints}
                <Divider />
                <Typography variant="h3">  Constructs </Typography>
                {constructs}
                <Divider />
                <Typography variant="h3">  Module level variables</Typography>
                {moduleInit}
                {/* <ActionButtons
                    primaryButton={{ text: "Save", onClick: () => console.log("Save Button Clicked"), tooltip: "Save Button" }}
                    secondaryButton={{ text: "Cancel", onClick: closePanel, tooltip: "Cancel Button" }}
                    sx={{ justifyContent: "flex-end" }}
                /> */}
            </SidePanelBody>
        </SidePanel>

    )
}
