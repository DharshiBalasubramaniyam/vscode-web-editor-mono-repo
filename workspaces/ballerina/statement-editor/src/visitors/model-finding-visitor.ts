import {
    NodePosition,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

import { INPUT_EDITOR_PLACEHOLDERS } from "../components/InputEditor/constants";
import { DEFAULT_INTERMEDIATE_CLAUSE, DEFAULT_WHERE_INTERMEDIATE_CLAUSE } from "../constants";
import { isPositionsEquals } from "../utils";

class ModelFindingVisitor implements Visitor {
    private position: NodePosition;
    private model: STNode;

    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (isPositionsEquals(node.position, this.position)) {
            this.model = node;
        } else if ((INPUT_EDITOR_PLACEHOLDERS.has(node?.source?.trim()) && !node?.source?.startsWith(DEFAULT_INTERMEDIATE_CLAUSE)) ||
            node?.source?.trim().includes(DEFAULT_WHERE_INTERMEDIATE_CLAUSE)) {
                const isWithinRange = this.position.startLine <= node.position.startLine
                    && this.position.endLine >= node.position.endLine
                    && this.position.startColumn <= node.position.endColumn
                    && this.position.endColumn >= node.position.startColumn;
                if (isWithinRange) {
                    this.model = node;
                }
        }
    }

    getModel(): STNode {
        const newModel = this.model;
        this.model = undefined;
        return newModel;
    }

    setPosition(position: NodePosition) {
        this.position = position;
    }
}

export const visitor = new ModelFindingVisitor();
