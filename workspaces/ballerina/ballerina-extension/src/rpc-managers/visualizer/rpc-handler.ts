import {
    HistoryEntry,
    OpenViewRequest,
    UpdateUndoRedoMangerRequest,
    addToHistory,
    addToUndoStack,
    getHistory,
    goBack,
    goHome,
    goSelected,
    openView,
    redo,
    undo,
    updateUndoRedoManager
} from "@dharshi/ballerina-core";
import { Messenger } from "vscode-messenger";
import { VisualizerRpcManager } from "./rpc-manager";

export function registerVisualizerRpcHandlers(messenger: Messenger) {
    const rpcManger = new VisualizerRpcManager();
    messenger.onNotification(openView, (args: OpenViewRequest) => rpcManger.openView(args));
    messenger.onRequest(getHistory, () => rpcManger.getHistory());
    messenger.onNotification(addToHistory, (args: HistoryEntry) => rpcManger.addToHistory(args));
    messenger.onNotification(goBack, () => rpcManger.goBack());
    messenger.onNotification(goHome, () => rpcManger.goHome());
    messenger.onNotification(goSelected, (args: number) => rpcManger.goSelected(args));
    messenger.onRequest(undo, () => rpcManger.undo());
    messenger.onRequest(redo, () => rpcManger.redo());
    messenger.onNotification(addToUndoStack, (args: string) => rpcManger.addToUndoStack(args));
    messenger.onNotification(updateUndoRedoManager, (args: UpdateUndoRedoMangerRequest) => rpcManger.updateUndoRedoManager(args));
}
