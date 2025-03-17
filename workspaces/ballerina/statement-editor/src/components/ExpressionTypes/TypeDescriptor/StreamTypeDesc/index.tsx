// tslint:disable: jsx-no-multiline-js
import React from "react";

import { StreamTypeDesc } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface StreamTypeDescProps {
    model: StreamTypeDesc;
}

export function StreamTypeDescComponent(props: StreamTypeDescProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.streamKeywordToken} />
            {model.streamTypeParamsNode && (
                <>
                    <TokenComponent model={model.streamTypeParamsNode.ltToken} />
                    <ExpressionComponent model={model.streamTypeParamsNode.leftTypeDescNode} />
                    <ExpressionComponent model={model.streamTypeParamsNode.commaToken} />
                    <ExpressionComponent model={model.streamTypeParamsNode.rightTypeDescNode} />
                    <TokenComponent model={model.streamTypeParamsNode.gtToken} />
                </>
            )}
        </>
    );
}
