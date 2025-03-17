
import React from "react";
import { Flow } from "../utils/types";
import { SqParticipantType } from "@dharshi/ballerina-core";
import { SqParticipant } from "@dharshi/ballerina-core";

export interface DiagramContextState {
    flow: Flow;
    onClickParticipant: (participant: SqParticipant) => void;
    onAddParticipant: (kind: SqParticipantType) => void;
}

export const DiagramContext = React.createContext<DiagramContextState>({
    flow: {
        participants: [],
        location: {
            fileName: "",
            startLine: { line: 0, offset: 0 },
            endLine: { line: 0, offset: 0 },
        },
    },
    onClickParticipant: () => {},
    onAddParticipant: () => {},
});

export const useDiagramContext = () => React.useContext(DiagramContext);

export function DiagramContextProvider(props: { children: React.ReactNode; value: DiagramContextState }) {
    // enrich context with optional states
    const ctx = {
        ...props.value,
    };

    return <DiagramContext.Provider value={ctx}>{props.children}</DiagramContext.Provider>;
}
