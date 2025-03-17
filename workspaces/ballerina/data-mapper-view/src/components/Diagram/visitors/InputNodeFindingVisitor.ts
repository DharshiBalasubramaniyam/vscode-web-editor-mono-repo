import {
    FieldAccess,
    OptionalFieldAccess,
    SimpleNameReference,
    STKindChecker,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

export class InputNodeFindingVisitor implements Visitor {
    private inputNodes: (FieldAccess | OptionalFieldAccess | SimpleNameReference)[];
    private queryExpressionDepth: number;

    constructor() {
        this.inputNodes = []
        this.queryExpressionDepth = 0
    }

    public beginVisitFieldAccess(node: FieldAccess, parent?: STNode) {
        if ((!parent || (!STKindChecker.isFieldAccess(parent) && !STKindChecker.isOptionalFieldAccess(parent)))
            && this.queryExpressionDepth === 0) {
            this.inputNodes.push(node)
        }
    }

    public beginVisitOptionalFieldAccess(node: OptionalFieldAccess, parent?: STNode) {
        if ((!parent || (!STKindChecker.isFieldAccess(parent) && !STKindChecker.isOptionalFieldAccess(parent)))
            && this.queryExpressionDepth === 0) {
            this.inputNodes.push(node)
        }
    }

    public beginVisitSimpleNameReference(node: SimpleNameReference, parent?: STNode) {
        if (
            STKindChecker.isIdentifierToken(node.name) &&
            (!parent ||
                (parent &&
                    !STKindChecker.isFieldAccess(parent) &&
                    !STKindChecker.isOptionalFieldAccess(parent) &&
                    !STKindChecker.isFunctionCall(parent)
                )) &&
            this.queryExpressionDepth === 0
        ) {
            this.inputNodes.push(node);
        }
    }

    public beginVisitQueryExpression() {
        this.queryExpressionDepth += 1;
    }

    public endVisitQueryExpression(){
        this.queryExpressionDepth -= 1;
    }

    public getFieldAccessNodes() {
        return this.inputNodes
    }

}
