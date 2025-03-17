import {
    NodePosition,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

import { isPositionsEquals } from "../utils";

class ParentModelFindingVisitor implements Visitor {
    private position: NodePosition;
    private model: STNode;

    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (isPositionsEquals(node.position, this.position)) {
            this.model = node;
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

export const visitor = new ParentModelFindingVisitor();
