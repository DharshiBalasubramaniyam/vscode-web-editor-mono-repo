import { NodePosition } from "@dharshi/syntax-tree";

import { ViewState } from "./view-state";

export class CollapseViewState extends ViewState {
    public collapsed: boolean = true;
    public range: NodePosition;
    constructor() {
        super();
        this.bBox = undefined;
    }
}
