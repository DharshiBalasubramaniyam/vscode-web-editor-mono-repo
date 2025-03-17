
import React, { useState } from 'react';
import { TextField } from '@dharshi/ui-toolkit';
import styled from '@emotion/styled';
import { PropertyModel } from '@dharshi/ballerina-core';

const NameContainer = styled.div`
    display: flex;
	flex-direction: row;
`;

export interface FunctionNameProps {
	name: PropertyModel;
	onChange: (name: PropertyModel) => void;
	readonly?: boolean;
}

export function FunctionName(props: FunctionNameProps) {
	const { name, onChange, readonly } = props;

	const handleNameChange = (value: string) => {
		onChange({ ...name, value });
	};

	return (
		<>
			<NameContainer>
				<TextField
					sx={{ marginLeft: 15, flexGrow: 1 }}
					autoFocus
					disabled={readonly}
					errorMsg={""}
					label="Function Name"
					size={70}
					onTextChange={(input) => {
						const trimmedInput = input.trim();
						handleNameChange(trimmedInput);
					}}
					placeholder="foo"
					value={name.value}
					onFocus={(e) => e.target.select()}
				/>
			</NameContainer>
		</>
	);
}
