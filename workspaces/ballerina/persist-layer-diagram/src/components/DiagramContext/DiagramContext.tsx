
import React, { createContext, ReactNode } from 'react';

interface DiagramContextProps {
    collapsedMode: boolean;
    selectedNodeId: string;
    hasDiagnostics: boolean;
    setHasDiagnostics: (hasDiagnostics: boolean) => void;
    setSelectedNodeId: (id: string) => void;
    children: ReactNode;
    focusedNodeId?: string;
    setFocusedNodeId?: (id: string) => void;
}

interface IDiagramContext {
    collapsedMode: boolean;
    selectedNodeId: string;
    hasDiagnostics: boolean;
    setHasDiagnostics: (hasDiagnostics: boolean) => void;
    setSelectedNodeId: (id: string) => void;
    focusedNodeId?: string;
    setFocusedNodeId?: (id: string) => void;
}

const defaultState: any = {};
export const DiagramContext = createContext<IDiagramContext>(defaultState);

export function PersistDiagramContext(props: DiagramContextProps) {
    const { collapsedMode, selectedNodeId, setSelectedNodeId, setHasDiagnostics, hasDiagnostics, children, focusedNodeId, setFocusedNodeId } = props;

    let context: IDiagramContext = {
        collapsedMode,
        selectedNodeId,
        hasDiagnostics,
        setHasDiagnostics,
        setSelectedNodeId,
        focusedNodeId,
        setFocusedNodeId
    }

    return (
        <DiagramContext.Provider value={{ ...context }}>
            {children}
        </DiagramContext.Provider>
    );
}

export const useDiagramContext = () => React.useContext(DiagramContext);
