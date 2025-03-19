/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from 'react';
import { ActionButtons, Divider, SidePanelBody, Typography, ProgressIndicator } from '@dharshi/ui-toolkit';
import { ResourcePath } from './ResourcePath/ResourcePath';
import { ResourceResponse } from './ResourceResponse/ResourceResponse';
import styled from '@emotion/styled';
import { HTTP_METHOD } from '../../utils';
import { FunctionModel, ParameterModel, PropertyModel, ReturnTypeModel } from '@dharshi/ballerina-core';
import { Parameters } from './Parameters/Parameters';

const AdvancedParamTitleWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

export interface ResourceFormProps {
	model: FunctionModel;
	onSave: (functionModel: FunctionModel) => void;
	onClose: () => void;
}

export function ResourceForm(props: ResourceFormProps) {
	const { model, onSave, onClose } = props;

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [functionModel, setFunctionModel] = useState<FunctionModel>(model);

	useEffect(() => {
		console.log("Function Model", model);
	}, []);

	const onPathChange = (method: PropertyModel, path: PropertyModel) => {
		const updatedFunctionModel = {
			...functionModel,
			accessor: method,
			name: path,
		};
		setFunctionModel(updatedFunctionModel);
		console.log("Path,Method Change: ", updatedFunctionModel);
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
				<ResourcePath method={functionModel.accessor} path={functionModel.name} onChange={onPathChange} />
				<Divider />
				<Parameters showPayload={(functionModel.accessor.value && functionModel.accessor.value.toUpperCase() !== "GET")} parameters={functionModel.parameters} onChange={handleParamChange} schemas={functionModel.schema} />
				<Typography sx={{ marginBlockEnd: 10 }} variant="h4">Responses</Typography>
				<ResourceResponse method={functionModel.accessor.value.toUpperCase() as HTTP_METHOD} response={functionModel.returnType} onChange={handleResponseChange} />
				<ActionButtons
					primaryButton={{ text: "Save", onClick: handleSave, tooltip: "Save" }}
					secondaryButton={{ text: "Cancel", onClick: onClose, tooltip: "Cancel" }}
					sx={{ justifyContent: "flex-end" }}
				/>
			</SidePanelBody>
		</>
	);
}
