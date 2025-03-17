
import {
    AddArrayElementRequest,
    InlineDataMapperModelRequest,
    InlineDataMapperModelResponse,
    InlineDataMapperSourceRequest,
    InlineDataMapperSourceResponse,
    VisualizableFieldsRequest,
    VisualizableFieldsResponse
} from "../../interfaces/extended-lang-client";
import { RequestType } from "vscode-messenger-common";

const _preFix = "inline-data-mapper";
export const getDataMapperModel: RequestType<InlineDataMapperModelRequest, InlineDataMapperModelResponse> = { method: `${_preFix}/getDataMapperModel` };
export const getDataMapperSource: RequestType<InlineDataMapperSourceRequest, InlineDataMapperSourceResponse> = { method: `${_preFix}/getDataMapperSource` };
export const getVisualizableFields: RequestType<VisualizableFieldsRequest, VisualizableFieldsResponse> = { method: `${_preFix}/getVisualizableFields` };
export const addNewArrayElement: RequestType<AddArrayElementRequest, InlineDataMapperSourceResponse> = { method: `${_preFix}/addNewArrayElement` };
