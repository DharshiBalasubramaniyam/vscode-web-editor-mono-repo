import { FunctionDefinition } from "@dharshi/syntax-tree";

import { ActionViewState } from "./action";
import { EndpointViewState } from "./endpoint";
import { SimpleBBox } from "./simple-bbox";
import { ViewState } from "./view-state";

export class StatementViewState extends ViewState {
    public isCallerAction: boolean = false;
    public isAction: boolean = false;
    public isEndpoint: boolean = false;
    public endpoint: EndpointViewState = new EndpointViewState();
    public dataProcess: SimpleBBox = new SimpleBBox();
    public variableName: SimpleBBox = new SimpleBBox();
    public variableAssignment: SimpleBBox = new SimpleBBox();
    public conditionAssignment: SimpleBBox = new SimpleBBox();
    public action: ActionViewState = new ActionViewState();
    public isReached: boolean;
    public isReceive: boolean;
    public isSend: boolean;
    public arrowFrom: 'Left' | 'Right';
    public functionNodeExpanded: boolean;
    public functionNode: FunctionDefinition;
    public parentAction?: boolean;
    public expandOffSet?: number = 0;

    constructor() {
        super();
        this.isAction = false;
        this.isEndpoint = false;
    }

}
