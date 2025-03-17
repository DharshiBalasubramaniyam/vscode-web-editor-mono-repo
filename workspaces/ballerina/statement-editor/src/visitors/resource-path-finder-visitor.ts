import {
    ResourceAccessorDefinition,
    Visitor
} from "@dharshi/syntax-tree";

interface MethodPath {
    method: string;
    path: string;
}

export class ResourcePathFinderVisitor implements Visitor {

    matchingPaths: MethodPath[] = [];
    isEditing: boolean;
    new: MethodPath;
    current: MethodPath;
    validPath: boolean;

    constructor(isEditing: boolean, newMethodPath: MethodPath, currentMethodPath: MethodPath) {
        this.new = newMethodPath;
        this.current = currentMethodPath;
        this.matchingPaths = [];
        this.isEditing = isEditing;
        this.validPath = false;
    }

    public beginVisitResourceAccessorDefinition(node: ResourceAccessorDefinition) {
        const method = node.functionName.value.toUpperCase();
        const path = node.relativeResourcePath.length > 0 ? node.relativeResourcePath[0].value : "";

        if (this.isEditing) {
            if ((this.current.method !== method && this.current.path !== path) && (this.new.method === method && this.new.path === path)) {
                this.matchingPaths.push(this.new);
            }
        } else {
            if (this.new.method === method && this.new.path === path) {
                this.matchingPaths.push(this.new);
            }
        }

    }

    getResourcePathValidity(): boolean {
        return this.matchingPaths.length === 0;
    }
}
