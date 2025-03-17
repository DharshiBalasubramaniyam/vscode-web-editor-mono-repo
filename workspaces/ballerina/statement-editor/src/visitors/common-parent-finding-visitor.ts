import {
    NodePosition,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

import { isNodeInRange } from "../utils";

class CommonParentFindingVisitor implements Visitor {
    private firstNodePosition: NodePosition;
    private secondNodePosition: NodePosition;
    private model: STNode;

    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (isNodeInRange(this.firstNodePosition, node.position) && isNodeInRange(this.secondNodePosition, node.position)) {
            this.model = node;
        }
    }

    getModel(): STNode {
        const newModel = this.model;
        this.model = undefined;
        return newModel;
    }

    setPositions(firstNodeposition: NodePosition, secondNodePosition: NodePosition) {
        this.firstNodePosition = firstNodeposition;
        this.secondNodePosition = secondNodePosition
    }
}

export const visitor = new CommonParentFindingVisitor();
