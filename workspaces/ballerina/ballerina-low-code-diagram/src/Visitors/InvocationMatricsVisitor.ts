import { RemoteMethodCallAction, STNode, Visitor } from '@dharshi/syntax-tree'
export class InvocationMetricsVisitor implements Visitor {
    public invocations: STNode[] = [];

    beginVisitRemoteMethodCallAction(node: RemoteMethodCallAction) {
        this.invocations.push(node);
    }

    public getMetricsNode() {
        return this.invocations.find((node) => ((node as any).metrics !== undefined));
    }
}
