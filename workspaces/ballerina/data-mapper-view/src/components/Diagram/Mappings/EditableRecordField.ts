import { TypeField } from "@dharshi/ballerina-core";
import { STNode } from "@dharshi/syntax-tree";

export interface ArrayElement {
	member: EditableRecordField;
	elementNode: STNode;
}

export class EditableRecordField {
	constructor(
		public type: TypeField,
		public value?: STNode,
		public parentType?: EditableRecordField,
		public originalType?: TypeField,
		public childrenTypes?: EditableRecordField[],
		public elements?: ArrayElement[]
	){}

	public hasValue() {
		return !!this.value;
	}
}
