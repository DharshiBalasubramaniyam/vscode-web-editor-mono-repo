import {
    HistoryEntry,
    UpdateUndoRedoMangerRequest,
    VisualizerAPI,
    OpenViewRequest,
    MACHINE_VIEW,
    PopupVisualizerLocation,
    VisualizerLocation,
    EVENT_TYPE
} from "@dharshi/ballerina-core";
// import { openPopupView } from "../../stateMachinePopup";
import { openView, history, updateView, undoRedoManager } from "../../activators/visualizer/activateVisualizer";

export class VisualizerRpcManager implements VisualizerAPI {

    openView(params: OpenViewRequest): Promise<void> {
        return new Promise(async (resolve) => {
            // if (params.isPopup) {
            //     const view = params.location.view;
            //     if (view && view === MACHINE_VIEW.Overview) {
            //         openPopupView(EVENT_TYPE.CLOSE_VIEW, params.location as PopupVisualizerLocation);
            //     } else {
            //         openPopupView(params.type, params.location as PopupVisualizerLocation);
            //     }
            // } else {
                openView(params.location as VisualizerLocation);
            // }
        });
    }

    goBack(): void {
        history.pop();
        updateView();
    }

    async getHistory(): Promise<HistoryEntry[]> {
        return history.get();
    }

    goHome(): void {
        history.clear();
        updateView();
    }

    goSelected(index: number): void {
        history.select(index);
        updateView();
    }

    addToHistory(entry: HistoryEntry): void {
        history.push(entry);
        updateView();
    }

    async undo(): Promise<string> {
        return undoRedoManager.undo();
    }

    async redo(): Promise<string> {
        return undoRedoManager.redo();
    }

    addToUndoStack(source: string): void {
        undoRedoManager.addModification(source);
    }

    updateUndoRedoManager(params: UpdateUndoRedoMangerRequest): void {
        undoRedoManager.updateContent(params.filePath, params.fileContent);
    }
}
