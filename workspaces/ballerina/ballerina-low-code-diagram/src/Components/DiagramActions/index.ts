export interface PortalData {
    canvasX: number;
    canvasY: number;
    canvasH: number;
    canvasW: number;
}

export interface DropDownPortalData {
    componentName?: string;
    portalX: number;
    portalY: number;
    offsetX?: number;
    offsetY?: number;
    collection?: any[];
    onClick?: () => void;
}
