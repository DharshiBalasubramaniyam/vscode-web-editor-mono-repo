import { WorkerHighlight } from "../Visitors";

import { SimpleBBox } from "./simple-bbox";

export class ViewState {
    public bBox: SimpleBBox = new SimpleBBox();
    public hidden: boolean = false;
    public hiddenBlock: boolean = false;
    public synced: boolean = false;
    public collapsed: boolean = false;
    public folded: boolean = false;
    public isPathSelected?: boolean;
    public highlightedPaths?: WorkerHighlight[];

    public getHeight(): number {
        return (this.bBox.h + this.bBox.offsetFromBottom + this.bBox.offsetFromTop);
    }
}
