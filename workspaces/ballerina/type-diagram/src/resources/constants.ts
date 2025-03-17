
import { DagreEngine } from '@projectstorm/react-diagrams-routing';

export const dagreEngine = new DagreEngine({
    graph: {
        rankdir: 'LR',
        ranksep: 175,
        edgesep: 20,
        nodesep: 20,
        ranker: 'longest-path',
        marginx: 40,
        marginy: 40
    }
});

export const NO_ENTITIES_DETECTED = 'Could not detect any entities in the Type model.';
export const ERRONEOUS_MODEL = 'Please resolve the diagnostics to view the Type diagram.';
