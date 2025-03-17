import { createContext, useContext } from "react"
import { RecordCreatorContext } from "../types"
import { TypeHelperCategory, TypeHelperItem, TypeHelperOperator } from "../TypeHelper";

const defaultContext: any = {}

export const Context = createContext<RecordCreatorContext>(defaultContext);

export type TypeHelperContext = {
    loading?: boolean;
    loadingTypeBrowser?: boolean;
    basicTypes: TypeHelperCategory[];
    operators: TypeHelperOperator[];
    onSearchTypeHelper: (searchText: string, isType: boolean) => void;
    typeBrowserTypes: TypeHelperCategory[];
    onSearchTypeBrowser: (searchText: string) => void;
    onTypeItemClick: (item: TypeHelperItem) => Promise<string>;
};

const defaultTypeHelperContext: TypeHelperContext = {
    loading: false,
    loadingTypeBrowser: false,
    basicTypes: [],
    operators: [],
    typeBrowserTypes: [],
    onSearchTypeHelper: () => {},
    onSearchTypeBrowser: () => {},
    onTypeItemClick: () => Promise.resolve(''),
};

export const TypeHelperContext = createContext<TypeHelperContext>(defaultTypeHelperContext);

export const useTypeHelperContext = () => {
    return useContext(TypeHelperContext);
};
