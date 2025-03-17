import {
    AddArrayElementRequest,
    InlineDataMapperModelRequest,
    InlineDataMapperModelResponse,
    InlineDataMapperSourceRequest,
    InlineDataMapperSourceResponse,
    VisualizableFieldsRequest,
    VisualizableFieldsResponse
} from "../../interfaces/extended-lang-client";

export interface InlineDataMapperAPI {
    getDataMapperModel: (params: InlineDataMapperModelRequest) => Promise<InlineDataMapperModelResponse>;
    getDataMapperSource: (params: InlineDataMapperSourceRequest) => Promise<InlineDataMapperSourceResponse>;
    getVisualizableFields: (params: VisualizableFieldsRequest) => Promise<VisualizableFieldsResponse>;
    addNewArrayElement: (params: AddArrayElementRequest) => Promise<InlineDataMapperSourceResponse>;
}
