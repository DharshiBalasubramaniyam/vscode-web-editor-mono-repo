
import { NodeModel } from "@projectstorm/react-diagrams";
import { NodePortModel } from "../../NodePort";
import { NODE_LOCKED, NodeTypes } from "../../../resources/constants";
import { EntryPoint, EntryPointType } from "../../../utils/types";
import { CDFunction, CDResourceFunction, CDService } from "@dharshi/ballerina-core";
import { getEntryNodeFunctionPortName } from "../../../utils/diagram";

export class EntryNodeModel extends NodeModel {
    readonly node: EntryPoint;
    readonly type: EntryPointType;
    protected inPort: NodePortModel;
    protected outPorts: NodePortModel[];

    constructor(node: EntryPoint, type: EntryPointType) {
        super({
            id: node.uuid,
            type: NodeTypes.ENTRY_NODE,
            locked: NODE_LOCKED,
        });
        this.node = node;
        this.type = type || "service";

        this.outPorts = [];
        this.addInPort("in");
        this.addOutPort("out");
        (node as CDService).remoteFunctions?.forEach((func) => {
            this.addOutPort(getEntryNodeFunctionPortName(func));
        });
        (node as CDService).resourceFunctions?.forEach((func) => {
            this.addOutPort(getEntryNodeFunctionPortName(func));
        });
    }

    addPort<T extends NodePortModel>(port: T): T {
        super.addPort(port);
        if (port.getOptions().in) {
            this.inPort = port;
        } else {
            this.outPorts.push(port);
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
        return this.inPort;
    }

    getOutPort(): NodePortModel {
        return this.outPorts.find((port) => port.getOptions().name === "out");
    }

    getOutPorts(): NodePortModel[] {
        return this.outPorts;
    }

    getFunctionPort(func: CDFunction | CDResourceFunction): NodePortModel | undefined {
        return this.outPorts.find((port) => port.getOptions().name === getEntryNodeFunctionPortName(func));
    }

    getHeight(): number {
        return this.height;
    }
}
