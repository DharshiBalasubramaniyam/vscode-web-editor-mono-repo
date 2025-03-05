/**
 * Copyright (c) 2022, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * This software is the property of WSO2 LLC. and its suppliers, if any.
 * Dissemination of any information or reproduction of any material contained
 * herein in any form is strictly forbidden, unless permitted by WSO2 expressly.
 * You may not alter or remove any copyright or other notice from copies of this content.
 */
import React from "react";

import { RawTemplateExpression } from "@dharshi/syntax-tree";

import { InputEditor } from "../../InputEditor";

interface RawTemplateExpressionProps {
    model: RawTemplateExpression;
}

export function RawTemplateExpressionComponent(props: RawTemplateExpressionProps) {
    const { model } = props;

    const inputEditorProps = {
        model
    };

    return (
        <InputEditor {...inputEditorProps} />
    );
}
