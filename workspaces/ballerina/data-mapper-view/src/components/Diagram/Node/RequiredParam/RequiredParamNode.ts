import { Point } from "@projectstorm/geometry";
import { PrimitiveBalType, TypeField } from "@dharshi/ballerina-core";
import { RequiredParam } from "@dharshi/syntax-tree";

import { useDMSearchStore } from "../../../../store/store";
import { IDataMapperContext } from "../../../../utils/DataMapperContext/DataMapperContext";
import { getSearchFilteredInput, getTypeOfInputParam } from "../../utils/dm-utils";
import { DataMapperNodeModel, TypeDescriptor } from "../commons/DataMapperNode";

export const REQ_PARAM_NODE_TYPE = "datamapper-node-required-param";
const NODE_ID = "required-param-node";

export class RequiredParamNode extends DataMapperNodeModel {
    public typeDef: TypeField;
    public x: number;
    public numberOfFields:  number;
    originalTypeDef: TypeField;

    constructor(
        public context: IDataMapperContext,
        public value: RequiredParam,
        public typeDesc: TypeDescriptor,
        public hasNoMatchingFields?: boolean
    ) {
        super(
            `${NODE_ID}${!hasNoMatchingFields && value.paramName.value}`,
            context,
            REQ_PARAM_NODE_TYPE
        );
        this.numberOfFields = 1;
        if (!hasNoMatchingFields) {
            this.originalTypeDef = this.value ? getTypeOfInputParam(this.value, this.context.ballerinaVersion) : undefined;
            this.typeDef = this.originalTypeDef;
        }
    }

    async initPorts() {
        this.numberOfFields = 1;
        this.typeDef = this.getSearchFilteredType();
        this.hasNoMatchingFields = !this.typeDef;
        if (this.typeDef) {
            const parentPort = this.addPortsForHeaderField(this.typeDef, this.value.paramName.value, "OUT", undefined, this.context.collapsedFields);

            if (this.typeDef.typeName === PrimitiveBalType.Record) {
                const fields = this.typeDef.fields;
                fields.forEach((subField) => {
                    this.numberOfFields += this.addPortsForInputRecordField(subField, "OUT", this.value.paramName.value, '',
                        parentPort, this.context.collapsedFields, parentPort.collapsed);
                });
            } else {
                this.addPortsForInputRecordField(this.typeDef, "OUT", this.value.paramName.value,
                    '', parentPort, this.context.collapsedFields, parentPort.collapsed);
            }
        }
    }

    public getSearchFilteredType() {
        if (this.value) {
            const searchValue = useDMSearchStore.getState().inputSearch;

            const matchesParamName = this.value?.paramName?.value?.toLowerCase()?.includes(searchValue?.toLowerCase());
            const type = matchesParamName
                ? this.originalTypeDef
                : getSearchFilteredInput(this.originalTypeDef,  this.value?.paramName?.value);
            return type;
        }
    }

    async initLinks() {
        // Currently we create links from "IN" ports and back tracing the inputs.
    }

    setPosition(point: Point): void;
    setPosition(x: number, y: number): void;
    setPosition(x: unknown, y?: unknown): void {
        if (typeof x === 'number' && typeof y === 'number'){
            if (!this.x){
                this.x = x;
            }
            super.setPosition(this.x, y);
        }
    }
}
