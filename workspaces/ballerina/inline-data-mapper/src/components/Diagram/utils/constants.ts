export const OBJECT_OUTPUT_TARGET_PORT_PREFIX = "objectOutput";
export const ARRAY_OUTPUT_TARGET_PORT_PREFIX = "arrayOutput";

export const defaultModelOptions = { zoom: 90 };
export const VISUALIZER_PADDING = 0;
export const DATA_MAPPER_PANEL_WIDTH = 800;
export const IO_NODE_DEFAULT_WIDTH = 350;
export const IO_NODE_HEADER_HEIGHT = 40;
export const IO_NODE_FIELD_HEIGHT = 35;
export const GAP_BETWEEN_INPUT_NODES = 10;
export const GAP_BETWEEN_FILTER_NODE_AND_INPUT_NODE = 50;
export const GAP_BETWEEN_NODE_HEADER_AND_BODY = 10;
export const GAP_BETWEEN_FIELDS = 1;

export const ISSUES_URL = "https://github.com/wso2/ballerina-plugin-vscode/issues";

export const OFFSETS = {
    SOURCE_NODE: {
        X: 1,
        Y: 0,
    },
    TARGET_NODE: {
        X: DATA_MAPPER_PANEL_WIDTH*(100/defaultModelOptions.zoom)-IO_NODE_DEFAULT_WIDTH,
        Y: 0
    },
    TARGET_NODE_WITHOUT_MAPPING: {
        X: 650,
    },
    LINK_CONNECTOR_NODE: {
        X: 750
    },
    LINK_CONNECTOR_NODE_WITH_ERROR: {
        X: 718
    },
    INTERMEDIATE_CLAUSE_HEIGHT: 80
}
