import { SimpleBBox } from "./simple-bbox";
import { ViewState } from "./view-state";

export class EndpointViewState extends ViewState {
    public visible: boolean = false;
    public isUsed: boolean = false;
    public isExternal: boolean = false;
    public isParameter: boolean = false;
    public epName?: string;
    public start: SimpleBBox = new SimpleBBox();
    public lifeLine: SimpleBBox = new SimpleBBox();
    public actionExecution: SimpleBBox = new SimpleBBox();
    public client: SimpleBBox = new SimpleBBox();
    public iconId: string = "default";
    public typeName: string;
    public expandConnectorHeight?: number = 0;

    constructor() {
        super();
        this.visible = true;
        this.isUsed = false;
    }
}
