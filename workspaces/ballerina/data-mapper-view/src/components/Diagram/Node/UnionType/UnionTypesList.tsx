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
// tslint:disable: jsx-no-multiline-js
import React from "react";

import { STNode } from "@dharshi/syntax-tree";

import { IDataMapperContext } from "../../../../utils/DataMapperContext/DataMapperContext";

import { UnionTypeListItem } from "./UnionTypeListItem";

export interface UnionTypesListProps {
    unionTypes: string[];
    context: IDataMapperContext;
    hasInvalidTypeCast: boolean;
    innermostExpr: STNode;
    typeCastExpr: STNode;
}

export function UnionTypesList(props: UnionTypesListProps) {
    const { unionTypes, context, hasInvalidTypeCast, innermostExpr, typeCastExpr } = props;

    return (
        <>
            {
                unionTypes.map((type: string, index: number) => (
                    <UnionTypeListItem
                        key={index}
                        context={context}
                        type={type}
                        hasInvalidTypeCast={hasInvalidTypeCast}
                        innermostExpr={innermostExpr}
                        typeCastExpr={typeCastExpr}
                    />
                ))
            }
        </>
    );
}
