import { ErrorCode } from "@dharshi/ballerina-core";

export const UNAUTHORIZED: ErrorCode = {
    code: 1,
    message: "You need to be logged in to use WSO2 Copilot Features. Please login and try again."
};

export const TIMEOUT: ErrorCode = {
    code: 2,
    message: "Request timeout exceeded. Please try again"
};

export const PARSING_ERROR: ErrorCode = {
    code: 3,
    message: "An unknown error occurred while generating code. Try login again to copilot"
};

export const UNKNOWN_ERROR: ErrorCode = {
    code: 4,
    message: "An unknown error occurred while generating code. Try login again to copilot"
};

export const MODIFIYING_ERROR: ErrorCode = {
    code: 5,
    message: "An unknown error occurred while generating mappings. Please try again"
};

export const USER_ABORTED: ErrorCode = {
    code: 6,
    message: "The user has aborted the process."
};

export const ENDPOINT_REMOVED: ErrorCode = {
    code: 7,
    message: "Ballerina plugin is outdated. Please update the Ballerina VSCode Plugin."
};

export const INVALID_PARAMETER_TYPE: ErrorCode = {
    code: 8,
    message: "AI data mapper only supports records as input and outputs."
};

export const INVALID_PARAMETER_TYPE_MULTIPLE_ARRAY: ErrorCode = {
    code: 9,
    message: "AI data mapper only supports mappings between single input and output arrays."
};

export const INVALID_TYPE_CONVERSION: ErrorCode = {
    code: 10,
    message: "Invalid type conversion. Cannot convert between incompatible types."
};
