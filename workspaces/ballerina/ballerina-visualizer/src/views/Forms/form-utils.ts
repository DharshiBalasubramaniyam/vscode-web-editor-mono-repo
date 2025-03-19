
import { FlowNode, LineRange } from "@dharshi/ballerina-core";
import { FormValues } from "@dharshi/ballerina-side-panel";
import { RemoveEmptyNodesVisitor, traverseNode } from "@dharshi/bi-diagram";

import { updateNodeProperties } from "../../utils/bi";

export function createNodeWithUpdatedLineRange(node: FlowNode, targetLineRange: LineRange): FlowNode {
    return {
        ...node,
        codedata: {
            ...node.codedata,
            lineRange: {
                ...node.codedata.lineRange,
                startLine: targetLineRange.startLine,
                endLine: targetLineRange.endLine,
            },
        }
    }
}

export function processFormData(data: FormValues): FormValues {
    if ("update-variable" in data) {
        data["variable"] = data["update-variable"];
        data["type"] = "";
    }
    return data;
}

export function updateNodeWithProperties(node: FlowNode, updatedNode: FlowNode, data: FormValues): FlowNode {
    const newNode = { ...updatedNode };

    if (node.branches?.at(0)?.properties) {
        // branch properties
        newNode.branches[0].properties = updateNodeProperties(data, node.branches[0].properties);
    } else if (node.properties) {
        // node properties
        newNode.properties = updateNodeProperties(data, node.properties);
    } else {
        console.error(">>> Error updating source code. No properties found");
    }

    return newNode;
}

export function removeEmptyNodes(updatedNode: FlowNode): FlowNode {
    const removeEmptyNodeVisitor = new RemoveEmptyNodesVisitor(updatedNode);
    traverseNode(updatedNode, removeEmptyNodeVisitor);
    return removeEmptyNodeVisitor.getNode();
}
