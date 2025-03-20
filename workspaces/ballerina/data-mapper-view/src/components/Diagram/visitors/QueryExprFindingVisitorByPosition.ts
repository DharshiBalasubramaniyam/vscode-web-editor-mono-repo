import {
    NodePosition,
    QueryExpression,
    SelectClause,
    STKindChecker,
    Visitor,
} from "@dharshi/syntax-tree";

import { isPositionsEquals } from "../../../utils/st-utils";

export class QueryExprFindingVisitorByPosition implements Visitor {
    private queryExpression: QueryExpression;
    private selectClauseIndex: number ;

    constructor(private position: NodePosition) {
        this.selectClauseIndex = 0;
    }

    public beginVisitSelectClause(node: SelectClause): void {
        if (!this.queryExpression) {
            this.selectClauseIndex++;
            if (STKindChecker.isQueryExpression(node.expression) && isPositionsEquals(node.expression.position, this.position)) {
                this.queryExpression = node.expression;
            }
        }
    }

    public getQueryExpression() {
        return this.queryExpression;
    }

    public getSelectClauseIndex() {
        return this.selectClauseIndex;
    }
}
