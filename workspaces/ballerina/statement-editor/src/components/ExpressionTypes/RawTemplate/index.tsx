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
