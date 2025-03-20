import {
    FunctionDefinition,
    NodePosition,
    QueryExpression,
    SpecificField,
    STNode,
    Visitor,
} from "@dharshi/syntax-tree";

import { isPositionsEquals } from "../../../utils/st-utils";

export class QueryParentFindingVisitor implements Visitor {
    private specifField: SpecificField | FunctionDefinition;
    private foundSearchingNode: boolean;

    constructor(private position: NodePosition) {
        this.foundSearchingNode = false
    }

    public endVisitSpecificField(node: SpecificField, parent?: STNode): void {
        if (!this.specifField && this.foundSearchingNode){
            this.specifField = node;
        }
    }

    public endVisitQueryExpression(node: QueryExpression, parent?: STNode): void {
        if (isPositionsEquals(node.position, this.position) && !this.specifField){
            this.foundSearchingNode = true
        }
    }

    public endVisitFunctionDefinition(node: FunctionDefinition, parent?: STNode): void {
        if (!this.specifField && this.foundSearchingNode){
            this.specifField = node;
        }
    }

    public getSpecificField() {
        return this.specifField;
    }
}
