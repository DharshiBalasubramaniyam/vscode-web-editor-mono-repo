import React from "react";

import {
    AsteriskToken,
    BooleanKeyword,
    DecimalFloatingPointLiteralToken,
    DecimalIntegerLiteralToken,
    DecimalKeyword,
    FalseKeyword,
    FloatKeyword,
    FunctionKeyword,
    IdentifierToken,
    IntKeyword,
    JsonKeyword,
    NullKeyword,
    StringKeyword,
    StringLiteralToken,
    TemplateString,
    TrueKeyword,
    VarKeyword
} from "@dharshi/syntax-tree";

import { checkCommentMinutiae, getClassNameForToken, getJSXForMinutiae, getMinutiaeJSX } from "../../../utils";
import { StatementEditorViewState } from "../../../utils/statement-editor-viewstate";
import { InputEditor } from "../../InputEditor";

interface TokenProps {
    model: AsteriskToken
        | FalseKeyword
        | TrueKeyword
        | NullKeyword
        | FunctionKeyword
        | DecimalFloatingPointLiteralToken
        | DecimalIntegerLiteralToken
        | StringLiteralToken
        | BooleanKeyword
        | DecimalKeyword
        | FloatKeyword
        | IntKeyword
        | JsonKeyword
        | StringKeyword
        | VarKeyword
        | IdentifierToken
        | TemplateString;
}

export function TokenComponent(props: TokenProps) {
    const { model } = props;

    const inputEditorProps = {
        model,
        classNames: getClassNameForToken(model)
    };

    const isFieldWithNewLine = (model.viewState as StatementEditorViewState).multilineConstructConfig.isFieldWithNewLine;

    const leadingMinutiaeJSX = getJSXForMinutiae(model?.leadingMinutiae, isFieldWithNewLine);
    const trailingMinutiaeJSX = getJSXForMinutiae(model?.trailingMinutiae, isFieldWithNewLine);

    const filteredLeadingMinutiaeJSX = checkCommentMinutiae(leadingMinutiaeJSX);

    return (
        <>
            {filteredLeadingMinutiaeJSX}
            <InputEditor {...inputEditorProps} />
            {trailingMinutiaeJSX}
        </>
    );
}
