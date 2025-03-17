
export interface DataMapperInputParam {
    name: string;
    type: string;
    isUnsupported?: boolean;
    typeNature?: TypeNature;
    isArray?: boolean;
}

export interface DataMapperOutputParam {
    type: string;
    isUnsupported?: boolean;
    typeNature?: TypeNature;
    isArray?: boolean;
}

export enum TypeNature {
    BLACKLISTED,
    WHITELISTED,
    YET_TO_SUPPORT,
    INVALID,
    NOT_FOUND,
    TYPE_UNAVAILABLE,
    PARAM_NAME_UNAVAILABLE,
    DUMMY
}

export interface WarningBannerProps {
    message: React.ReactNode | string;
}
