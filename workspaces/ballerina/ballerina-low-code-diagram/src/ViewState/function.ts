import { NodePosition, OnFailClause } from "@dharshi/syntax-tree";

import { STOP_SVG_HEIGHT } from "../Components/RenderingComponents/End/StopSVG";
import { START_SVG_HEIGHT } from "../Components/RenderingComponents/Start/StartSVG";
import { DefaultConfig } from "../Visitors/default";

import { BlockViewState } from "./block";
import { EndViewState } from "./end";
import { PlusViewState } from "./plus";
import { SimpleBBox } from "./simple-bbox";
import { TriggerParamsViewState } from "./triggerParams";
import { ViewState } from "./view-state";

export class FunctionViewState extends ViewState {
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
    public precedingPlus: PlusViewState = undefined;
    public triggerParams: TriggerParamsViewState = new TriggerParamsViewState();
    public isResource: boolean = false;
    public functionNodeFilePath?: string = undefined;
    public functionNodeSource?: string = undefined;
    public parentBlock?: any = undefined;
    public parentConnectors?: any = undefined;
    public parentNamePlaceHolder?: string = undefined;
    public parentPosition?: NodePosition = undefined;
    constructor() {
        super();
    }
}
