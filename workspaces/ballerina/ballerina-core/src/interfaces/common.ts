/* eslint-disable @typescript-eslint/no-explicit-any */

import { STNode } from "@dharshi/syntax-tree";
import { FlowNode } from "./bi";

export declare enum BallerinaComponentTypes {
    REST_API = "restAPI",
    GRAPHQL = "graphql",
    MAIN = "main",
    WEBHOOK = "webhook",
    GRPC_API = "grpcAPI",
    WEBSOCKET_API = "websocketAPI"
}

export enum SubPanelView {
    INLINE_DATA_MAPPER = "inlineDataMapper",
    HELPER_PANEL = "helperPanel",
    ADD_NEW_FORM = "addNewForm",
    UNDEFINED = undefined,
}

export interface DocumentIdentifier {
    uri: string;
}

export interface LineRange {
    fileName?: string;
    startLine: LinePosition;
    endLine: LinePosition;
}

export interface LinePosition {
    line: number;
    offset: number;
}

export interface Range {
    start: Position;
    end: Position;
}

export interface Position {
    line: number;
    character: number;
}

export interface NOT_SUPPORTED_TYPE {

}
export interface FunctionDef {
    syntaxTree: STNode;
    defFilePath: string;
}

export interface SubPanel {
    view: SubPanelView;
    props?: SubPanelViewProps;
}

export interface SubPanelViewProps {
    inlineDataMapper?: InlineDataMapperProps;
    sidePanelData?: SidePanelData;
}

export interface SidePanelData {
    filePath: string;
    range: LineRange;
    editorKey: string;
    configurePanelData?: ConfigurePanelData;
}

export interface ConfigurePanelData {
    isEnable: boolean;
    name?: string;
    documentation?: string;
    value?: string;
}

interface InlineDataMapperProps {
    filePath: string;
    flowNode: FlowNode;
    propertyKey: string;
    editorKey: string;
    position: LinePosition;
}
