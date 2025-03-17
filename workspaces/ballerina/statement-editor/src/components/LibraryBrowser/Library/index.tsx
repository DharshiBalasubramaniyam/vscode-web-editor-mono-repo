// tslint:disable: jsx-no-multiline-js
import React, { useContext } from 'react';

import { LibraryDataResponse, LibraryInfo } from "@dharshi/ballerina-core";
import { GridItem, Icon, Tooltip, Typography } from "@dharshi/ui-toolkit";

import { MAX_COLUMN_WIDTH } from '../../../constants';
import { StatementEditorContext } from "../../../store/statement-editor-context";
import { useStmtEditorHelperPanelStyles } from "../../styles";

interface LibraryProps {
    libraryInfo: LibraryInfo,
    key: number,
    libraryBrowsingHandler: (libraryData: LibraryDataResponse) => void
    libraryDataFetchingHandler: (isFetching: boolean, moduleElement?: string) => void
}

export function Library(props: LibraryProps) {
    const { libraryBrowserRpcClient } = useContext(StatementEditorContext);
    const stmtEditorHelperClasses = useStmtEditorHelperPanelStyles();
    const { libraryInfo, key, libraryBrowsingHandler, libraryDataFetchingHandler } = props;
    const { id, orgName, version } = libraryInfo;

    const onClickOnLibrary = async () => {
        libraryDataFetchingHandler(true);
        console.log("fetch library data: ", libraryInfo)
        const response = await libraryBrowserRpcClient.getLibraryData({
            orgName,
            moduleName: id,
            version
        });

        if (response) {
            libraryBrowsingHandler(response);
            libraryDataFetchingHandler(false);
        } else {
            console.log("error: ", response)
        }
    }

    return (
        <GridItem
            key={key}
            id={key}
            onClick={onClickOnLibrary}
            sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                maxWidth: MAX_COLUMN_WIDTH,
                color: 'var(--foreground)'
            }}
        >
            <div className={stmtEditorHelperClasses.suggestionListItem}>
                <Icon name="module-icon" sx={{color: 'var(--vscode-icon-foreground)', margin: '2px 2px 0 0'}} />
                <Tooltip
                    content={id}
                    position="bottom-end"
                >
                    <Typography
                        variant="body3"
                        className={stmtEditorHelperClasses.suggestionValue}
                        data-testid={`library-item-${key}`}
                    >
                        {id}
                    </Typography>
                </Tooltip>
            </div>
        </GridItem>
    );
}
