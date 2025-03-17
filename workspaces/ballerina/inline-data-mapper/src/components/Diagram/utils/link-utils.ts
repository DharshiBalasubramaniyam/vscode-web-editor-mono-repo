import { PortModel } from "@projectstorm/react-diagrams-core";
import { TypeKind } from "@dharshi/ballerina-core";

import { InputOutputPortModel } from "../Port";

export function isSourcePortArray(port: PortModel): boolean {
    if (port instanceof InputOutputPortModel) {
        const field = port.field;
        return field.kind === TypeKind.Array;
    }
    return false;
}

export function isTargetPortArray(port: PortModel): boolean {
    if (port instanceof InputOutputPortModel) {
        const field = port.field;
        return field.kind === TypeKind.Array;
    }
    return false;
}
