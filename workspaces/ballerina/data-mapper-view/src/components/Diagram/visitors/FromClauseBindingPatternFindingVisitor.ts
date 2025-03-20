import {
    FromClause,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

export class FromClauseBindingPatternFindingVisitor implements Visitor {
    private readonly bindingPatterns: STNode[];

    constructor() {
        this.bindingPatterns = []
    }

    public beginVisitFromClause(node: FromClause) {
        this.bindingPatterns.push(node.typedBindingPattern.bindingPattern);
    }

    public getBindingPatterns(){
        return this.bindingPatterns;
    }
}
