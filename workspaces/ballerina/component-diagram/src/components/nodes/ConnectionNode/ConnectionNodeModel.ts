
import { NodeModel } from "@projectstorm/react-diagrams";
import { NodePortModel } from "../../NodePort";
import { NODE_LOCKED, NodeTypes } from "../../../resources/constants";
import { CDConnection } from "@dharshi/ballerina-core";

export class ConnectionNodeModel extends NodeModel {
    readonly node: CDConnection;
    protected portIn: NodePortModel;
    protected portOut: NodePortModel;

    constructor(node: CDConnection) {
        super({
            id: node.uuid,
            type: NodeTypes.CONNECTION_NODE,
            locked: NODE_LOCKED,
        });
        this.node = node;
        this.addInPort("in");
        this.addOutPort("out");
    }

    addPort<T extends NodePortModel>(port: T): T {
        super.addPort(port);
        if (port.getOptions().in) {
            this.portIn = port;
        } else {
            this.portOut = port;
        }
        return port;
    }

    addInPort(label: string): NodePortModel {
        const p = new NodePortModel(true, label);
        return this.addPort(p);
    }

    addOutPort(label: string): NodePortModel {
        const p = new NodePortModel(false, label);
        return this.addPort(p);
    }

    getInPort(): NodePortModel {
        return this.portIn;
    }

    getOutPort(): NodePortModel {
        return this.portOut;
    }

    getHeight(): number {
        return this.height;
    }
    
    hasLinks(): boolean {
        return Object.keys(this.portIn.getLinks()).length > 0 || Object.keys(this.portOut.getLinks()).length > 0;
    }
}
