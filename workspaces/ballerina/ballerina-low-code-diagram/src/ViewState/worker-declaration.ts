import { OnFailClause } from "@dharshi/syntax-tree";

import { STOP_SVG_HEIGHT } from "../Components/RenderingComponents/End/StopSVG";
import { START_SVG_HEIGHT } from "../Components/RenderingComponents/Start/StartSVG";
import { DefaultConfig } from "../Visitors/default";

import { BlockViewState } from "./block";
import { EndViewState } from "./end";
import { PlusViewState } from "./plus";
import { SimpleBBox } from "./simple-bbox";
import { ViewState } from "./view-state";

export class WorkerDeclarationViewState extends ViewState {
    public topOffset: number = START_SVG_HEIGHT / 2 ;
    public bottomOffset: number = STOP_SVG_HEIGHT + (2 * DefaultConfig.dotGap);
    public lifeLine: SimpleBBox = new SimpleBBox();
    public wrapper: SimpleBBox = new SimpleBBox();
    public trigger: SimpleBBox = new SimpleBBox();
    public workerLine: SimpleBBox = new SimpleBBox();
    public workerBody: BlockViewState = new BlockViewState();
    public end: EndViewState = new EndViewState();
    public initPlus: PlusViewState = undefined;
    public onFail: OnFailClause = undefined;

    constructor() {
        super();
    }
}
