
import { FlowNode } from "../utils/types";
import { BaseVisitor } from "./BaseVisitor";

export class RemoveEmptyNodesVisitor implements BaseVisitor {
    private skipChildrenVisit = false;
    private node;

    constructor(node: FlowNode) {
        // console.log(">>> remove empty nodes visitor started");
        this.node = node;
    }

    beginVisitNode(node: FlowNode, parent?: FlowNode): void {
        node.branches?.forEach((branch) => {
            // if branch is not empty remove empty node
            if (branch.children && branch.children.length > 0) {
                const emptyNodeIndex = branch.children.findIndex((child) => child.codedata.node === "EMPTY");
                if (emptyNodeIndex >= 0) {
                    branch.children.splice(emptyNodeIndex, 1);
                }
                // remove start nodes from workers
                if (branch.children[0].codedata.node === "EVENT_START") {
                    branch.children.shift();
                }
            }
        });
    }

    getNode(): FlowNode {
        return this.node;
    }

    skipChildren(): boolean {
        return this.skipChildrenVisit;
    }
}
