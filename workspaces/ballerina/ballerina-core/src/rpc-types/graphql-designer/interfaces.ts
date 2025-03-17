/* eslint-disable @typescript-eslint/no-explicit-any */

import { LinePosition } from "../../interfaces/common";


export interface GraphqlModelRequest {
    filePath: string;
    startLine: LinePosition;
    endLine: LinePosition;
}
export interface GraphqlModelResponse {
    graphqlDesignModel: any;
    isIncompleteModel: boolean;
    errorMsg: string;
}
