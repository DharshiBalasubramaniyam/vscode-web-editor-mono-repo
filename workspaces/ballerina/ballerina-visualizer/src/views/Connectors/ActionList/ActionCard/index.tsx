// tslint:disable: jsx-no-multiline-js jsx-wrap-multiline
import React, { useState } from "react";

import debounce from "lodash.debounce";

import { S } from "..";
import { FunctionDefinitionInfo } from "@dharshi/ballerina-core";
import { Typography } from "@dharshi/ui-toolkit";

interface ActionCardProps {
    action: FunctionDefinitionInfo;
    onSelect: (action: FunctionDefinitionInfo) => void;
}

export function ActionCard(props: ActionCardProps) {
    const { action, onSelect } = props;

    const name = action.displayAnnotation?.label || action.name;

    const [showDocumentation, setShowDocumentation] = useState(false);

    const debouncedHandleMouseEnter = debounce(() => setShowDocumentation(true), 500);

    const handleOnMouseLeave = () => {
        setShowDocumentation(false);
        debouncedHandleMouseEnter.cancel();
    };

    const handleOnSelect = () => {
        onSelect(action);
    };

    return (
        <S.ActionContainer key={`action-${action.name.toLowerCase()}`} onClick={handleOnSelect} onMouseEnter={debouncedHandleMouseEnter} onMouseLeave={handleOnMouseLeave}>
            <S.ComponentTitle>{name}</S.ComponentTitle>
            {showDocumentation && action.documentation && (
                <Typography variant="caption">{action.documentation}</Typography>
            )}
        </S.ActionContainer>
    );
}
