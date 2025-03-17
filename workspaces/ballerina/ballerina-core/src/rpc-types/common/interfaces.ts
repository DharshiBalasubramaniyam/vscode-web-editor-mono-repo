/* eslint-disable @typescript-eslint/no-explicit-any */

import { Diagnostic } from "vscode-languageserver-types";
import { Completion } from "../../interfaces/extended-lang-client";
import { NodePosition } from "@dharshi/syntax-tree";

export interface TypeResponse {
    data: Completion[];
}

export interface GoToSourceRequest {
    position: NodePosition;
    filePath?: string
}

export interface WorkspaceFileRequest {
    glob?: string;
}

export interface File {
    relativePath: string;
    path: string;
}

export interface WorkspaceRootResponse {
    path: string;
}

export interface WorkspacesFileResponse {
    workspaceRoot: string;
    files: File[];
}
export interface BallerinaDiagnosticsRequest {
    ballerinaSource: string;
    targetPosition: NodePosition;
    skipSemiColon?: boolean;
    checkSeverity?: 1 | 2 | 3
}
export interface BallerinaDiagnosticsResponse {
    diagnostics: Diagnostic[];
}

export interface CommandsRequest {
    commands: any[];
}

export interface RunExternalCommandRequest {
    command: string;
}

export interface OpenExternalUrlRequest {
    url: string;
}

export interface RunExternalCommandResponse {
    error: boolean,
    message: string
}


export interface CommandsResponse {
    data: string;
}

export interface FileOrDirResponse {
    path: string;
}
export interface FileOrDirRequest {
    isFile?: boolean;
}
