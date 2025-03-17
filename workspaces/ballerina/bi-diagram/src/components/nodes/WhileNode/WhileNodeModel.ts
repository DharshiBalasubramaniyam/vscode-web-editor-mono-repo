
import { NodeModel } from "@projectstorm/react-diagrams";
import { NodePortModel } from "../../NodePort";
import { getNodeIdFromModel } from "../../../utils/node";
import { NodeTypes } from "../../../resources/constants";
import { FlowNode } from "../../../utils/types";
import _ from "lodash";
import { NodeLinkModel } from "../../NodeLink";

export class WhileNodeModel extends NodeModel {
    readonly node: FlowNode;
    protected portIn: NodePortModel;
    protected portOut: NodePortModel;

    constructor(node: FlowNode) {
        super({
            id: getNodeIdFromModel(node),
            type: NodeTypes.WHILE_NODE,
            locked: true,
        });
        this.node = node;
        this.setPosition(node.viewState.x, node.viewState.y);
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

    hasBreakpoint(): boolean {
        return this.node.hasBreakpoint;
    }

    isActiveBreakpoint(): boolean {
        return this.node.isActiveBreakpoint;
    }

    setAroundLinksDisabled(disabled: boolean): void {
        _.forEach(this.ports, (port) => {
            _.forEach(port.getLinks(), (link) => {
                (link as NodeLinkModel).setDisabled(disabled);
                (link as NodeLinkModel).setBrokenLine(disabled);
            });
        });
    }
}
