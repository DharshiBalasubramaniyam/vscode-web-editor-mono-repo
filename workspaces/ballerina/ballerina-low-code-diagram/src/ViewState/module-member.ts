import { DefaultConfig } from "../Visitors/default";

import { StatementViewState } from "./statement";

export class ModuleMemberViewState extends StatementViewState {
    public topOffset: number = DefaultConfig.offSet;
    public bottomOffset: number = DefaultConfig.offSet;

    constructor() {
        super();
    }
}
