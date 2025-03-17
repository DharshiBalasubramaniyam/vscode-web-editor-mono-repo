import { Diagnostic, NodePosition } from "@dharshi/syntax-tree";

export enum ModelType {
    EXPRESSION,
    OPERATOR,
    BINDING_PATTERN,
    TYPE_DESCRIPTOR,
    QUERY_CLAUSE,
    METHOD_CALL,
    FIELD_ACCESS,
    QUERY_EXPRESSION,
    FUNCTION,
    ORDER_KEY,
    ORDER_DIRECTION_KEYWORDS,
    SPECIFIC_FIELD_NAME
}

export class StatementEditorViewState {
    public exprNotDeletable: boolean = false;
    public templateExprDeletable: boolean = false;
    public isWithinBlockStatement: boolean = false;
    public isWithinWhereClause: boolean = false;
    public modelType: ModelType = ModelType.EXPRESSION;
    public diagnosticsInRange?: Diagnostic[] = [];
    public diagnosticsInPosition?: Diagnostic[] = [];
    public multilineConstructConfig: MultilineConstructConfig = {
        isFieldWithNewLine: false,
        isClosingBraceWithNewLine: false
    };
    public parentFunctionPos: NodePosition = null;
}

interface MultilineConstructConfig {
    isFieldWithNewLine?: boolean;
    isClosingBraceWithNewLine?: boolean;
}
