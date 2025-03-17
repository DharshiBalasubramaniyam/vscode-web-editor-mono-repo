
import { NodeModel } from "@projectstorm/react-diagrams";
import { NodePortModel } from "../../NodePort";
import { BasePositionModelOptions } from "@projectstorm/react-canvas-core";

export class BaseNodeModel extends NodeModel {
    protected portLeft: NodePortModel;
    protected portRight: NodePortModel;

    constructor(options: BasePositionModelOptions) {
        super(options);
        this.addLeftPort("left");
        this.addRightPort("right");
        this.setLocked(true);
    }

    addPort<T extends NodePortModel>(port: T): T {
        super.addPort(port);
        if (port.getOptions().in) {
            this.portLeft = port;
        } else {
            this.portRight = port;
        }
        return port;
    }

    addLeftPort(label: string): NodePortModel {
        const p = new NodePortModel(true, label);
        return this.addPort(p);
    }

    addRightPort(label: string): NodePortModel {
        const p = new NodePortModel(false, label);
        return this.addPort(p);
    }

    getLeftPort(): NodePortModel {
        return this.portLeft;
    }

    getRightPort(): NodePortModel {
        return this.portRight;
    }

    getHeight(): number {
        return this.height;
    }
}
