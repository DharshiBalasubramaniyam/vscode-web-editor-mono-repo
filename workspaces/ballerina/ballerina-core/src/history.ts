import { VisualizerLocation } from "./state-machine-types";

export interface HistoryEntry {
    location: VisualizerLocation;
    uid?: string;
    dataMapperDepth?: number;
}

export class History {
    private historyStack: HistoryEntry[] = [];

    public get(): HistoryEntry[] {
        return [...this.historyStack];
    }

    public push(item: HistoryEntry): void {
        this.historyStack.push(item);
    }
    
    public pop(): void {
        this.historyStack.pop();
    }
    
    public select(index: number): void {
        if (index < 0 || index >= this.historyStack.length) return;
        this.historyStack = this.historyStack.slice(0, index + 1);
    }
    
    public clear(): void {
        this.historyStack = [];
    }
    
    public clearAndPopulateWith(historyEntry: HistoryEntry): void {
        this.historyStack = [historyEntry];
    }
    
    public updateCurrentEntry(historyEntry: HistoryEntry): void {
        if (this.historyStack.length === 0) return;
        const newHistory = [...this.historyStack];
        newHistory[newHistory.length - 1] = historyEntry;
        this.historyStack = newHistory;
    }
}
