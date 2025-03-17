import Mousetrap from "mousetrap";

export class KeyboardNavigationManager {
    path: string;
    content: string;
    undoStack: Map<string, string[]>;
    redoStack: Map<string, string[]>;
    trap: Mousetrap.MousetrapInstance;
    static instance : KeyboardNavigationManager;

    private constructor() {
        this.undoStack = new Map();
        this.redoStack = new Map();
        this.trap = new Mousetrap();
    }

    public static getClient() {
        if (!this.instance){
            this.instance = new KeyboardNavigationManager();
        }
        return this.instance;
    }

    public bindNewKey(key: string | string[], callbackFunction: (args: any) => void, args?: any) {
        this.trap.bind(key, () => {
            callbackFunction(args);
            return false;
        });
    }

    public resetMouseTrapInstance() {
        this.trap.reset()
    }
}
