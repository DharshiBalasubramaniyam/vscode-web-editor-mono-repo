import { STNode, Visitor } from "@dharshi/syntax-tree";


class ParentSetupVisitor implements Visitor {

    public beginVisitSTNode(node: STNode, parent?: STNode) {
        node.parent = parent;
    }
}

export const parentSetupVisitor = new ParentSetupVisitor();
