import React from "react";

import { NilLiteral } from "@dharshi/syntax-tree";

import { InputEditor } from "../../InputEditor";

interface NilLiteralProps {
    model: NilLiteral;
}

export function NilLiteralComponent(props: NilLiteralProps) {
    const { model } = props;

    const inputEditorProps = {
        model
    };

    return (
        <InputEditor {...inputEditorProps} />
    );
}
