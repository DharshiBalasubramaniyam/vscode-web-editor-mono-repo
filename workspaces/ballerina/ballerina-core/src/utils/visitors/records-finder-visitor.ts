import {
    TypeDefinition,
    Visitor
} from "@dharshi/syntax-tree";


const typeDefinitions: Map<string, TypeDefinition> = new Map();

class RecordsFinderVisitor implements Visitor {

    isReturn: boolean = false;
    public beginVisitReturnTypeDescriptor() {
        this.isReturn = true;
    }

    public beginVisitTypeDefinition(node: TypeDefinition): void {
        if (this.isReturn) {
            typeDefinitions.set(node.typeName?.value, node);
        }
    }

    getRecords(): Map<string, TypeDefinition> {
        return typeDefinitions;
    }
}

export const visitor = new RecordsFinderVisitor();
