import { RemoteMethodCallAction, STNode, Visitor } from "@dharshi/syntax-tree";

export class ActionInvocationFinder implements Visitor {
    // TODO: use the correct type once the syntax-tree types are updated
    public action: any = undefined;
    constructor() {
        this.action = undefined;
    }

    public beginVisitRemoteMethodCallAction(node: RemoteMethodCallAction) {
        this.action = node;
    }

    public beginVisitClientResourceAccessAction(node: STNode) {
        this.action = node;
    }

    public getIsAction(): RemoteMethodCallAction {
        return this.action;
    }
}
