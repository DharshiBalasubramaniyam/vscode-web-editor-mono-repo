import React from "react";

import { XmlTemplateExpression} from "@dharshi/syntax-tree";

import { InputEditor } from "../../InputEditor";

interface XmlTemplateExpressionProps {
    model: XmlTemplateExpression;
}

export function XmlTemplateExpressionComponent(props: XmlTemplateExpressionProps) {
    const { model } = props;

    const inputEditorProps = {
        model
    };

    return (
        <InputEditor {...inputEditorProps} />
    );
}
