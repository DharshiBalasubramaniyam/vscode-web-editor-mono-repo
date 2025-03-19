
import React, { useState } from 'react';
import { TextField } from '@dharshi/ui-toolkit';
import styled from '@emotion/styled';
import { PropertyModel } from '@dharshi/ballerina-core';

const NameContainer = styled.div`
    display: flex;
	flex-direction: row;
`;

export interface FunctionReturnProps {
    returnType: PropertyModel;
    onChange: (returnType: PropertyModel) => void;
    readonly?: boolean;
}

export function FunctionReturn(props: FunctionReturnProps) {
    const { returnType, onChange, readonly } = props;

    const handleNameChange = (value: string) => {
        onChange({ ...returnType, value });
    };

    return (
        <>
            <NameContainer>
                <TextField
                    sx={{ marginLeft: 15, flexGrow: 1 }}
                    disabled={readonly}
                    errorMsg={""}
                    label="Return Type"
                    size={70}
                    onTextChange={(input) => {
                        const trimmedInput = input.trim();
                        handleNameChange(trimmedInput);
                    }}
                    placeholder={returnType.valueTypeConstraint}
                    value={returnType.value}
                />
            </NameContainer>
        </>
    );
}
