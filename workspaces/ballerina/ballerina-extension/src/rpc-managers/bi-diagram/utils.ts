
import { NodeProperties } from "@dharshi/ballerina-core";
import { NodePosition, STNode, traversNode } from "@dharshi/syntax-tree";

// import { FunctionFindingVisitor } from "../../utils/function-finding-visitor";

export const DATA_MAPPING_FILE_NAME = "data_mappings.bal";

// export function getFunctionNodePosition(nodeProperties: NodeProperties, syntaxTree: STNode): NodePosition {
//     const functionName = nodeProperties.hasOwnProperty("functionName")
//         ? nodeProperties["functionName"].value as string
//         : "";
//     const functionFindingVisitor = new FunctionFindingVisitor(functionName);
//     traversNode(syntaxTree, functionFindingVisitor);
//     const functionNode = functionFindingVisitor.getFunctionNode();

//     return functionNode.position;
// }
