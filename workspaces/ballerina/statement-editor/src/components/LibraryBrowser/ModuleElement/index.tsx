// tslint:disable: jsx-no-multiline-js
import React, { useContext, useState } from 'react';

import {
    FunctionParams,
    LibraryDataResponse,
    LibraryFunction,
    ModuleProperty
} from "@dharshi/ballerina-core";
import { GridItem, ProgressRing, Tooltip, Typography } from '@dharshi/ui-toolkit';

import { MAX_COLUMN_WIDTH, PARAM_CONSTRUCTOR } from '../../../constants';
import { InputEditorContext } from '../../../store/input-editor-context';
import { StatementEditorContext } from "../../../store/statement-editor-context";
import { getModuleIconStyle } from "../../../utils";
import { getFQModuleName, keywords } from "../../../utils/statement-modifications";
import { useStmtEditorHelperPanelStyles } from "../../styles";

interface ModuleElementProps {
    moduleProperty: ModuleProperty,
    key: number,
    isFunction: boolean
    label: string
}

export function ModuleElement(props: ModuleElementProps) {
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();
    const { moduleProperty, key, isFunction, label } = props;
    const inputEditorCtx = useContext(InputEditorContext);
    const { id, moduleId, moduleOrgName, moduleVersion } = moduleProperty;
    const [clickedModuleElement, setClickedModuleElement] = useState('');
    const { SuggestIcon, color } = getModuleIconStyle(label);

    const {
        modelCtx: {
            currentModel,
            updateModel
        },
        modules: {
            updateModuleList
        },
        targetPosition,
        libraryBrowserRpcClient
    } = useContext(StatementEditorContext);

    const onClickOnModuleElement = async () => {
        const moduleName = moduleId.includes('.') ? moduleId.split('.').pop() : moduleId;
        let content = keywords.includes(moduleName) ? `${moduleName}0:${id}` : `${moduleName}:${id}`;
        setClickedModuleElement(content);
        if (isFunction) {
            const response: LibraryDataResponse = await libraryBrowserRpcClient.getLibraryData({
                orgName: moduleOrgName,
                moduleName: moduleId,
                version: moduleVersion
            });

            let functionProperties: LibraryFunction = null;
            response.docsData.modules[0].functions.map((libFunction: LibraryFunction) => {
                if (libFunction.name === id) {
                    functionProperties =  libFunction;
                }
            });

            if (functionProperties) {
                const parameters: string[] = [];
                functionProperties.parameters.map((param: FunctionParams) => {
                    if (!(param.type.isInclusion || param.type.isNullable)) {
                        parameters.push(`${PARAM_CONSTRUCTOR}${param.name}`);
                    }
                });

                content += `(${parameters.join(',')})`;
            }
        }
        setClickedModuleElement('');
        inputEditorCtx.onSuggestionSelection(content);
        updateModuleList(getFQModuleName(moduleOrgName, moduleId));
        updateModel(content, currentModel.model ? currentModel.model.position : targetPosition);
    }

    const circularProgress = <ProgressRing sx={{ height: '15px', width: '15px', marginRight: '5px' }} />;

    return (
        <GridItem
            key={key}
            id={key}
            onClick={onClickOnModuleElement}
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: MAX_COLUMN_WIDTH,
                color: 'var(--foreground)'
            }}
        >
            <div className={stmtEditorHelperClasses.suggestionListItem}>
                <SuggestIcon
                    style={{ minWidth: '12%', textAlign: 'left', margin: '2px 2px 0 0', color }}
                />
                <Tooltip
                    content={`${moduleId}:${id}`}
                    position="bottom-end"
                >
                    <Typography
                        variant="body3"
                        className={stmtEditorHelperClasses.suggestionValue}
                        data-testid="suggestion-value"
                    >
                        {`${moduleId}:${id}`}
                    </Typography>
                </Tooltip>
                {`${moduleId}:${id}` === clickedModuleElement && (circularProgress)}
            </div>
        </GridItem>
    );
}
