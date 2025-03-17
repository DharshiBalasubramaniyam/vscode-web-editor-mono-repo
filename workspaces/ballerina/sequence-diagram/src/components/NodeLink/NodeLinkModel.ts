
import { DefaultLinkModel } from "@projectstorm/react-diagrams";
import { ThemeColors } from "@dharshi/ui-toolkit";
import { NODE_LINK } from "../../resources/constants";
import { NodeModel } from "../../utils/types";

export const LINK_BOTTOM_OFFSET = 30;

export interface NodeLinkModelOptions {
    label?: string;
    variant?: boolean;
}

export class NodeLinkModel extends DefaultLinkModel {
    label: string;
    sourceNode: NodeModel;
    targetNode: NodeModel;
    // options
    variant = false;

    constructor(label?: string);
    constructor(options: NodeLinkModelOptions);
    constructor(options: NodeLinkModelOptions | string) {
        super({
            type: NODE_LINK,
            width: 10,
            color: ThemeColors.PRIMARY,
            selectedColor: ThemeColors.SECONDARY,
            curvyness: 0,
        });
        if (options) {
            if (typeof options === "string" && options.length > 0) {
                this.label = options;
            } else {
                if ((options as NodeLinkModelOptions).label) {
                    this.label = (options as NodeLinkModelOptions).label;
                }

                if ((options as NodeLinkModelOptions).variant === true) {
                    this.variant = (options as NodeLinkModelOptions).variant;
                }
            }
        }
    }

    setSourceNode(node: NodeModel) {
        this.sourceNode = node;
    }

    setTargetNode(node: NodeModel) {
        this.targetNode = node;
    }

    getSVGPath(): string {
        if (this.points.length != 2) {
            return "";
        }

        const source = this.getFirstPoint().getPosition();
        const target = this.getLastPoint().getPosition();
        let path = `M ${source.x} ${source.y} `;
        path += `L ${target.x} ${target.y}`;
        return path;
    }

    // show node arrow. default true. but target node is a EmptyNodeModel, then false
    showArrowToNode(): boolean {
        if (this.points.length != 2) {
            return false;
        }

        return true;
    }
}
