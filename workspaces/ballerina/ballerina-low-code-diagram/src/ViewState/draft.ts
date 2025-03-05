import { BallerinaConnectorInfo } from "@dharshi/ballerina-core";
import { LocalVarDecl, NodePosition } from "@dharshi/syntax-tree";

import { StatementViewState } from ".";

export class DraftStatementViewState extends StatementViewState {

    public type: string;
    public subType: string;
    public connector?: BallerinaConnectorInfo;
    public targetPosition: NodePosition;
    public selectedConnector?: LocalVarDecl;

    constructor() {
        super();
    }
}
