import { STOP_SVG_HEIGHT } from "../Components/RenderingComponents/End/StopSVG";
import { START_SVG_HEIGHT } from "../Components/RenderingComponents/Start/StartSVG";
import { DefaultConfig } from "../Visitors/default";

import { BlockViewState } from "./block";
import { PlusViewState } from "./plus";
import { SimpleBBox } from "./simple-bbox";
import { StatementViewState } from "./statement";

export class ServiceViewState extends StatementViewState {
    public plusButtons: PlusViewState[] = [];
    public topOffset: number = START_SVG_HEIGHT / 2 + (2 * DefaultConfig.dotGap) ;
    public bottomOffset: number = STOP_SVG_HEIGHT + (2 * DefaultConfig.dotGap);
    public wrapper: SimpleBBox = new SimpleBBox();
    public serviceBody: BlockViewState = new BlockViewState();
    public serviceBodyRect: SimpleBBox = new SimpleBBox();

    constructor() {
        super();
        this.bBox.w = 300; // todo: make constant
    }
}
