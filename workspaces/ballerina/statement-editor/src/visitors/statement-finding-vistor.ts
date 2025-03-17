import {
    BlockStatement,
    FunctionBodyBlock,
    STNode,
    Visitor
} from "@dharshi/syntax-tree";

class StatementFindingVisitor implements Visitor {
    private statements: STNode[] = [];

    public beginVisitFunctionBodyBlock(node: FunctionBodyBlock, parent?: STNode) {
            this.statements.push(...node.statements);
    }

    public beginVisitBlockStatement(node: BlockStatement, parent?: STNode) {
        this.statements.push(...node.statements);
    }

    setStatementsNull(): void {
         this.statements = []
    }

    getStatements(): STNode[] {
        return this.statements;
    }
}

export const visitor = new StatementFindingVisitor();
