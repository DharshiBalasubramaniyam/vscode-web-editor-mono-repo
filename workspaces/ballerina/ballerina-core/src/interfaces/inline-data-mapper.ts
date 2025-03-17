
export enum TypeKind {
    Record = "record",
    Array = "array",
    String = "string",
    Int = "int",
    Float = "float",
    Decimal = "decimal",
    Boolean = "boolean",
    Unknown = "unknown"
}

export enum InputCategory {
    Const = "const",
    ModuleVariable = "moduleVariable",
    Configurable = "configurable"
}

export interface IDMDiagnostic {
    kind: string;
    message: string;
    range: {
        start: {
            line: number;
            character: number;
        };
        end: {
            line: number;
            character: number;
        };
    };
}

export interface IOType {
    id: string;
    category?: InputCategory;
    kind?: TypeKind;
    typeName?: string;
    variableName?: string;
    fields?: IOType[];
    member?: IOType;
    defaultValue?: unknown;
    optional?: boolean;
}

export interface Mapping {
    output: string,
    inputs: string[];
    expression: string;
    elements?: MappingElement[];
    diagnostics?: IDMDiagnostic[];
    isComplex?: boolean;
    isFunctionCall?: boolean;
}

export interface IDMModel {
    inputs: IOType[];
    output: IOType;
    mappings: Mapping[];
    source: string;
    view: string;
}

export interface MappingElement {
    mappings: Mapping[];
}
