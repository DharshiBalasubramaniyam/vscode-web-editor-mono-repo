// tslint:disable: jsx-no-multiline-js
// tslint:disable: jsx-no-lambda
import React from "react";

import styled from "@emotion/styled";
import { Button, Codicon, Icon, Typography } from "@dharshi/ui-toolkit";

import { Title } from "../DataMapperConfigPanel";
import { InputParamEditor } from "../InputParamsPanel/InputParamEditor";
import { DataMapperOutputParam, WarningBannerProps } from "../InputParamsPanel/types";
import { RecordButtonGroup } from "../RecordButtonGroup";
import { CompletionResponseWithModule } from "../TypeBrowser";
import { getTypeIncompatibilityMsg } from "../utils";

export interface OutputConfigWidgetProps {
    outputType: DataMapperOutputParam;
    fetchingCompletions: boolean;
    completions: CompletionResponseWithModule[]
    showOutputType: boolean;
    isArraySupported: boolean;
    handleShowOutputType: () => void;
    handleHideOutputType: () => void;
    handleOutputTypeChange: (type: string, isArray: boolean) => void;
    handleShowRecordEditor: () => void;
    handleOutputDeleteClick: () => void;
}

const WarningContainer = styled.div`
    margin-top: 20;
    margin-left: 16;
    margin-right: 16;
    background-color: '#FFF5EB';
    border-style: 'solid';
    padding: 8;
    min-width: 120;
    width: 'fit-content';
    text-align: 'left';
    display: 'flex';
    border-color: '#FFCC8C';
`;

const WarningBanner = (props: WarningBannerProps) => (
    <WarningContainer>
        <Icon sx={{ width: "16px", marginRight: "8px", marginTop: "5px" }} name="error-icon" />
        <Typography variant="body1">{props.message}</Typography>
    </WarningContainer>
);

export function OutputTypePanel(props: OutputConfigWidgetProps) {
    const {
        outputType,
        fetchingCompletions,
        completions,
        showOutputType,
        isArraySupported,
        handleShowOutputType,
        handleHideOutputType,
        handleOutputTypeChange,
        handleShowRecordEditor,
        handleOutputDeleteClick
    } = props;

    const typeIncompatibilityMsg = outputType.isUnsupported
        && getTypeIncompatibilityMsg(outputType.typeNature, outputType.type, "output");
    const typeUnsupportedBanner = outputType.isUnsupported && (
        <Warning
            data-testid="unsupported-output-banner"
            message={typeIncompatibilityMsg}
        />
    );

    const label = (
        <>
            <TypeName isInvalid={outputType.isUnsupported}>{outputType.isArray ? `${outputType.type}[]` : outputType.type}</TypeName>
        </>
    );

    return (
        <OutputTypeConfigPanel data-testid='dm-output'>
            <Title>Output Type</Title>
            {(!outputType.type || showOutputType) ? (
                <>
                    {showOutputType ? (
                        <InputParamEditor
                            param={{ ...outputType, name: "" }}
                            hideName={true}
                            onUpdate={(_, param) => {
                                handleOutputTypeChange(param.type, param.isArray);
                                handleHideOutputType();
                            }}
                            onCancel={handleHideOutputType}
                            completions={completions}
                            loadingCompletions={fetchingCompletions}
                            isArraySupported={isArraySupported}
                        />
                    ) :
                        <RecordButtonGroup openRecordEditor={handleShowRecordEditor} showTypeList={handleShowOutputType} />
                    }

                </>
            ) : (
                <>
                    <OutputTypeContainer isInvalid={outputType.isUnsupported}>
                        <ClickToEditContainer isInvalid={outputType.isUnsupported} onClick={!outputType.isUnsupported && handleShowOutputType}>
                            {label}
                        </ClickToEditContainer>
                        <Box>
                            {!outputType.isUnsupported && (
                                <EditButton
                                    onClick={handleShowOutputType}
                                    appearance="icon"
                                    data-testid={`data-mapper-config-edit-output`}
                                >
                                    <Codicon name="edit" iconSx={{ color: "var(--vscode-input-placeholderForeground)" }} />
                                </EditButton>
                            )}
                            <DeleteButton
                                onClick={handleOutputDeleteClick}
                                appearance="icon"
                                data-testid={`data-mapper-config-delete-output`}
                            >
                                <Codicon name="trash" iconSx={{ color: "var(--vscode-errorForeground)" }} />
                            </DeleteButton>
                        </Box>
                    </OutputTypeContainer>
                    {outputType.type && outputType.isUnsupported && typeUnsupportedBanner}
                </>
            )}
        </OutputTypeConfigPanel>
    );
}

const ClickToEditContainer = styled.div(({ isInvalid }: { isInvalid?: boolean }) => ({
    cursor: isInvalid ? 'auto' : 'pointer',
    width: '100%'
}));

const OutputTypeContainer = styled.div(({ isInvalid }: { isInvalid?: boolean }) => ({
    background: 'var(--vscode-sideBar-background)',
    padding: 10,
    color: `${isInvalid ? 'var(--vscode-errorForeground)' : 'inherit'}`,
    margin: "1rem 0 0.25rem",
    justifyContent: "space-between",
    display: "flex",
    width: "100%",
    alignItems: "center",
}));

const OutputTypeConfigPanel = styled.div`
    color: 'var(--vscode-foreground)';
    width: 100%;
`;

const Warning = styled(WarningBanner)`
    border-width: 1px !important;
    width: unset;
    margin: 5px 0;
`

const DeleteButton = styled(Button)`
    padding: 0;
    color: var(--vscode-errorForeground);
`;

const TypeName = styled.span(({ isInvalid }: { isInvalid?: boolean }) => ({
    fontWeight: 500,
    color: `${isInvalid ? 'var(--vscode-errorForeground)' : 'inherit'}`,
    marginRight: '6px'
}));

const EditButton = styled(Button)`
    padding: 0;
    margin-right: 5px;
    color: #36B475;
`;

const Box = styled.div`
    display: flex;
`;
