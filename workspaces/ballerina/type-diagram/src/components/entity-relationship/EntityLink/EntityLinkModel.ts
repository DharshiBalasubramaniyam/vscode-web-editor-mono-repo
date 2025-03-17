
import { CMCardinality as Cardinality } from '@dharshi/ballerina-core';
import { SharedLinkModel } from '../../common/shared-link/shared-link';

export class EntityLinkModel extends SharedLinkModel {
	readonly cardinality: Cardinality;
	readonly testId: string;

	constructor(cardinality?: Cardinality, testId?: string) {
		super('entityLink');

		this.cardinality = cardinality;
		this.testId = testId;
	}
}
