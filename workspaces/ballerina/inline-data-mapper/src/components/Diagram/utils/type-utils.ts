import { IOType, TypeKind } from "@dharshi/ballerina-core";

export function getTypeName(fieldType: IOType): string {
	if (!fieldType) {
		return '';
	}

    let typeName = fieldType?.typeName || fieldType.kind;

    if (fieldType.kind === TypeKind.Array && fieldType.member) {
		typeName = `${getTypeName(fieldType.member)}[]`;
	}

	return typeName;
}

export function getDMTypeDim(fieldType: IOType) {
    let dim = 0;
    let currentType = fieldType;
    while (currentType.kind === TypeKind.Array) {
        dim++;
        currentType = currentType.member;
    }
    return dim;
}
