
import { EVENT_TYPE, VisualizerLocation } from "../../state-machine-types";

export interface UpdateUndoRedoMangerRequest {
    filePath: string;
    fileContent: string;
}

export interface OpenViewRequest {
    type: EVENT_TYPE;
    location: VisualizerLocation;
    isPopup?: boolean;
}

export interface GetWorkspaceContextResponse {
    context: string[];
}
