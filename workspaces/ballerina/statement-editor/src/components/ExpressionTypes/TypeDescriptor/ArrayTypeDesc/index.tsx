// tslint:disable: jsx-no-multiline-js
import React, { useContext } from "react";

import { ArrayTypeDesc } from "@dharshi/syntax-tree";

import { StatementEditorContext } from "../../../../store/statement-editor-context";
import { ExpressionComponent } from "../../../Expression";

interface RecordTypeDescProps {
    model: ArrayTypeDesc;
}

export function ArrayTypeDescComponent(props: RecordTypeDescProps) {
    const { model } = props;
    const stmtCtx = useContext(StatementEditorContext);
    const {
        modelCtx: {
            updateModel,
        }
    } = stmtCtx;

    let dimensionSource = "";
    model?.dimensions.forEach(value => {
        dimensionSource += value.source;
    })

    return (
        <>
            {model?.memberTypeDesc && (
                <ExpressionComponent
                    model={model.memberTypeDesc}
                />
            )}
            {model?.dimensions && (
                dimensionSource
            )}
        </>
    );
}
