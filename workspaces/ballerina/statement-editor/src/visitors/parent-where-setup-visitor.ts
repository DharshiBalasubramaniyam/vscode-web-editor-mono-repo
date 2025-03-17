import {
    STNode,
    Visitor,
    WhereClause
} from "@dharshi/syntax-tree";

import { StatementEditorViewState } from "../utils/statement-editor-viewstate";


class ParentWhereSetupVisitor implements Visitor {
    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (parent && (parent.viewState as StatementEditorViewState).isWithinWhereClause) {
            (node.viewState as StatementEditorViewState).isWithinWhereClause = true;
        }
    }

    public beginVisitWhereClause(node: WhereClause) {
        (node.viewState as StatementEditorViewState).isWithinWhereClause = true;
    }
}

export const parentWhereSetupVisitor = new ParentWhereSetupVisitor();
