import {
    QueryExpression,
    SelectClause,
    STKindChecker,
    Visitor,
} from "@dharshi/syntax-tree";

export class QueryExprFindingVisitorByIndex implements Visitor {
    private queryExpression: QueryExpression;
    private selectClauseIndex: number;

    constructor(private index: number) {
        this.selectClauseIndex = 0;
    }

    public beginVisitSelectClause(node: SelectClause): void {
        if (!this.queryExpression) {
            this.selectClauseIndex++;
            if (STKindChecker.isQueryExpression(node.expression) && this.selectClauseIndex === this.index) {
                this.queryExpression = node.expression;
            }
        }
    }

    public getQueryExpression() {
        return this.queryExpression;
    }
}
