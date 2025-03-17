import React from "react";

import { StringTemplateExpression} from "@dharshi/syntax-tree";

import { InputEditor } from "../../InputEditor";

interface StringTemplateExpressionProps {
    model: StringTemplateExpression;
}

export function StringTemplateExpressionComponent(props: StringTemplateExpressionProps) {
    const { model } = props;

    const inputEditorProps = {
        model
    };

    return (
        <InputEditor {...inputEditorProps} />
    );
}
