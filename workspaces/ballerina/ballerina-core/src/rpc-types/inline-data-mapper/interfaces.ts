
import { TypeKind } from "../../interfaces/inline-data-mapper";

export interface IDMType {
    category: string;
    kind: TypeKind;
    typeName?: string;
    fieldName?: string;
    memberType?: IDMType;
    defaultValue?: unknown;
    optional?: boolean;
    fields?: IDMType[];
}
