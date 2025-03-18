import { FunctionDefinition, STNode, Visitor } from "@dharshi/syntax-tree";

export class FunctionFindingVisitor implements Visitor {
    functionName: string;
    functionNode: FunctionDefinition;

    constructor(functionName: string) {
        this.functionName = functionName;
    }

    public beginVisitFunctionDefinition(node: FunctionDefinition, parent?: STNode) {
        if (node.functionName.value === this.functionName) {
            this.functionNode = node;
        }
    }

    public getFunctionNode(): FunctionDefinition {
        return this.functionNode;
    }
}
