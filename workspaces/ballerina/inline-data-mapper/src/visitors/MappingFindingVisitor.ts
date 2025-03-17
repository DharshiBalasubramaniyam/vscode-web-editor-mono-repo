import { Mapping } from "@dharshi/ballerina-core";
import { BaseVisitor } from "./BaseVisitor";

export class MappingFindingVisitor implements BaseVisitor {
    private targetMapping: Mapping;

    constructor(
        private targetId: string
    ){}

    beginVisitMapping(node: Mapping): void {
        if (node.output === this.targetId) {
            this.targetMapping = node;
        }
    }

    getTargetMapping(): Mapping {
        return this.targetMapping;
    }
}
