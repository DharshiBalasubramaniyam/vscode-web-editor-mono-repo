
export interface NodePosition {
    start: number;
    end: number;
}

export function getPosition(node: Node): NodePosition {
    return {
        start: 0,
        end: 0
    };
}

export function isPositionsEquals(node1: NodePosition, node2: NodePosition): boolean {
    return node1.start === node2.start
        && node1.end === node2.end;
}
