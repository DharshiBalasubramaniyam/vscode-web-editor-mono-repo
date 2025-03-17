
import {
    SqFlow as Flow,
    SqLocation,
    LinePosition,
    SqParticipant,
    SqParticipantType as ParticipantType,
    SqNode,
    SqNodeKind as NodeKind,
    InteractionType,
    SqNodeBranch as SNodeBranch,
    SqNodeProperties as NodeProperties,
    SqExpression as Expression,
} from "@dharshi/ballerina-core";
import { BaseNodeModel } from "../components/nodes/BaseNode";
import { EmptyNodeModel } from "../components/nodes/EmptyNode";

export { ParticipantType, NodeKind, InteractionType };
export type { Flow, SqLocation, LinePosition, NodeProperties, Expression };

export type Participant = SqParticipant & {
    viewState?: ParticipantViewState;
};

export type Node = SqNode & {
    parent?: DiagramElement;
    viewStates?: NodeViewState[];
};

export type NodeBranch = SNodeBranch & {
    parent?: DiagramElement;
    viewStates?: NodeViewState[];
};

export enum ViewStateLabel {
    CONTAINER = "container",
    START_POINT = "start-point", // (x) --->
    END_POINT = "end-point", // ---> (x)
    RETURN_START_POINT = "return-start-point", // <-- (x)
    RETURN_END_POINT = "return-end-point", // (x) <---
    START_LIFELINE = "start-lifeline",
    END_LIFELINE = "end-lifeline",
}

export type ViewState = {
    bBox: BBox;
};

export type ParticipantViewState = ViewState & {
    xIndex: number;
    lifelineHeight: number;
};

export type NodeViewState = ViewState & {
    callNodeId?: string;
    points?: {
        start: PointViewState;
        end: PointViewState;
        returnStart: PointViewState;
        returnEnd: PointViewState;
    };
};

export type PointViewState = ViewState & {
    participantId?: string;
};

export type IfViewState = ViewState & {
    blockId: string;
    breakpointPercent?: number;
};

export type BBox = {
    x: number;
    y: number;
    w: number;
    h: number;
};

export type DiagramElementType = ParticipantType | NodeKind | InteractionType;

export type DiagramElement = Participant | Node;

// Diagram types

export type NodeModel = BaseNodeModel | EmptyNodeModel;

export enum NodeBranchType {
    THEN = "THEN",
    ELSE = "ELSE",
    LOOP = "LOOP",
}
