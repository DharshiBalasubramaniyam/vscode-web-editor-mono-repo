
import React from "react";
import { CDListener, CDModel, CDService } from "@dharshi/ballerina-core";
import { CDAutomation } from "@dharshi/ballerina-core";
import { CDConnection } from "@dharshi/ballerina-core";
import { CDFunction, CDResourceFunction } from "@dharshi/ballerina-core";
export interface DiagramContextState {
    project: CDModel;
    onListenerSelect: (listener: CDListener) => void;
    onServiceSelect: (service: CDService) => void;
    onFunctionSelect: (func: CDFunction | CDResourceFunction) => void;
    onAutomationSelect: (automation: CDAutomation) => void;
    onConnectionSelect: (connection: CDConnection) => void;
    onDeleteComponent: (component: CDListener | CDService | CDAutomation | CDConnection) => void;
}

export const DiagramContext = React.createContext<DiagramContextState>({
    project: { connections: [], listeners: [], services: [] },
    onListenerSelect: () => {},
    onServiceSelect: () => {},
    onFunctionSelect: () => {},
    onAutomationSelect: () => {},
    onConnectionSelect: () => {},
    onDeleteComponent: () => {},
});

export const useDiagramContext = () => React.useContext(DiagramContext);

export function DiagramContextProvider(props: { children: React.ReactNode; value: DiagramContextState }) {
    // add node states
    // enrich context with optional states
    const ctx = {
        ...props.value,
    };

    return <DiagramContext.Provider value={ctx}>{props.children}</DiagramContext.Provider>;
}
