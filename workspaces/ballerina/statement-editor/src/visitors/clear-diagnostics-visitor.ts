import {STNode, Visitor} from "@dharshi/syntax-tree";


class ClearDiagnosticVisitor implements Visitor {

    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (node && node.viewState) {
            node.viewState.diagnosticsInPosition = []
        }
    }

}

export const visitor = new ClearDiagnosticVisitor();
