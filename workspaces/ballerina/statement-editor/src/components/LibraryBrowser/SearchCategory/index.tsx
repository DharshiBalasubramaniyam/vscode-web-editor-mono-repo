// tslint:disable: jsx-no-multiline-js
import React from 'react';

import { ModuleProperty } from "@dharshi/ballerina-core";
import { Grid } from '@dharshi/ui-toolkit';
import classNames from "classnames";

import { SUGGESTION_COLUMN_SIZE } from '../../../constants';
import { useStatementEditorStyles, useStmtEditorHelperPanelStyles } from "../../styles";
import { ModuleElement } from "../ModuleElement";

interface SearchCategoryProps {
    label: string,
    searchResult: ModuleProperty[]
}

export function SearchCategory(props: SearchCategoryProps) {
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();
    const statementEditorClasses = useStatementEditorStyles();
    const { label, searchResult } = props;

    return (
        <div className={stmtEditorHelperClasses.libraryElementBlock}>
            <div
                className={classNames(
                    stmtEditorHelperClasses.helperPaneSubHeader,
                    stmtEditorHelperClasses.libraryElementBlockLabel
                )}
            >
                {label}
            </div>
            <Grid columns={SUGGESTION_COLUMN_SIZE} data-testid="library-element-block-content">
                {searchResult.map((property: ModuleProperty, index: number) => (
                    <ModuleElement
                        moduleProperty={property}
                        key={index}
                        isFunction={label === 'Functions'}
                        label={label}
                    />
                ))}
            </Grid>
            <div className={statementEditorClasses.separatorLine} />
        </div>
    );
}
