
import { DataMapperNodeModel } from "../commons/DataMapperNode";

export const DATA_IMPORT_NODE = "data-import-node";

export class DataImportNodeModel extends DataMapperNodeModel {
    public configName: string = 'DataMapperConfig';
    public ioType: string = '';
    
    constructor() {
        super(undefined, undefined, DATA_IMPORT_NODE);
    }

    initLinks(): void {
        
    }

    initPorts(): void {
        
    }
}

export class InputDataImportNodeModel extends DataImportNodeModel {
    public ioType: string = 'Input';

    constructor() {
        super();
        this.id = "input-import-node";
    }
}

export class OutputDataImportNodeModel extends DataImportNodeModel {
    public ioType: string = 'Output';

    constructor() {
        super();
        this.id = "output-import-node";
    }
}
