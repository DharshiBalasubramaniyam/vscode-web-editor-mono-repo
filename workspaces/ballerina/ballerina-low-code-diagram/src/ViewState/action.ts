import { SimpleBBox } from "./simple-bbox";
import { ViewState } from "./view-state";

export class ActionViewState extends ViewState {
    public endpointName?: string;
    public trigger: SimpleBBox = new SimpleBBox();
    public iconId: string = "default";
    public actionName?: string;
    public resourcePath?: string;

    constructor() {
        super();
    }
}
