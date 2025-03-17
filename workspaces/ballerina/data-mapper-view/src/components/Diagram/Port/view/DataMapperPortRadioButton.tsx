import React from "react";

import styled from "@emotion/styled";
import { Icon } from "@dharshi/ui-toolkit";

export interface DataMapperPortRadioButtonProps {
	checked: boolean;
	disabled?: boolean;
}

function DataMapperPortRadioButton(props: DataMapperPortRadioButtonProps) {
	const { checked, disabled } = props;

	const iconSx = {
		display: "flex",
		fontSize: "15px"
	};

	if (disabled) {
		Object.assign(iconSx, {
			cursor: 'not-allowed',
			opacity: 0.9
		});
	}

	return (
		<Icon
			sx={{ height: "15px", width: "15px" }}
			iconSx={iconSx}
			name={checked ? "radio-button-checked" : "radio-button-unchecked"}
		/>
	);
}

export const RadioButtonChecked = styled(({ disabled = false }) => DataMapperPortRadioButton({ checked: true, disabled }))`
	user-select: none;
	pointer-events: auto;
`;

export const RadioButtonUnchecked = styled(({ disabled = false }) => DataMapperPortRadioButton({checked: false, disabled}))`
	user-select: none;
	pointer-events: auto;
`;
