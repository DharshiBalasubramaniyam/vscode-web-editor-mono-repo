
import { NodeTypes } from "../../../resources/constants";
import { BaseNodeModel } from "../BaseNode";

export class EmptyNodeModel extends BaseNodeModel {
    protected visible: boolean;

    constructor(id: string, visible = true) {
        super({
            id,
            type: NodeTypes.EMPTY_NODE,
        });
        this.visible = visible;
    }

    isVisible(): boolean {
        return this.visible;
    }
}
