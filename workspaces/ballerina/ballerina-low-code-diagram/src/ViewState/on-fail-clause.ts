
import { BlockViewState } from "./block";
import { SimpleBBox } from "./simple-bbox";
import { StatementViewState } from "./statement";


export class OnFailClauseViewState extends StatementViewState {
    public onFailHeadVS: SimpleBBox = new SimpleBBox();
    public onFailBodyVS: BlockViewState = new BlockViewState();
    public onFailBodyLifeLine: SimpleBBox = new SimpleBBox();
}
