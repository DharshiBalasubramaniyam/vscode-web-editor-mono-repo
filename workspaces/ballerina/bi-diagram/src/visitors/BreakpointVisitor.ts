
import { FlowNode, CurrentBreakpointsResponse as BreakpointInfo } from "@dharshi/ballerina-core";
import { BaseVisitor } from "./BaseVisitor";


export class BreakpointVisitor implements BaseVisitor {
    private breakpointInfo: BreakpointInfo;
    private skipChildrenVisit = false;

    constructor(breakpoints: BreakpointInfo) {
        this.breakpointInfo = breakpoints;
    }

    private setBreakpointData(node: FlowNode) {
        if (this.breakpointInfo.breakpoints && this.breakpointInfo.breakpoints.length > 0) {
            for (const breakpoint of this.breakpointInfo.breakpoints) {
                if (
                    breakpoint.line === node.codedata?.lineRange?.startLine?.line &&
                    (!breakpoint.column || breakpoint.column === node.codedata?.lineRange?.startLine?.offset)) {
                    node.hasBreakpoint = true;
                    break;
                }
            }

            
        }

        if (this.breakpointInfo?.activeBreakpoint &&
            this.breakpointInfo.activeBreakpoint.line === node.codedata?.lineRange?.startLine?.line &&
            (!this.breakpointInfo.activeBreakpoint.column ||
                this.breakpointInfo.activeBreakpoint.column === node.codedata?.lineRange?.startLine?.offset)) {
            node.isActiveBreakpoint = true;
        }
    }

    skipChildren(): boolean {
        return this.skipChildrenVisit;
    }

    beginVisitNode?(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }

    beginVisitIf?(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }

    beginVisitWhile?(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }

    beginVisitForeach?(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }

    beginVisitErrorHandler(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }

    beginVisitRemoteActionCall?(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }

    beginVisitResourceActionCall?(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }

    beginVisitReturn?(node: FlowNode, parent?: FlowNode): void {
        this.setBreakpointData(node);
    }
}
