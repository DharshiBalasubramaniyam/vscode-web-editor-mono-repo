import { LinePosition } from "@dharshi/ballerina-core";
import {
    FunctionCall,
    STKindChecker,
    Visitor
} from "@dharshi/syntax-tree";

export interface FunctionCallInfo {
    fnPosition: LinePosition;
    fnName: string;
}

export class FunctionCallFindingVisitor implements Visitor {
    private readonly fnCalls: FunctionCallInfo[];

    constructor() {
        this.fnCalls = [];
    }

    public beginVisitFunctionCall(node: FunctionCall) {
        this.fnCalls.push({
            fnPosition: {
                line: node.position.startLine,
                offset: node.position.startColumn
            },
            fnName: STKindChecker.isSimpleNameReference(node.functionName)
                ? node.functionName.name.value
                : node.functionName.identifier.value
        });
    }

    public getFunctionCallPositions(){
        return this.fnCalls.map(fnCall => fnCall.fnPosition);
    }

    public getFunctionCalls(){
        return this.fnCalls;
    }
}
