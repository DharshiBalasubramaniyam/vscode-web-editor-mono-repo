// tslint:disable: jsx-no-multiline-js
import React from "react";

import { MappingBindingPattern } from "@dharshi/syntax-tree";

import { getMinutiaeJSX } from "../../../utils";
import { StatementEditorViewState } from "../../../utils/statement-editor-viewstate";
import { InputEditor } from "../../InputEditor";

interface MappingBindingPatternProps {
    model: MappingBindingPattern;
}

export function MappingBindingPatternComponent(props: MappingBindingPatternProps) {
    const { model } = props;

    const inputEditorProps = {
        model
    };

    const { leadingMinutiaeJSX, trailingMinutiaeJSX } = getMinutiaeJSX(model);

    return (
        <>
            {leadingMinutiaeJSX}
            <InputEditor {...inputEditorProps} />
            {trailingMinutiaeJSX}
        </>
    );
}
