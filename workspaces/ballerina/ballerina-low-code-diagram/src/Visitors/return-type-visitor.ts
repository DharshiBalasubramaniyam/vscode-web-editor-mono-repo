import {
    ErrorTypeDesc,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

class ReturnTypeVisitor implements Visitor {
    private errorNode: STNode = undefined;

    public beginVisitErrorTypeDesc(node: ErrorTypeDesc, parent?: STNode) {
            this.errorNode = node;
    }

    hasError(): boolean {
        const hasError = this.errorNode !== undefined;
        this.errorNode = undefined;
        return hasError;
    }
}

export const returnTypeVisitor = new ReturnTypeVisitor();
