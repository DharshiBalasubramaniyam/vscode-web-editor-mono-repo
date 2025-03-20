import { ListConstructor, STKindChecker, Visitor } from "@dharshi/syntax-tree";

import { DataMapperViewState } from "../../../utils/data-mapper-view-state";

export class ViewStateSetupVisitor implements Visitor {

    public beginVisitListConstructor(node: ListConstructor) {
        node.expressions.forEach((expr) => {
            if (!STKindChecker.isCommaToken(expr) && !expr.dataMapperViewState) {
                expr.dataMapperViewState = new DataMapperViewState();
            }
        });
    }
}
