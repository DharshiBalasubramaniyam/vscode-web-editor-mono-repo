
import { BaseVisitor } from "../visitors/BaseVisitor";
import { Flow, FlowNode } from "./types";

const metaNodes = ["viewState", "position", "parent"];

export function traverseFlow(flow: Flow, visitor: BaseVisitor, parent?: FlowNode) {
    let lastNode: FlowNode = undefined;
    flow.nodes.forEach((node) => {
        traverseNode(node, visitor, parent || lastNode);
        lastNode = node;
    });
}

export function traverseNode(node: FlowNode, visitor: BaseVisitor, parent?: FlowNode) {
    if (!node.codedata.node) {
        console.warn("FlowNode kind is not defined", node);
        return;
    }
    let name = "";
    // convert this kind to a camel case string
    node.codedata.node.split("_").forEach((kind) => {
        name += kind.charAt(0).toUpperCase() + kind.slice(1).toLowerCase();
    });

    let beginVisitFn: any = (visitor as any)[`beginVisit${name}`];
    if (!beginVisitFn) {
        beginVisitFn = visitor.beginVisitNode && visitor.beginVisitNode;
    }

    if (beginVisitFn) {
        beginVisitFn.bind(visitor)(node, parent);
    }

    const keys = Object.keys(node);
    keys.forEach((key) => {
        if (metaNodes.includes(key) || visitor.skipChildren()) {
            return;
        }

        const childNode = (node as any)[key] as any;
        if (Array.isArray(childNode)) {
            childNode.forEach((elementNode) => {

                // HACK: remove this after fixing the getFlowNode response
                // if(elementNode && elementNode.kind && !elementNode.codedata.node){
                //     elementNode.codedata.node = elementNode.kind;
                //     console.warn("HACK: copied node kind to codedata", elementNode);
                // }

                if (!elementNode?.codedata.node) {
                    console.warn("Child node kind is not defined", elementNode);
                    return;
                }

                traverseNode(elementNode, visitor, node);
            });
            return;
        }

        if (!childNode?.codedata?.node) {
            return;
        }

        traverseNode(childNode, visitor, node);
    });

    let endVisitFn: any = (visitor as any)[`endVisit${name}`];
    if (!endVisitFn) {
        endVisitFn = visitor.endVisitNode && visitor.endVisitNode;
    }

    if (endVisitFn) {
        endVisitFn.bind(visitor)(node, parent);
    }
}
