import { STNode, Visitor } from "@dharshi/syntax-tree";

import { StatementEditorViewState } from "../utils/statement-editor-viewstate";

class ViewStateSetupVisitor implements Visitor {

    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (!node.viewState) {
            node.viewState = new StatementEditorViewState();
        }
    }
}

export const viewStateSetupVisitor = new ViewStateSetupVisitor();
