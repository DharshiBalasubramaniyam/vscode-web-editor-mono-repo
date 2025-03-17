
import { NODE_WIDTH, NodeTypes } from "../../../resources/constants";
import { BaseNodeModel } from "../BaseNode";

export class LifeLineNodeModel extends BaseNodeModel {
    constructor(id: string, height = NODE_WIDTH) {
        super({
            id,
            type: NodeTypes.LIFE_LINE_NODE,
        });
        this.width = NODE_WIDTH;
        this.height = height;
    }
}
