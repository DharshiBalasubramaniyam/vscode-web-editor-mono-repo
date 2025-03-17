import { NodeModel } from "@projectstorm/react-diagrams";

import { InputNode, ObjectOutputNode } from "../Node";
import { InputOutputPortModel } from "../Port";
import { ARRAY_OUTPUT_TARGET_PORT_PREFIX, OBJECT_OUTPUT_TARGET_PORT_PREFIX } from "./constants";
import { ArrayOutputNode } from "../Node/ArrayOutput/ArrayOutputNode";

export function getInputPort(node: InputNode, inputField: string): InputOutputPortModel {
    let port = node.getPort(`${inputField}.OUT`) as InputOutputPortModel;

    while (port && port.hidden) {
        port = port.parentModel;
    }

    return port;
}

export function getOutputPort(
    node: ObjectOutputNode | ArrayOutputNode,
    outputField: string
): [InputOutputPortModel, InputOutputPortModel] {
    const portId = `${getTargetPortPrefix(node)}.${outputField}.IN`;
    const port = node.getPort(portId);
    
    if (port) {
        const actualPort = port as InputOutputPortModel;
        let mappedPort = actualPort;

        while (mappedPort && mappedPort.hidden) {
            mappedPort = mappedPort.parentModel;
        }

        return [actualPort, mappedPort];
    }

    return [undefined, undefined];
}

export function getTargetPortPrefix(node: NodeModel): string {
	switch (true) {
		case node instanceof ObjectOutputNode:
			return OBJECT_OUTPUT_TARGET_PORT_PREFIX;
        case node instanceof ArrayOutputNode:
            return ARRAY_OUTPUT_TARGET_PORT_PREFIX;
        // TODO: Update cases for other node types
		default:
			return "";
	}
}
