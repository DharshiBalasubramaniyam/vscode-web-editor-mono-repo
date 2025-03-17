import {
    LetClause,
    MappingConstructor, QueryPipeline,
    STKindChecker,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

import { StatementEditorViewState } from "../utils/statement-editor-viewstate";

class MultilineConstructsConfigSetupVisitor implements Visitor {
    public beginVisitSTNode(node: STNode, parent?: STNode) {
        if (parent && (parent.viewState as StatementEditorViewState).multilineConstructConfig.isFieldWithNewLine) {
            (node.viewState as StatementEditorViewState).multilineConstructConfig.isFieldWithNewLine = true;
        }
    }

    public beginVisitMappingConstructor(node: MappingConstructor, parent?: STNode) {
        node.fields.map((field: STNode, index: number) => {
            if (node.fields.length - 1 === index) {
                (field.viewState as StatementEditorViewState).multilineConstructConfig.isFieldWithNewLine = true;
            }
        });
        if (node.openBrace.position.endLine !== node.closeBrace.position.startLine) {
            (node.closeBrace.viewState as StatementEditorViewState)
                .multilineConstructConfig.isClosingBraceWithNewLine = true;
        }
        if (parent && (STKindChecker.isSpecificField(parent) || STKindChecker.isComputedNameField(parent))) {
            (node.closeBrace.viewState as StatementEditorViewState)
                .multilineConstructConfig.isFieldWithNewLine = true;
        }
    }

    public beginVisitQueryPipeline(node: QueryPipeline, parent?: STNode) {
        (node.fromClause.viewState as StatementEditorViewState).multilineConstructConfig.isFieldWithNewLine = true;
        node.intermediateClauses.map((clause: STNode, index: number) => {
            (clause.viewState as StatementEditorViewState).multilineConstructConfig.isFieldWithNewLine = true;
        })
    }
}

export const visitor = new MultilineConstructsConfigSetupVisitor();
