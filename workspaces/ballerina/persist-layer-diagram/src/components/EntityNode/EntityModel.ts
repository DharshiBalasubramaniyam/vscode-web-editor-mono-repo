
import { PortModelAlignment } from '@projectstorm/react-diagrams';
import { CMEntity as Entity } from '@dharshi/ballerina-core';
import { SharedNodeModel } from '../shared-node/shared-node';
import { EntityPortModel } from '../EntityPort/EntityPortModel';

export class EntityModel extends SharedNodeModel {
    readonly entityObject: Entity;

    constructor(entityName: string, entityObject: Entity) {
        super('entityNode', entityName);
        this.entityObject = entityObject;

        this.addPort(new EntityPortModel(entityName, PortModelAlignment.LEFT));
        this.addPort(new EntityPortModel(entityName, PortModelAlignment.RIGHT));

        // dedicated ports to connect inheritance links (record inclusions)
        this.addPort(new EntityPortModel(entityName, PortModelAlignment.BOTTOM));
        this.addPort(new EntityPortModel(entityName, PortModelAlignment.TOP));

        this.entityObject.attributes.forEach(attribute => {
            this.addPort(new EntityPortModel(`${entityName}/${attribute.name}`, PortModelAlignment.LEFT));
            this.addPort(new EntityPortModel(`${entityName}/${attribute.name}`, PortModelAlignment.RIGHT));
        })
    }
}
