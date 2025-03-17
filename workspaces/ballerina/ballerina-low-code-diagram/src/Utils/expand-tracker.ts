class ExpandTracker {
    private expandedSignatures: string[];
    constructor() {
        this.expandedSignatures = [];
    }

    isExpanded(signature: string): boolean {
        return this.expandedSignatures.indexOf(signature) > -1;
    }

    addExpandedSignature(signature: string) {
        this.expandedSignatures.push(signature);
    }

    removeExpandedSignature(signature: string) {
        const index = this.expandedSignatures.indexOf(signature);

        if (index > -1) {
            this.expandedSignatures.splice(index, 1);
        }
    }
}

const expandTracker = new ExpandTracker();
export default expandTracker;
