

import { BaseModel } from "@projectstorm/react-canvas-core";
import {
    ListConstructorNode,
    MappingConstructorNode,
    PrimitiveTypeNode,
    QueryExpressionNode,
    RequiredParamNode,
    EnumTypeNode,
    FromClauseNode,
    JoinClauseNode,
    LetClauseNode,
    LetExpressionNode,
    LinkConnectorNode,
    ModuleVariableNode,
    UnionTypeNode,
    UnsupportedIONode
} from "../Node";
import { IO_NODE_DEFAULT_WIDTH } from "../utils/constants";
import { ExpandedMappingHeaderNode } from "../Node/ExpandedMappingHeader";

export const INPUT_NODES = [
    RequiredParamNode,
    FromClauseNode,
    LetExpressionNode,
    ModuleVariableNode,
    EnumTypeNode,
    LetClauseNode,
    JoinClauseNode,
    ExpandedMappingHeaderNode
];

export const OUTPUT_NODES = [
    MappingConstructorNode,
    ListConstructorNode,
    PrimitiveTypeNode,
    UnionTypeNode,
    UnsupportedIONode
];

export const INTERMEDIATE_NODES = [
    LinkConnectorNode,
    QueryExpressionNode
];

export const MIN_VISIBLE_HEIGHT = 68;
export const INPUT_NODE_DEFAULT_RIGHT_X = IO_NODE_DEFAULT_WIDTH;

export function isInputNode(node: BaseModel) {
    return INPUT_NODES.some(nodeType => node instanceof nodeType);
}

export function isOutputNode(node: BaseModel) {
    return OUTPUT_NODES.some(nodeType => node instanceof nodeType);
}

export function isIntermediateNode(node: BaseModel) {
    return INTERMEDIATE_NODES.some(nodeType => node instanceof nodeType);
}
