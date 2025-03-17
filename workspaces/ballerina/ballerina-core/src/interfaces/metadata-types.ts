
// Node metadata types - NMD

export type NMD_Metadata = {
    inputs?: NMD_TypeData[];
    outputs?: NMD_TypeData[];
};

export type NMD_TypeData = {
    name: string;
    type: string;
};
