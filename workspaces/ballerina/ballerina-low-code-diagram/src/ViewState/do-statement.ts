import { BlockViewState } from "./block";
import { OnFailClauseViewState } from "./on-fail-clause";
import { SimpleBBox } from "./simple-bbox";
import { StatementViewState } from "./statement";

export class DoStatementViewState extends StatementViewState {
    public doHeadVS: SimpleBBox = new SimpleBBox();
    public doBodyVS: BlockViewState = new BlockViewState();
    public doBodyLifeLine: SimpleBBox = new SimpleBBox();
    public onFailBodyVS: OnFailClauseViewState = new OnFailClauseViewState();
}
