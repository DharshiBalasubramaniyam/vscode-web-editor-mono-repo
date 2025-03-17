
import { LinkModel, NodeModel, NodeModelGenerics, PortModel } from '@projectstorm/react-diagrams';
import { EntityLinkModel } from '../../entity-relationship';

export class SharedNodeModel extends NodeModel<NodeModelGenerics> {
    constructor(type: string, id: string) {
        super({
            type: type,
            id: id
        });
    }

    handleHover = (ports: PortModel[], task: string) => {
        if (ports.length > 0) {
            ports.forEach((port) => {
                const portLinks: Map<string, LinkModel> = new Map(Object.entries(port.links));
                portLinks.forEach((link) => {
                    if (link.getSourcePort().getID() === port.getID()) {
                        link.fireEvent({}, task);
                    }
                })
            })
        }
    }

    isNodeSelected = (selectedLink: EntityLinkModel, portIdentifier: string): boolean => {
        if (selectedLink) {
            if (selectedLink.getSourcePort().getNode().getID() === this.getID()) {
                let sourcePortID: string = selectedLink.getSourcePort().getID();
                return sourcePortID.slice(sourcePortID.indexOf('-') + 1) === portIdentifier;
            } else if (selectedLink.getTargetPort().getNode().getID() === this.getID()) {
                let targetPortID: string = selectedLink.getTargetPort().getID();
                return targetPortID.slice(targetPortID.indexOf('-') + 1) === portIdentifier;
            }
        }
        return false;
    }
}
