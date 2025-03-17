import {
    NodePosition,
    STNode,
    Visitor,
} from "@dharshi/syntax-tree";

import { isPositionsEquals } from "../../../utils/st-utils";

export class NodeFindingVisitorByPosition implements Visitor {
    private foundNode: STNode;
    private parentNode: STNode;

    constructor(private position: NodePosition) {}

    public beginVisitSTNode(node: STNode, parent?: STNode): void {
        if (!this.foundNode) {
            if (isPositionsEquals(node.position, this.position)) {
                this.foundNode = node;
                this.parentNode = parent;
            }
        }
    }

    public getNode() {
        return this.foundNode;
    }

    public getParentNode() {
        return this.parentNode;
    }
}
