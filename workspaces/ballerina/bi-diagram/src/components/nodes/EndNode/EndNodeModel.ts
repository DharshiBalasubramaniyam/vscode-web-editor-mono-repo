
import { NodeModel } from "@projectstorm/react-diagrams";
import { NodePortModel } from "../../NodePort";
import { NodeTypes } from "../../../resources/constants";
import { Branch, FlowNode, LinePosition } from "@dharshi/ballerina-core";

export class EndNodeModel extends NodeModel {
    protected portIn: NodePortModel;
    protected portOut: NodePortModel;
    protected parentFlowNode: FlowNode;
    topNode: FlowNode | Branch; // top statement node or parent block node
    target: LinePosition;

    constructor(id: string) {
        super({
            id,
            type: NodeTypes.END_NODE,
            locked: true,
        });
        this.addInPort("in");
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

    getInPort(): NodePortModel {
        return this.portIn;
    }

    getOutPort(): NodePortModel {
        return this.portOut;
    }

    setParentFlowNode(node: FlowNode): void {
        this.parentFlowNode = node;
    }

    getParentFlowNode(): FlowNode {
        return this.parentFlowNode;
    }

    setTopNode(node: FlowNode | Branch) {
        this.topNode = node;
    }

    getTopNode(): FlowNode | Branch {
        return this.topNode;
    }

    setTarget(target: LinePosition) {
        this.target = target;
    }

    getTarget(): LinePosition {
        return this.target;
    }
}
