/**
 * Copyright (c) 2021, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import React from "react";

import { BinaryExpression } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { OperatorComponent } from "../../Operator";

interface BinaryProps {
    model: BinaryExpression;
}

export function BinaryExpressionComponent(props: BinaryProps) {
    const { model } = props;

    return (
        <>
            <ExpressionComponent model={model.lhsExpr} />
            <OperatorComponent model={model.operator} />
            <ExpressionComponent model={model.rhsExpr} />
        </>
    );
}
