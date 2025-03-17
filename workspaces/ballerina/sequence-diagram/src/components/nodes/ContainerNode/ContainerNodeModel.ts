
import { NodeTypes } from "../../../resources/constants";
import { BaseNodeModel } from "../BaseNode";

export class ContainerNodeModel extends BaseNodeModel {
    protected visible: boolean;
    readonly breakpointPercent: number;
    readonly label: string;

    constructor(id: string, width?: number, height?: number, breakpointPercent?: number, label?: string) {
        super({
            id,
            type: NodeTypes.CONTAINER_NODE,
        });
        this.width = width;
        this.height = height;
        this.breakpointPercent = breakpointPercent || 0;
        this.label = label || "";
    }

    isVisible(): boolean {
        return this.visible;
    }
}
