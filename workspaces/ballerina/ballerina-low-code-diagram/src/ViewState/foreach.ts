import { BlockViewState } from "./block";
import { SimpleBBox } from "./simple-bbox";
import { StatementViewState } from "./statement";

export class ForEachViewState extends StatementViewState {
    public foreachLifeLine: SimpleBBox = new SimpleBBox();
    public foreachHead: SimpleBBox = new SimpleBBox();
    public foreachBody: BlockViewState = new BlockViewState();
    public foreachBodyRect: SimpleBBox = new SimpleBBox();

    constructor() {
        super();
    }
}
