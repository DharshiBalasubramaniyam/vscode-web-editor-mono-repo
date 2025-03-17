
import { NodeTypes } from "../../../resources/constants";
import { BaseNodeModel } from "../BaseNode";

export class PointNodeModel extends BaseNodeModel {
    protected visible: boolean;

    constructor(id: string, visible = true) {
        super({
            id,
            type: NodeTypes.POINT_NODE,
        });
        this.visible = visible;
    }

    isVisible(): boolean {
        return this.visible;
    }
}
