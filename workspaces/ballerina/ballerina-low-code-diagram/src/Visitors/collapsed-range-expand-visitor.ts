
import {
    BlockStatement, FunctionBodyBlock, IfElseStatement, NodePosition, STKindChecker, STNode, Visitor, WhileStatement
} from "@dharshi/syntax-tree";

import { COLLAPSE_SVG_HEIGHT } from "../Components/RenderingComponents/ForEach/ColapseButtonSVG";
import { BlockViewState, StatementViewState } from "../ViewState";

import { DefaultConfig } from "./default";
import { isPositionWithinRange } from "./util";

export class CollapsedRangeExpandVisitor implements Visitor {
    private expandRange: NodePosition;

    constructor(expandRange: NodePosition) {
        this.expandRange = expandRange;
    }

    beginVisitFunctionBodyBlock(node: FunctionBodyBlock, parent?: STNode): void {
        const blockViewState: BlockViewState = node.viewState as BlockViewState;
        if (blockViewState.hasWorkerDecl) {
            const statements: STNode[] = node.namedWorkerDeclarator.workerInitStatements;
            this.expandCollapseWithMatchingRange(blockViewState, statements);
        }
        this.beginVisitBlock(node as BlockStatement);
    }

    beginVisitBlockStatement(node: BlockStatement, parent?: STNode): void {
        this.beginVisitBlock(node);
    }

    beginVisitBlock(node: BlockStatement) {
        const blockVS: BlockViewState = node.viewState as BlockViewState;
        const statements: STNode[] = node.statements;

        this.expandCollapseWithMatchingRange(blockVS, statements);
    }

    private expandCollapseWithMatchingRange(blockVS: BlockViewState, statements: STNode[]) {
        blockVS.collapsedViewStates.forEach(collapsedVS => {
            if (collapsedVS.range.startLine === this.expandRange.startLine
                && collapsedVS.range.endLine === this.expandRange.endLine
                && collapsedVS.range.startLine === this.expandRange.startLine
                && collapsedVS.range.endLine === this.expandRange.endLine) {

                collapsedVS.collapsed = false;

                let firstStatementInRange: StatementViewState;
                let lastStatementInRange: StatementViewState;


                statements.forEach(statement => {
                    const stmtVS: StatementViewState = statement.viewState as StatementViewState;

                    if (isPositionWithinRange(statement.position, collapsedVS.range)) {
                        if (!firstStatementInRange) {
                            firstStatementInRange = stmtVS;
                        }
                        lastStatementInRange = stmtVS;
                        stmtVS.collapsed = false;
                    }
                });

                if (firstStatementInRange) {
                    firstStatementInRange.bBox.offsetFromTop = DefaultConfig.offSet + COLLAPSE_SVG_HEIGHT / 2;
                }

                if (lastStatementInRange) {
                    lastStatementInRange.bBox.offsetFromBottom = DefaultConfig.offSet;
                }
            }
        });
    }
}
