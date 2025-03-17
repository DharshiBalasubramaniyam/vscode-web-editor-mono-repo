
import { responseCodes } from '@dharshi/ballerina-core';

export enum HTTP_METHOD {
    "GET" = "GET",
    "PUT" = "PUT",
    "POST" = "POST",
    "DELETE" = "DELETE",
    "PATCH" = "PATCH"
}

export function getDefaultResponse(httpMethod: HTTP_METHOD): number {
    switch (httpMethod.toUpperCase()) {
        case HTTP_METHOD.GET:
            return 200;
        case HTTP_METHOD.PUT:
            return 200;
        case HTTP_METHOD.POST:
            return 201;
        case HTTP_METHOD.DELETE:
            return 200;
        case HTTP_METHOD.PATCH:
            return 200;
        default:
            return 200;
    }
}

export function getTitleFromResponseCode(code: number): string {
    const response = responseCodes.find((response) => response.code === code);
    return response ? response.title : "";
}
