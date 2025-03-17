import { STModification } from "@dharshi/ballerina-core";
import { NodePosition } from "@dharshi/syntax-tree";

export function getModification(statement: string, targetPosition: NodePosition): STModification {
    return {
        type: "INSERT",
        isImport: false,
        config: {
            "STATEMENT": statement
        },
        ...targetPosition
    };
}
