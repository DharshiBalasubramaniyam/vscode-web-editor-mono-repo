import { BlockStatement, Visitor } from "@dharshi/syntax-tree";

export class BlockStatementFinder implements Visitor {
    public haveBlockStatement: boolean = false;
    constructor() {
        this.haveBlockStatement = false;
    }

    public beginVisitBlockStatement(node: BlockStatement) {
        this.haveBlockStatement = true;
    }

    public getHaveBlockStatement(): boolean {
        return this.haveBlockStatement;
    }
}
