
import { NodePosition, STNode } from "@dharshi/syntax-tree";

export interface StmtActionStackItem {
    oldModel: StackElement,
    newModel: StackElement
}


export interface StackElement {
    model: STNode,
    selectedPosition : NodePosition
}

class StmtActionStack {

    private items : StmtActionStackItem[];

    constructor() {
        this.items = [];
    }

    add(element: StmtActionStackItem) {
        return this.items.push(element);
    }

    remove() {
        if (this.items.length > 0) {
            return this.items.pop();
        }
    }

    peek() {
        return this.items[this.items.length - 1];
    }

    isEmpty(){
       return this.items.length === 0;
    }

    size(){
        return this.items.length;
    }

    clear(){
        this.items = [];
    }
}

// tslint:disable-next-line: max-classes-per-file
export class StmtEditorUndoRedoManager {

    private undoStack: StmtActionStack;
    private redoStack: StmtActionStack;

    constructor() {
        this.undoStack = new StmtActionStack();
        this.redoStack = new StmtActionStack();
    }

    public add(oldModel: StackElement, newModel: StackElement) {
        this.undoStack.add({ oldModel, newModel});
        // Reset redo stack when new actions are performed.
        // Otherwise history will be confusing for the user.
        // We need to fork history from this point to handle it if needed.
        // But it goes beyond the requirement here.
        this.redoStack.clear();
    }

    public getUndoModel() {
        if (!this.undoStack.isEmpty()) {
            const element = this.undoStack.remove();
            this.redoStack.add(element);
            return element;
        }
    }

    public hasUndo() {
        return !this.undoStack.isEmpty();
    }

    public hasRedo() {
        return !this.redoStack.isEmpty();
    }

    public getRedoModel() {
        if (!this.redoStack.isEmpty()) {
            const element = this.redoStack.remove();
            this.undoStack.add(element);
            return element;
        }
    }
}
