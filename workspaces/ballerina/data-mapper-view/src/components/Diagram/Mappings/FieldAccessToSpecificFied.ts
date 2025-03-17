import { FieldAccess, OptionalFieldAccess, SimpleNameReference, STNode } from "@dharshi/syntax-tree";

export class FieldAccessToSpecificFied {
	constructor(
		public fields: STNode[],
		public value: FieldAccess | OptionalFieldAccess | SimpleNameReference,
		public otherVal?: STNode
	){}
}
