import { BlockViewState } from "./block";
import { SimpleBBox } from "./simple-bbox";
import { StatementViewState } from "./statement";

export class WhileViewState extends StatementViewState {
    public whileLifeLine: SimpleBBox = new SimpleBBox();
    public whileHead: SimpleBBox = new SimpleBBox();
    public whileBody: BlockViewState = new BlockViewState();
    public whileBodyRect: SimpleBBox = new SimpleBBox();

    constructor() {
        super();
    }
}
