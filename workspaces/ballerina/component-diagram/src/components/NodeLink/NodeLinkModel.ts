
import { DefaultLinkModel } from "@projectstorm/react-diagrams";
import { ThemeColors } from "@dharshi/ui-toolkit";
import { NODE_LINK } from "../../resources/constants";
import { NodeModel } from "../../utils/types";

export const LINK_BOTTOM_OFFSET = 30;

export interface NodeLinkModelOptions {
    label?: string;
    visible: boolean;
    onAddClick?: () => void;
}

export class NodeLinkModel extends DefaultLinkModel {
    sourceNode: NodeModel;
    targetNode: NodeModel;
    // options
    label: string;
    visible = true;
    // call back
    onAddClick?: () => void;

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
                if ((options as NodeLinkModelOptions).visible === false) {
                    this.visible = (options as NodeLinkModelOptions).visible;
                }
            }
            if ((options as NodeLinkModelOptions).onAddClick) {
                this.onAddClick = (options as NodeLinkModelOptions).onAddClick;
            }
        }
    }

    setSourceNode(node: NodeModel) {
        this.sourceNode = node;
    }

    setTargetNode(node: NodeModel) {
        this.targetNode = node;
    }
}
