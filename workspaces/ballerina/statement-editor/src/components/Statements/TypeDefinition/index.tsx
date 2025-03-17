// tslint:disable: jsx-no-multiline-js
import React, { ReactNode } from "react";

import {
    TypeDefinition
} from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../Expression";
import { KeywordComponent } from "../../Keyword";
import { TokenComponent } from "../../Token";

interface TypeDefProps {
    model: TypeDefinition;
}

export function TypeDefinitionC(props: TypeDefProps) {
    const { model } = props;

    let typeDescriptor: ReactNode;
    if (model?.typeDescriptor) {
        typeDescriptor = (
            <ExpressionComponent
                model={model.typeDescriptor}
            />
        )
    }

    return (
        <>
            {model?.visibilityQualifier && (
                <KeywordComponent model={model?.visibilityQualifier} />
            )}
            <TokenComponent model={model?.typeKeyword} className={"keyword"}/>
            {model?.typeName && (
                <ExpressionComponent model={model?.typeName}/>
            )}
            <span>
                {typeDescriptor}
            </span>
        </>
    );
}
