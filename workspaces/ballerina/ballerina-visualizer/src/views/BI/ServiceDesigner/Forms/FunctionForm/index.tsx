/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { ActionButtons, Divider, SidePanelBody, Typography, ProgressIndicator } from '@dharshi/ui-toolkit';
import { FunctionName } from './FunctionName/FunctionName';
import { FunctionReturn } from './Return/FunctionReturn';
import styled from '@emotion/styled';
import { FunctionModel, ParameterModel, PropertyModel, ReturnTypeModel } from '@dharshi/ballerina-core';
import { Parameters } from './Parameters/Parameters';
import { EditorContentColumn } from '../../styles';

export interface ResourceFormProps {
	model: FunctionModel;
	onSave: (functionModel: FunctionModel) => void;
	onClose: () => void;
}

export function FunctionForm(props: ResourceFormProps) {
	const { model, onSave, onClose } = props;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [functionModel, setFunctionModel] = useState<FunctionModel>(model);

	useEffect(() => {
		console.log("Function Model", model);
	}, []);

	const onNameChange = (name: PropertyModel) => {
		const updatedFunctionModel = {
			...functionModel,
			name: name,
		};
		setFunctionModel(updatedFunctionModel);
		console.log("Name Change: ", updatedFunctionModel);
	}

	const handleParamChange = (params: ParameterModel[]) => {
		const updatedFunctionModel = {
			...functionModel,
			parameters: params
		};
		setFunctionModel(updatedFunctionModel);
		console.log("Parameter Change: ", updatedFunctionModel);
	};

	const handleResponseChange = (response: ReturnTypeModel) => {
		response.value = "";
		const updatedFunctionModel = {
			...functionModel,
			returnType: response
		};
		setFunctionModel(updatedFunctionModel);
		console.log("Response Change: ", updatedFunctionModel);
	};

	const handleSave = () => {
		onSave(functionModel);
	}

	return (
		<>
			{isLoading && <ProgressIndicator id="resource-loading-bar" />}
			<SidePanelBody>
				<EditorContentColumn>
					<FunctionName name={functionModel.name} onChange={onNameChange} readonly={functionModel.name.editable} />
					<Divider />
					<Parameters parameters={functionModel.parameters} onChange={handleParamChange} />
					<Typography sx={{ marginBlockEnd: 10 }} variant="h4">Returns</Typography>
					<FunctionReturn returnType={functionModel.returnType} onChange={handleResponseChange} readonly={functionModel.returnType.editable} />
				</EditorContentColumn>
				<ActionButtons
					primaryButton={{ text: "Save", onClick: handleSave, tooltip: "Save" }}
					secondaryButton={{ text: "Cancel", onClick: onClose, tooltip: "Cancel" }}
					sx={{ justifyContent: "flex-end" }}
				/>
			</SidePanelBody>
		</>
	);
}
