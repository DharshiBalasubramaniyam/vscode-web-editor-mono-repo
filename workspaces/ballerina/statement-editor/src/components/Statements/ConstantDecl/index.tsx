// tslint:disable: jsx-no-multiline-js
import React, { useContext } from "react";

import { ConstDeclaration } from "@dharshi/syntax-tree";

import { CUSTOM_CONFIG_TYPE } from "../../../constants";
import { StatementEditorContext } from "../../../store/statement-editor-context";
import { ExpressionComponent } from "../../Expression";
import { KeywordComponent } from "../../Keyword";
import { TokenComponent } from "../../Token";

interface ConstantDeclProps {
    model: ConstDeclaration;
}

export function ConstantDeclC(props: ConstantDeclProps) {
    const { model } = props;
    const {
        modelCtx: {
            currentModel,
            changeCurrentModel
        },
        config
    } = useContext(StatementEditorContext);

    if (!currentModel.model) {
        if (model.initializer) {
            changeCurrentModel(model.initializer);
        } else if (config.type === CUSTOM_CONFIG_TYPE) {
            changeCurrentModel(model);
        }
    }

    return (
        <>
            {model.visibilityQualifier && <KeywordComponent model={model.visibilityQualifier} />}
            <TokenComponent model={model.constKeyword} className={"keyword"} />
            {model.typeDescriptor && <ExpressionComponent model={model.typeDescriptor}/>}
            <ExpressionComponent model={model.variableName}/>
            <TokenComponent model={model.equalsToken} className={"operator"} />
            <ExpressionComponent model={model.initializer}/>
            {!model.semicolonToken.isMissing && <TokenComponent model={model.semicolonToken} />}
        </>
    );
}
