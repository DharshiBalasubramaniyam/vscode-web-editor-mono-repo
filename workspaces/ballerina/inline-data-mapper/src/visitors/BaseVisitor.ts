
import { IDMModel, IOType, Mapping } from "@dharshi/ballerina-core";

export interface BaseVisitor {
    beginVisit?(node: IDMModel, parent?: IDMModel): void;
    endVisit?(node: IDMModel, parent?: IDMModel): void;
    
    beginVisitInputType?(node: IOType, parent?: IDMModel): void;
    endVisitInputType?(node: IOType, parent?: IDMModel): void;

    beginVisitOutputType?(node: IOType, parent?: IDMModel): void;
    endVisitOutputType?(node: IOType, parent?: IDMModel): void;

    beginVisitMapping?(node: Mapping, parentMapping: Mapping, parentModel?: IDMModel): void;
    endVisitMapping?(node: Mapping, parentMapping: Mapping, parentModel?: IDMModel): void;
}
