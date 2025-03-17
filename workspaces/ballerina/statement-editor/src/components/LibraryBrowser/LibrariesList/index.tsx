// tslint:disable: jsx-no-multiline-js
import React from 'react';

import { LibraryDataResponse, LibraryInfo } from "@dharshi/ballerina-core";
import { Grid } from '@dharshi/ui-toolkit';

import { SUGGESTION_COLUMN_SIZE } from '../../../constants';
import { Library } from '../Library';

interface LibrariesListProps {
    libraries: LibraryInfo[],
    libraryBrowsingHandler: (libraryData: LibraryDataResponse) => void
    libraryDataFetchingHandler: (isFetching: boolean) => void
}

export function LibrariesList(props: LibrariesListProps) {
    const { libraries, libraryBrowsingHandler, libraryDataFetchingHandler } = props;

    return (
        <Grid columns={SUGGESTION_COLUMN_SIZE}>
            {libraries.map((library: LibraryInfo, index: number) => (
                <Library
                    libraryInfo={library}
                    key={index}
                    libraryBrowsingHandler={libraryBrowsingHandler}
                    libraryDataFetchingHandler={libraryDataFetchingHandler}
                />
            ))}
        </Grid>
    );
}
