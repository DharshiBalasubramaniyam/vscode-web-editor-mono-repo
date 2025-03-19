import { useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { Category, LineRange, Type } from '@dharshi/ballerina-core';
import { useRpcContext } from '@dharshi/ballerina-rpc-client';
import { TypeEditor, TypeHelperCategory, TypeHelperItem, TypeHelperOperator } from '@dharshi/type-editor';
import { TYPE_HELPER_OPERATORS } from './constants';
import { filterOperators, filterTypes, getTypeBrowserTypes, getTypes } from './utils';

type FormTypeEditorProps = {
    type?: Type;
    onTypeChange: (type: Type) => void;
    newType: boolean;
    isGraphql?: boolean;
    filePath?: string
};

export const FormTypeEditor = (props: FormTypeEditorProps) => {
    const { type, onTypeChange, newType, isGraphql, filePath } = props;
    const { rpcClient } = useRpcContext();

    // const [filePath, setFilePath] = useState<string | undefined>(undefined);
    const [targetLineRange, setTargetLineRange] = useState<LineRange | undefined>(undefined);

    const [loading, setLoading] = useState<boolean>(false);
    const [loadingTypeBrowser, setLoadingTypeBrowser] = useState<boolean>(false);

    const [basicTypes, setBasicTypes] = useState<TypeHelperCategory[] | undefined>(undefined);
    const [filteredBasicTypes, setFilteredBasicTypes] = useState<TypeHelperCategory[]>([]);
    const [filteredOperators, setFilteredOperators] = useState<TypeHelperOperator[]>([]);
    const [filteredTypeBrowserTypes, setFilteredTypeBrowserTypes] = useState<TypeHelperCategory[]>([]);

    useEffect(() => {
        if (rpcClient) {
            rpcClient.getVisualizerLocation().then((machineView) => {
                // setFilePath(machineView.metadata.recordFilePath);
                rpcClient
                    .getBIDiagramRpcClient()
                    .getEndOfFile({
                        filePath: filePath
                    })
                    .then((linePosition) => {
                        setTargetLineRange({
                            startLine: linePosition,
                            endLine: linePosition
                        });
                    });
            });
        }
    }, [rpcClient]);

    const debouncedSearchTypeHelper = useCallback(
        debounce((searchText: string, isType: boolean) => {
            if (isType && basicTypes === undefined) {
                if (rpcClient) {
                    rpcClient
                        .getBIDiagramRpcClient()
                        .getVisibleTypes({
                            filePath: filePath,
                            position: {
                                line: targetLineRange.startLine.line,
                                offset: targetLineRange.startLine.offset
                            },
                            typeConstraint: "anydata"
                        })
                        .then((types) => {
                            setBasicTypes(getTypes(types));
                            setFilteredBasicTypes(getTypes(types));
                        })
                        .finally(() => {
                            setLoading(false);
                        });
                }
            } else if (isType) {
                setFilteredBasicTypes(filterTypes(basicTypes, searchText));
            } else {
                setFilteredOperators(filterOperators(TYPE_HELPER_OPERATORS, searchText));
            }

            setLoading(false);
        }, 150),
        [basicTypes, filePath, targetLineRange]
    );

    const handleSearchTypeHelper = useCallback(
        (searchText: string, isType: boolean) => {
            setLoading(true);
            debouncedSearchTypeHelper(searchText, isType);
        },
        [debouncedSearchTypeHelper, basicTypes]
    );

    const debouncedSearchTypeBrowser = useCallback(
        debounce((searchText: string) => {
            if (rpcClient) {
                rpcClient
                    .getBIDiagramRpcClient()
                    .search({
                        filePath: filePath,
                        position: targetLineRange,
                        queryMap: {
                            q: searchText,
                            offset: 0,
                            limit: 60
                        },
                        searchKind: 'TYPE'
                        })
                    .then((response) => {
                        setFilteredTypeBrowserTypes(getTypeBrowserTypes(response.categories));
                    })
                    .finally(() => {
                        setLoadingTypeBrowser(false);
                    });
            }
        }, 150),
        [filePath, targetLineRange]
    );

    const handleSearchTypeBrowser = useCallback(
        (searchText: string) => {
            setLoadingTypeBrowser(true);
            debouncedSearchTypeBrowser(searchText);
        },
        [debouncedSearchTypeBrowser]
    );

    const handleTypeItemClick = async (item: TypeHelperItem) => {
        const response = await rpcClient.getBIDiagramRpcClient().addFunction({
            filePath: filePath,
            codedata: item.codedata,
            kind: item.kind,
            searchKind: 'TYPE'
        });

        return response.template ?? '';
    };

    return (
        <>
            {filePath && targetLineRange && (
                <TypeEditor
                    type={type}
                    rpcClient={rpcClient}
                    filePath={filePath}
                    onTypeChange={onTypeChange}
                    newType={newType}
                    isGraphql={isGraphql}
                    typeHelper={{
                        loading,
                        loadingTypeBrowser,
                        basicTypes: filteredBasicTypes,
                        operators: filteredOperators,
                        typeBrowserTypes: filteredTypeBrowserTypes,
                        onSearchTypeHelper: handleSearchTypeHelper,
                        onSearchTypeBrowser: handleSearchTypeBrowser,
                        onTypeItemClick: handleTypeItemClick
                    }}
                />
            )}
        </>
    );
};
