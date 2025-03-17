
import { LinePosition } from "../../interfaces/common";

export type SqFlow = {
    participants: SqParticipant[];
    others?: SqParticipant[];
    location: SqLocation;
};

export type SqLocation = {
    fileName: string;
    startLine: LinePosition;
    endLine: LinePosition;
};

export enum SqParticipantType {
    FUNCTION = "FUNCTION",
    WORKER = "WORKER",
    ENDPOINT = "ENDPOINT",
}

export type SqParticipant = {
    id: string;
    name: string;
    kind: SqParticipantType;
    moduleName: string;
    nodes: SqNode[];
    location: SqLocation;
};

export enum SqNodeKind {
    INTERACTION = "INTERACTION",
    IF = "IF",
    WHILE = "WHILE",
    FOREACH = "FOREACH",
    MATCH = "MATCH",
    RETURN = "RETURN",
}

export enum InteractionType {
    ENDPOINT_CALL = "ENDPOINT_CALL",
    FUNCTION_CALL = "FUNCTION_CALL",
    RETURN = "RETURN",
    METHOD_CALL = "METHOD_CALL",
    WORKER_CALL = "WORKER_CALL",
}

export type SqNode = {
    interactionType?: InteractionType;
    properties: SqNodeProperties;
    targetId?: string;
    kind: SqNodeKind;
    location: SqLocation;
    branches?: SqNodeBranch[];
};

export type SqNodeBranch = {
    label: string;
    children: SqNode[];
};

export type SqExpression = {
    type: string;
    value?: string;
};

export type SqNodeProperties = {
    params?: SqExpression[];
    expr?: SqExpression;
    method?: SqExpression;
    value?: SqExpression;
    name?: SqExpression;
    condition?: SqExpression;
};
