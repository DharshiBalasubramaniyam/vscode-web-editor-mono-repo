import {
    FunctionDefinition,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

class FunctionFindingVisitor implements Visitor {
    private functions: FunctionDefinition[] = [];

    public beginVisitFunctionDefinition(node: FunctionDefinition, parent?: STNode) {
            this.functions.push(node);
    }

    setFunctionsNull(): void {
         this.functions = []
    }

    getFunctions(): FunctionDefinition[] {
        return this.functions;
    }
}

export const visitor = new FunctionFindingVisitor();
