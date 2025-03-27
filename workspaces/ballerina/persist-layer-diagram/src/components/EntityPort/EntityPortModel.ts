
import { PortModel, PortModelAlignment } from '@projectstorm/react-diagrams';

export class EntityPortModel extends PortModel {
    constructor(id: string, portType: PortModelAlignment) {
        super({
            type: 'entityPort',
            name: `${portType}-${id}`,
            id: `${portType}-${id}`,
            alignment: portType
        });
    }

    isLocked(): boolean {
        return true;
    }
}
