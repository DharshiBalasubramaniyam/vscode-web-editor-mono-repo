import { BlockViewState } from "./block";
import { SimpleBBox } from "./simple-bbox";

export class ElseViewState extends BlockViewState {

    public ifHeadWidthOffset: number = 0;
    public ifHeadHeightOffset: number = 0;
    public widthDiffOfIfBody: number = 0;
    public elseTopHorizontalLine: SimpleBBox = undefined;
    public elseBottomHorizontalLine: SimpleBBox = undefined;
    public elseBody: SimpleBBox = undefined;
    constructor() {
        super();
        this.elseBody = new SimpleBBox();
        this.elseBottomHorizontalLine = new SimpleBBox();
        this.elseTopHorizontalLine = new SimpleBBox();
    }
}
