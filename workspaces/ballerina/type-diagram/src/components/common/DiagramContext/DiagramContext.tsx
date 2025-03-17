
import React, { createContext, ReactNode } from 'react';
import { Type } from '@dharshi/ballerina-core';

interface DiagramContextProps {
    children?: ReactNode;
    hasDiagnostics: boolean;
    focusedNodeId?: string;
    setFocusedNodeId?: (id: string) => void;
    selectedNodeId?: string;
    setSelectedNodeId?: (id: string) => void;
    onEditNode?: (id: string, isGraphqlRoot?: boolean) => void;
    goToSource?: (node: Type) => void
}

interface IDiagramContext {
    hasDiagnostics: boolean;
    focusedNodeId?: string;
    setFocusedNodeId?: (id: string) => void;
    selectedNodeId?: string;
    setSelectedNodeId?: (id: string) => void;
    onEditNode?: (id: string, isGraphqlRoot?: boolean) => void;
    goToSource?: (node: Type) => void
}

const defaultState: any = {};
export const DiagramContext = createContext<IDiagramContext>(defaultState);

export function DesignDiagramContext(props: DiagramContextProps) {
    const {
        children,
        hasDiagnostics,
        focusedNodeId,
        setFocusedNodeId,
        selectedNodeId,
        setSelectedNodeId,
        onEditNode,
        goToSource
    } = props;

    let context: IDiagramContext = {
        hasDiagnostics,
        focusedNodeId,
        setFocusedNodeId,
        selectedNodeId,
        setSelectedNodeId,
        onEditNode,
        goToSource
    }

    return (
        <DiagramContext.Provider value={{ ...context }}>
            {children}
        </DiagramContext.Provider>
    );
}

export const useDiagramContext = () => React.useContext(DiagramContext);
