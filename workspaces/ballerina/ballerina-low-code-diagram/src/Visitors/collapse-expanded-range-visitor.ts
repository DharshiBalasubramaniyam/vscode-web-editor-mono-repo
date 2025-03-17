
import {
    BlockStatement, FunctionBodyBlock, IfElseStatement, NodePosition, STKindChecker, STNode, Visitor
} from "@dharshi/syntax-tree";

import { COLLAPSE_SVG_HEIGHT } from "../Components/RenderingComponents/ForEach/ColapseButtonSVG";
import { BlockViewState, CollapseViewState, StatementViewState } from "../ViewState";

import { DefaultConfig } from "./default";
import { isPositionWithinRange } from "./util";

export class CollapseExpandedRangeVisitor implements Visitor {
    private expandRange: NodePosition;

    constructor(expandRange: NodePosition) {
        this.expandRange = expandRange;
    }

    beginVisitFunctionBodyBlock(node: FunctionBodyBlock, parent?: STNode): void {
        const blockViewState: BlockViewState = node.viewState as BlockViewState;

        if (blockViewState.hasWorkerDecl) {
            this.collapseMatchingRange(blockViewState.collapsedViewStates, node.namedWorkerDeclarator.workerInitStatements);
        }

        this.beginVisitBlock(node);
    }

    beginVisitIfElseStatement(node: IfElseStatement, parent?: STNode) {
        this.beginVisitBlock(node.ifBody);
        if (node.elseBody && STKindChecker.isElseBlock(node.elseBody)
            && STKindChecker.isBlockStatement(node.elseBody.elseBody)) {
            this.beginVisitBlock(node.elseBody.elseBody)
        }
    }

    beginVisitBlockStatement(node: BlockStatement): void {
        this.beginVisitBlock(node);
    }

    beginVisitBlock(node: BlockStatement | FunctionBodyBlock) {
        const blockVS: BlockViewState = node.viewState as BlockViewState;
        const collapsedViewStates: CollapseViewState[] = blockVS.collapsedViewStates;
        const statements: STNode[] = node.statements;

        this.collapseMatchingRange(collapsedViewStates, statements);
    }

    private collapseMatchingRange(collapsedViewStates: CollapseViewState[], statements: STNode[]) {
        collapsedViewStates.forEach(collapsedVS => {
            if (isPositionWithinRange(collapsedVS.range, this.expandRange)) {
                collapsedVS.collapsed = true;
                collapsedVS.bBox.h = COLLAPSE_SVG_HEIGHT;
            }
        });

        statements.forEach(statement => {
            const stmtVS: StatementViewState = statement.viewState as StatementViewState;
            if (isPositionWithinRange(statement.position, this.expandRange)) {
                stmtVS.collapsed = true;
                stmtVS.bBox.offsetFromTop = DefaultConfig.interactionModeOffset;
                stmtVS.bBox.offsetFromBottom = DefaultConfig.interactionModeOffset;
            }
        });
    }
}
