import { STKindChecker, STNode } from "@dharshi/syntax-tree";

export function isQueryParam(param: STNode): boolean {
    if (STKindChecker.isRequiredParam(param)) {
        const annotationCheck: boolean = param.annotations && param.annotations.length === 0;
        let typeCheck: boolean = false;

        if (STKindChecker.isArrayTypeDesc(param.typeName)) {
            typeCheck = STKindChecker.isStringTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isIntTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isBooleanTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isFloatTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isDecimalTypeDesc(param.typeName.memberTypeDesc)
        } else {
            typeCheck = STKindChecker.isStringTypeDesc(param.typeName)
                || STKindChecker.isIntTypeDesc(param.typeName)
                || STKindChecker.isBooleanTypeDesc(param.typeName)
                || STKindChecker.isFloatTypeDesc(param.typeName)
                || STKindChecker.isDecimalTypeDesc(param.typeName)
        }

        return annotationCheck && typeCheck;
    } else if (STKindChecker.isDefaultableParam(param) || STKindChecker.isRestParam(param)) {
        let typeCheck: boolean = false;

        if (STKindChecker.isArrayTypeDesc(param.typeName)) {
            typeCheck = STKindChecker.isStringTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isIntTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isBooleanTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isFloatTypeDesc(param.typeName.memberTypeDesc)
                || STKindChecker.isDecimalTypeDesc(param.typeName.memberTypeDesc)
        } else {
            typeCheck = STKindChecker.isStringTypeDesc(param.typeName)
                || STKindChecker.isIntTypeDesc(param.typeName)
                || STKindChecker.isBooleanTypeDesc(param.typeName)
                || STKindChecker.isFloatTypeDesc(param.typeName)
                || STKindChecker.isDecimalTypeDesc(param.typeName)
        }

        return typeCheck;
    }

    return false;
}
