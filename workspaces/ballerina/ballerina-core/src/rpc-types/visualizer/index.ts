
import { HistoryEntry } from "../../history";
import { OpenViewRequest, UpdateUndoRedoMangerRequest } from "./interfaces";

export interface VisualizerAPI {
    openView: (params: OpenViewRequest) => void;
    getHistory: () => Promise<HistoryEntry[]>;
    addToHistory: (entry: HistoryEntry) => void;
    goBack: () => void;
    goHome: () => void;
    goSelected: (index: number) => void;
    undo: () => Promise<string>;
    redo: () => Promise<string>;
    addToUndoStack: (source: string) => void;
    updateUndoRedoManager: (params: UpdateUndoRedoMangerRequest) => void;
}
