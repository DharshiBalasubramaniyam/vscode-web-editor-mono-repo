import { DataMapperNodeModel } from "../Node/commons/DataMapperNode";
import { InputNode } from "../Node";

export function findInputNode(field: string, outputNode: DataMapperNodeModel): InputNode {
    const nodes = outputNode.getModel().getNodes();

    const inputNode = nodes.find(node => {
        if (node instanceof InputNode) {
            const mappingStartsWith = field.split('.')[0];
            return node.inputType.id === mappingStartsWith;

        }
    });

    return inputNode ? inputNode as InputNode : undefined;
}
