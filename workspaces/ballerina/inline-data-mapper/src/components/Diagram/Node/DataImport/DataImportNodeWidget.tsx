import React, { useState } from "react";

import { TreeContainer } from "../commons/Tree/Tree";
import { useDMIOConfigPanelStore } from "../../../../store/store";
import { Codicon } from "@dharshi/ui-toolkit";
import { Label } from "../../OverriddenLinkLayer/LabelWidget";

export interface DataImportNodeWidgetProps {
    configName: string;
    ioType: string;
}

export function DataImportNodeWidget(props: DataImportNodeWidgetProps) {
    const {configName, ioType} = props;

    const { setIsIOConfigPanelOpen, setIOConfigPanelType, setIsSchemaOverridden } = useDMIOConfigPanelStore(state => ({
		setIsIOConfigPanelOpen: state.setIsIOConfigPanelOpen,
		setIOConfigPanelType: state.setIOConfigPanelType,
        setIsSchemaOverridden: state.setIsSchemaOverridden
	}));

    const handleOnClick = () => {
        setIsIOConfigPanelOpen(true);
        setIOConfigPanelType(ioType);
        setIsSchemaOverridden(false);
    };

    return (
        <div >
            <TreeContainer>
                <div style={{ display: 'flex', width: '100%', justifyContent: 'space-between', backgroundColor: 'var(--vscode-activityBarTop.activeForeground' }}>
                <div style={{padding: '100px', justifyContent: 'space-between'}}>
                    <Codicon sx={{ margin: 5, zoom: 5}}  name="new-file" onClick={handleOnClick} />
                    <Label style={{fontSize:15}}>Import {ioType} Schema</Label>
                </div>
                </div>
            </TreeContainer>
        </div >
    );
}
