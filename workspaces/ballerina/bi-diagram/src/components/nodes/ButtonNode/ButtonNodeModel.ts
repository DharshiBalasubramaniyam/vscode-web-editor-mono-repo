
import { NodeModel } from "@projectstorm/react-diagrams";
import { NodeTypes } from "../../../resources/constants";

// TODO: improve button node model to support button forms other than suggested buttons
export class ButtonNodeModel extends NodeModel {

    constructor() {
        super({
            id: "suggestion-button-node",
            type: NodeTypes.BUTTON_NODE,
            locked: true,
        });
    }

    getHeight(): number {
        return this.height;
    }
}
