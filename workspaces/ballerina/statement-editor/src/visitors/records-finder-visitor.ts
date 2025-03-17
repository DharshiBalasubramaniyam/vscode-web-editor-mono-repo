import {
    NodePosition,
    RecordTypeDesc,
    ReturnTypeDescriptor,
    SimpleNameReference,
    STNode,
    UnionTypeDesc,
    Visitor
} from "@dharshi/syntax-tree";


const recordTypeDescriptions: Map<string, STNode> = new Map();

class RecordsFinderVisitor implements Visitor {

    isReturn: boolean = false;
    public beginVisitReturnTypeDescriptor(node: ReturnTypeDescriptor) {
        this.isReturn = true;
    }

    public beginVisitSimpleNameReference(node: SimpleNameReference, parent?: STNode): void {
        if (this.isReturn) {
            recordTypeDescriptions.set(node.name.value, node);
        }
    }

    getRecords(): Map<string, STNode> {
        return recordTypeDescriptions;
    }
}

export const visitor = new RecordsFinderVisitor();
