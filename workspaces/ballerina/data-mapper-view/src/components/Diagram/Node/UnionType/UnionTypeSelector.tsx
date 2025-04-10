/*
 * Copyright (c) 2023, WSO2 LLC. (http://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein is strictly forbidden, unless permitted by WSO2 in accordance with
 * the WSO2 Commercial License available at http://wso2.com/licenses.
 * For specific language governing the permissions and limitations under
 * this license, please see the license as well as any agreement you’ve
 * entered into with WSO2 governing the purchase of this software and any
 * associated services.
 */
// tslint:disable: jsx-no-multiline-js jsx-no-lambda
import React from "react";

import { TypeField } from "@dharshi/ballerina-core";
import { IdentifierToken, STNode } from "@dharshi/syntax-tree";

import { IDataMapperContext } from "../../../../utils/DataMapperContext/DataMapperContext";
import { getSupportedUnionTypes } from "../../utils/union-type-utils";
import { TypeDescriptor } from "../commons/DataMapperNode";

import { UnionTypesList } from "./UnionTypesList";

export interface UnionTypeSelectorProps {
    context: IDataMapperContext;
    typeIdentifier: TypeDescriptor | IdentifierToken;
    typeDef: TypeField;
    hasInvalidTypeCast: boolean;
    innermostExpr: STNode;
    typeCastExpr: STNode;
}

export function UnionTypeSelector(props: UnionTypeSelectorProps) {
    const { typeIdentifier, context, typeDef, hasInvalidTypeCast, innermostExpr, typeCastExpr } = props;
    const supportedUnionTypes = getSupportedUnionTypes(typeDef, typeIdentifier);

    return (
        <UnionTypesList
            context={context}
            unionTypes={supportedUnionTypes}
            hasInvalidTypeCast={hasInvalidTypeCast}
            innermostExpr={innermostExpr}
            typeCastExpr={typeCastExpr}
        />
    );
}
