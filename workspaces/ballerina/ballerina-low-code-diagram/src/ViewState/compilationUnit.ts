import { PlusViewState } from ".";
import { SimpleBBox } from "./simple-bbox";
import { ViewState } from "./view-state";

export class CompilationUnitViewState extends ViewState {
    public plusButtons: PlusViewState[] = [];
    public trigger: SimpleBBox = new SimpleBBox();
    public initPlus: PlusViewState = undefined; // TODO: Remove
    constructor() {
        super();
    }
}
