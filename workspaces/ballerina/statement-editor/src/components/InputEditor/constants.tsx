
export const completionEditorTypeKinds : number[] = [
    // Type
    11,
    // Union
    25,
    // Record
    22,
    // Module
    9,
    // Class
    8
]

export const FILE_SCHEME = "file://";
export const EXPR_SCHEME = "expr://";

export const INPUT_EDITOR_PLACEHOLDERS = new Map<string, string>([
    ['EXPRESSION', '<add-expression>'],
    ['FUNCTION_CALL', '<add-function>'],
    ['STATEMENT', '<add-statement>'],
    ['TYPE_DESCRIPTOR', '<add-type>'],
    ['FIELD_NAME', '<add-field-name>'],
    ['CONF_NAME', '<add-config-name>'],
    ['DEFAULT_INTERMEDIATE_CLAUSE', '<add-intermediate-clause>'],
    ['BINDING_PATTERN', '<add-binding-pattern>'],
    ['VAR_NAME', '<add-variable-name>'],
    ['ACCESS_MODIFIER', '<add-access-modifier>'],
    ['PARAMETER', '<add-param>']
]);
