import {
    ClientResourceAccessAction,
    ExplicitNewExpression,
    FunctionCall,
    ImplicitNewExpression,
    MethodCall,
    RemoteMethodCallAction,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

import { StatementEditorViewState } from "../utils/statement-editor-viewstate";


class ParentFunctionSetupVisitor implements Visitor {
    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (parent && (parent.viewState as StatementEditorViewState).parentFunctionPos) {
            (node.viewState as StatementEditorViewState).parentFunctionPos = parent.viewState.parentFunctionPos;
        }
    }

    public beginVisitFunctionCall(node: FunctionCall) {
        (node.viewState as StatementEditorViewState).parentFunctionPos = node.position;
    }

    public beginVisitMethodCall(node: MethodCall) {
        (node.viewState as StatementEditorViewState).parentFunctionPos = node.position;
    }

    public beginVisitExplicitNewExpression(node: ExplicitNewExpression) {
        (node.viewState as StatementEditorViewState).parentFunctionPos = node.position;
    }

    public beginVisitImplicitNewExpression(node: ImplicitNewExpression) {
        (node.viewState as StatementEditorViewState).parentFunctionPos = node.position;
    }

    public beginVisitRemoteMethodCallAction(node: RemoteMethodCallAction): void {
        (node.viewState as StatementEditorViewState).parentFunctionPos = node.position;
    }

    public beginVisitClientResourceAccessAction(node: ClientResourceAccessAction): void {
        (node.viewState as StatementEditorViewState).parentFunctionPos = node.position;
    }
}

export const parentFunctionSetupVisitor = new ParentFunctionSetupVisitor();
