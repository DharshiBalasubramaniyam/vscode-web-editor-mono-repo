
import { CMCardinality as Cardinality } from '@dharshi/ballerina-core';
import { SharedLinkModel } from '../shared-link/shared-link';

interface LinkOrigins {
	nodeId: string;
	attributeId: string;
}

export class EntityLinkModel extends SharedLinkModel {
	readonly cardinality: Cardinality;
	sourceNode: LinkOrigins;
	targetNode: LinkOrigins;

	constructor(id: string, cardinality: Cardinality) {
		super(id, 'entityLink');
		this.cardinality = cardinality;
	}

	setSourceNode(nodeId: string, attributeId: string = '') {
		this.sourceNode = { nodeId, attributeId };
	}
	
	setTargetNode(nodeId: string, attributeId: string = '') {
		this.targetNode = { nodeId, attributeId };
	}
}
