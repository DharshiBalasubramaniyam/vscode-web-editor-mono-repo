
import { HistoryEntry } from "../../history";
import { OpenViewRequest, UpdateUndoRedoMangerRequest } from "./interfaces";
import { NotificationType, RequestType } from "vscode-messenger-common";

const _preFix = "visualizer";
export const openView: NotificationType<OpenViewRequest> = { method: `${_preFix}/openView` };
export const getHistory: NotificationType<void> = { method: `${_preFix}/getHistory` };
export const addToHistory: NotificationType<HistoryEntry> = { method: `${_preFix}/addToHistory` };
export const goBack: NotificationType<void> = { method: `${_preFix}/goBack` };
export const goHome: NotificationType<void> = { method: `${_preFix}/goHome` };
export const goSelected: NotificationType<number> = { method: `${_preFix}/goSelected` };
export const undo: RequestType<void, string> = { method: `${_preFix}/undo` };
export const redo: RequestType<void, string> = { method: `${_preFix}/redo` };
export const addToUndoStack: NotificationType<string> = { method: `${_preFix}/addToUndoStack` };
export const updateUndoRedoManager: NotificationType<UpdateUndoRedoMangerRequest> = { method: `${_preFix}/updateUndoRedoManager` };
