import React from "react";

import { MapTypeDesc, TypeParameter } from "@dharshi/syntax-tree";

import { ExpressionComponent } from "../../../Expression";
import { TokenComponent } from "../../../Token";

interface MapTypeDescProps {
    model: MapTypeDesc;
}

export function MapTypeDescComponent(props: MapTypeDescProps) {
    const { model } = props;

    return (
        <>
            <TokenComponent model={model.mapKeywordToken} />
            <ExpressionComponent model={model.mapTypeParamsNode} />
        </>
    );
}
