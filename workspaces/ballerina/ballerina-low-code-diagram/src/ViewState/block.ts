import { CollapseViewState } from "./collapse";
import { ControlFlowState } from './controlflow';
import { DraftStatementViewState } from "./draft";
import { PlusViewState } from "./plus";
import { SimpleBBox } from "./simple-bbox";
import { ViewState } from "./view-state";
export class BlockViewState extends ViewState {
    public plusButtons: PlusViewState[] = [];
    public connectors = new Map();
    /**
     * @deprecated This property will be removed with the new fold logic implementation
     */
    public collapseView: CollapseViewState = undefined; // TODO: Remove this property

    /**
     * @deprecated This property will be removed with the new fold logic implementation
     */
    public collapsedFrom: number = 0; // TODO: Remove this property


    public collapsedViewStates: CollapseViewState[] = [];
    public isEndComponentAvailable = false;
    public isEndComponentInMain = false;
    public draft: [number, DraftStatementViewState] = undefined;
    public isElseBlock: boolean = false;
    public isDoBlock: boolean = false;
    public isOnErrorBlock: boolean = false;
    public controlFlow = new ControlFlowState();
    public isResource: boolean = false;
    public isCallerAvailable: boolean = false;
    public hasWorkerDecl: boolean = false;
    public workerArrows: SimpleBBox[] = [];
    public workerIndicatorLine: SimpleBBox = new SimpleBBox();
    public functionNodeFilePath?: string = undefined;
    public functionNodeSource?: string = undefined;
    public parentBlock?: any = undefined;
    public expandOffSet?: number = 0;
    public expandConnectorHeight?: number = 0;
    public containsAction?: boolean = false;

    constructor() {
        super();
    }
}
