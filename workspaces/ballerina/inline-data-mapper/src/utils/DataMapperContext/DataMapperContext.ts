import { IDMModel, Mapping } from "@dharshi/ballerina-core";
import { View } from "../../components/DataMapper/Views/DataMapperView";

export interface IDataMapperContext {
    model: IDMModel;
    views: View[];
    addView: (view: View) => void;
    applyModifications: (mappings: Mapping[]) => Promise<void>;
    addArrayElement: (targetField: string) => Promise<void>;
}

export class DataMapperContext implements IDataMapperContext {

    constructor(
        public model: IDMModel,
        public views: View[] = [],
        public addView: (view: View) => void,
        public applyModifications: (mappings: Mapping[]) => Promise<void>,
        public addArrayElement: (targetField: string) => Promise<void>
    ){}
}
